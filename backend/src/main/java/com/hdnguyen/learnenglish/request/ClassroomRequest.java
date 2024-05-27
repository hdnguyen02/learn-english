package com.hdnguyen.learnenglish.request;

import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
public class ClassroomRequest {
    private String name;
    private String description;
}
