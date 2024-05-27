package com.hdnguyen.learnenglish.controller;

import com.hdnguyen.learnenglish.request.SignInRequest;
import com.hdnguyen.learnenglish.request.SignUpRequest;
import com.hdnguyen.learnenglish.response.AuthResponse;
import com.hdnguyen.learnenglish.response.Response;
import com.hdnguyen.learnenglish.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("sign-up")
    public  ResponseEntity<Response> signUp (@RequestBody SignUpRequest signUpRequest) throws Exception {
        AuthResponse auth = authService.signUp(signUpRequest);
        String message = "Đăng ký tài khoản thành công";
        return new ResponseEntity<>(new Response(auth, message, true), HttpStatus.OK);
    }

    @PostMapping("sign-in")
    public ResponseEntity<Response> signIn (@RequestBody SignInRequest signInRequest) {
        AuthResponse auth = authService.signIn(signInRequest);
        String message = "Đăng nhập tài khoản thành công";
        return new ResponseEntity<>(new Response(auth, message, true), HttpStatus.OK);
    }
}
