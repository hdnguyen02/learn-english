package com.hdnguyen.learnenglish.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GroupRequest {
    private Long id;
    private String email;
    private String name;
    private String description;
}
