package com.hdnguyen.learnenglish.service;


import com.google.auth.oauth2.UserAuthorizer;
import com.hdnguyen.learnenglish.Helper;
import com.hdnguyen.learnenglish.dao.RoleDao;
import com.hdnguyen.learnenglish.dao.UserDao;
import com.hdnguyen.learnenglish.dto.UserDto;
import com.hdnguyen.learnenglish.entity.Role;
import com.hdnguyen.learnenglish.entity.User;
import com.hdnguyen.learnenglish.request.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final Helper helper;

    public UserDto updateRoleTeacher() {
        // update lên role hiện tại
        User user = helper.getUser();
        Role role = new Role("TEACHER");
        user.getRoles().add(role);
        return new UserDto(userDao.save(user));
    }

    // ví dụ người dùng muốn thay đổi thông tin
    public UserDto updateUser(UserRequest userRequest) {
        // kiểm tra thông tin nào cập nhập thì cập nhập. thông tin còn lại hông quan tâm
        User user = helper.getUser();
        if (userRequest.getIsEnabled() != null) {
            user.setIsEnabled(userRequest.getIsEnabled());
        }
        if (userRequest.getName() != null) {
            user.setName(userRequest.getName());
        }
        if (userRequest.getBirthdate() != null) {
            user.setBirthdate(userRequest.getBirthdate());
        }
        return new UserDto(userDao.save(user));
    }


    public UserDto getInfoUser() {
        return new UserDto(helper.getUser());
    }
    public UserDto getInfoOtherUser(String email) {
        User user = userDao.findById(email).orElseThrow();
        return new UserDto(user);
    }





}
