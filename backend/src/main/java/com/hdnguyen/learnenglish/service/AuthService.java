package com.hdnguyen.learnenglish.service;

import com.hdnguyen.learnenglish.Helper;
import com.hdnguyen.learnenglish.dao.TokenDao;
import com.hdnguyen.learnenglish.dao.UserDao;
import com.hdnguyen.learnenglish.dto.UserDto;
import com.hdnguyen.learnenglish.entity.Role;
import com.hdnguyen.learnenglish.entity.Token;
import com.hdnguyen.learnenglish.entity.User;
import com.hdnguyen.learnenglish.request.SignInRequest;
import com.hdnguyen.learnenglish.request.SignUpRequest;
import com.hdnguyen.learnenglish.response.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDao userDao;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final Helper helper;
    private final TokenDao tokenDao;


    private void saveToken(String code, User user){
        Token token = Token.builder().code(code).isSignOut(false).user(user).build();
        tokenDao.save(token);
    }
    

    public AuthResponse signUp(SignUpRequest signUpRequest) throws Exception {
        Role role = new Role("STUDENT");
        Set<Role> roles = new HashSet<>();
        roles.add(role);

        User userCheck =  userDao.findById(signUpRequest.getEmail()).orElse(null);
        if (userCheck != null) throw new Exception("Email đã được sử dụng!");

        var user = User.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .name(signUpRequest.getName())
                .birthdate(signUpRequest.getBirthdate())
                .createAt(helper.formatDate(new Date()))
                .isEnabled(true)
                .roles(roles)
                .build();

        try {
            String accessToken = jwtService.generateToken(userDao.save(user));
            saveToken(accessToken, user);

            return AuthResponse.builder()
                    .accessToken(accessToken)
                    .user(new UserDto(user))
                    .build();
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public AuthResponse signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(), signInRequest.getPassword()
        ));

        var user = userDao.findById(signInRequest.getEmail()).orElseThrow();
        String accessToken = jwtService.generateToken(user);

        revokeTokensValid(user);
        saveToken(accessToken, user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .user(new UserDto(user))
                .build();
    }

    private void revokeTokensValid(User user) {
        List<Token> tokensValid = tokenDao.findTokensValidOfUser(user.getEmail());
        if (!tokensValid.isEmpty()) {
            tokensValid.forEach(tokenValid -> {
                tokenValid.setIsSignOut(true);
            });
        }
        tokenDao.saveAll(tokensValid);
    }
}

