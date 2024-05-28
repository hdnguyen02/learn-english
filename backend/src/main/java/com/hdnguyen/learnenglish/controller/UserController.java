package com.hdnguyen.learnenglish.controller;


import com.hdnguyen.learnenglish.dto.UserDto;
import com.hdnguyen.learnenglish.response.Response;
import com.hdnguyen.learnenglish.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class UserController {
    private final UserService userService;

    @GetMapping("users/info")
    public ResponseEntity<Response> getInfoUser(@RequestParam(required = false) String email) {
        UserDto userDto;
        if (email == null) {
            userDto = userService.getInfoUser();
        }
        else {
            userDto = userService.getInfoOtherUser(email);
        }
        Response response = new Response(userDto, "Truy vấn thành công tin của người dùng", true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("users/info")
    public ResponseEntity<Response> updateUser(@RequestParam (required = false) String name,
                                               @RequestParam (required = false) String gender,
                                               @RequestParam (required = false) Integer age,
                                               @RequestParam (required = false) String phone,
                                               @RequestParam (required = false) String dateOfBirth,
                                               @RequestParam (required = false) MultipartFile avatar) throws IOException {


        UserDto userDto = userService.updateUser(name, gender, age, phone, dateOfBirth, avatar);
        Response response = new Response(userDto, "Hiệu chỉnh thành công tin của người dùng", true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
