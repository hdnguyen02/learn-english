package com.hdnguyen.learnenglish.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserGroupRequest {
    private String email;
    private Long groupId;
}
