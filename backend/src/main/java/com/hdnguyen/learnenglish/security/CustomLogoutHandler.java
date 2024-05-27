package com.hdnguyen.learnenglish.security;

import com.hdnguyen.learnenglish.dao.TokenDao;
import com.hdnguyen.learnenglish.entity.Token;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {
    private final TokenDao tokenDao;
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String Authorization = request.getHeader("Authorization");
        if (Authorization == null || !Authorization.startsWith("Bearer ")) {
            return;
        }
        String accessToken = Authorization.substring(7);
        Token storedToken = tokenDao.findByCode(accessToken).orElse(null);
        if (storedToken != null) {
            storedToken.setIsSignOut(true);
            tokenDao.save(storedToken);
        }
    }
}
