package com.hdnguyen.learnenglish.controller;


import com.hdnguyen.learnenglish.dto.DeckDto;
import com.hdnguyen.learnenglish.dto.UserDto;
import com.hdnguyen.learnenglish.request.UserRequest;
import com.hdnguyen.learnenglish.response.Response;
import com.hdnguyen.learnenglish.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class UserController {
    private final UserService userService;

    @GetMapping("users")
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

    @PutMapping("users")
    public ResponseEntity<Response> updateUser(UserRequest userRequest) {
        UserDto userDto = userService.updateUser(userRequest);
        Response response = new Response(userDto, "Hiệu chỉnh thành công tin của người dùng", true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
