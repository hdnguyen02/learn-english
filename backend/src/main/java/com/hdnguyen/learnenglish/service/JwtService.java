package com.hdnguyen.learnenglish.service;

import com.hdnguyen.learnenglish.dao.TokenDao;
import com.hdnguyen.learnenglish.entity.Token;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final TokenDao tokenDao;
    private static final String SECRET_KEY = "8ed09dfea89dd8afe6c430c2c0c18bddee1f31d947b11049bbb1c440c0b5b7f6";

    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);
    }

    public String generateToken (Map<String,Object> extractClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis())) // thời gian tạo ra jwt
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // tương ứng 1 ngày
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(),userDetails);
    }

    public <T> T extractClaim (String token, Function<Claims, T> claimsResolve) {
        final Claims claims = extractAllClaims(token);
        return claimsResolve.apply(claims);
    }

    private Claims extractAllClaims (String token) {
        return (Claims) Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parse(token)
                .getBody();
    }
    private Key getSignInKey(){
        byte [] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Date extractExpiration (String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    private boolean isTokenExpired (String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid (String token,UserDetails userDetail) {
        final String email = extractUsername(token);
        boolean isValid = tokenDao.findByCode(token).map(t -> !t.getIsSignOut()).orElse(false);
        return (email.equals(userDetail.getUsername())) && !isTokenExpired(token) && isValid;
    }
}