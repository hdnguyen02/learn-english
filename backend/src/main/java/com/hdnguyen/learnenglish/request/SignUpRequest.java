package com.hdnguyen.learnenglish.request;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SignUpRequest {
    private String email;
    private String password;
    private String name;
    private String birthdate;
}
