package com.hdnguyen.learnenglish.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserRequest {
    private String name;
    private String birthdate;
    private Boolean isEnabled;
}
