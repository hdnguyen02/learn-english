package com.hdnguyen.learnenglish.dto;

import com.hdnguyen.learnenglish.entity.User;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDto {
    private String email;
    private String name;
    private String dateOfBirth;
    private String createAt;
    private Boolean isEnabled;
    private List<String> roles;

    public UserDto(User user) {
        System.out.println("Trước khi getRole");
        System.out.println(user.getRoles());
        System.out.println("Sau khi getRole");
        roles = new ArrayList<>();
        email = user.getEmail();
        name = user.getName();
        dateOfBirth = user.getDateOfBirth();
        createAt = user.getCreateAt();
        isEnabled = user.getIsEnabled();
        user.getRoles().forEach(role -> {
            roles.add(role.getName());
        });
    }
}
