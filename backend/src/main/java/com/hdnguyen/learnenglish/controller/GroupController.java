package com.hdnguyen.learnenglish.controller;

import com.hdnguyen.learnenglish.dto.GroupDto;
import com.hdnguyen.learnenglish.dto.UserDto;
import com.hdnguyen.learnenglish.request.GroupRequest;
import com.hdnguyen.learnenglish.request.UserGroupRequest;
import com.hdnguyen.learnenglish.response.Response;
import com.hdnguyen.learnenglish.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @PostMapping("/groups")
    public ResponseEntity<?> createGroup(@RequestBody GroupRequest groupRequest){
        Response response = new Response();

        response.setData(groupService.createGroup(groupRequest));
        response.setSuccess(true);
        response.setMessage("Tạo class thành công");

        return  ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PutMapping("/groups")
    public ResponseEntity<?> updateGroup(@RequestBody GroupRequest groupRequest) {
        Response responseData = new Response();
        responseData.setData(groupService.updateGroup(groupRequest));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }
//
//    @GetMapping("/group")
//    public ResponseEntity<?> getGroups() {
//        Response responseData = new Response();
//        responseData.setSuccess(true);
//
//        logger.log(LogLevel.INFO, "GET GROUPS " +  " IS SUCCESSFULLY");
//        return  ResponseEntity.status(HttpStatus.CREATED).body(responseData);
//    }
//
//
//    @GetMapping("/group/{id}")
//    public ResponseEntity<?> getGroupById(@PathVariable(name = "id") Long id) {
//        Response responseData = new Response();
//
//        GroupDto groupDto = groupService.getGroupById(id);
//        responseData.setData(groupDto);
//        responseData.setSuccess(true);
//        logger.log(LogLevel.INFO, "GET GROUP ID " + id.toString() + " IS SUCCESSFULLY");
//        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
//    }
//
    @GetMapping("/groups/{id}/members")
    public ResponseEntity<?> getUserOfGroupById(@PathVariable Long id) {
        Response responseData = new Response();

        List<UserDto> userDtos= groupService.getUserOfGroup(id);
        responseData.setData(userDtos);
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/groups/owner")
    public ResponseEntity<?> getGroupByUser() {
        Response responseData = new Response();

        List<GroupDto> groupDtos = groupService.getGroupByUser();
        responseData.setSuccess(true);
        responseData.setData(groupDtos);
        responseData.setMessage("Truy vấn thành công");

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/groups/detail/{id}")
    public ResponseEntity<?> getGroupByIdDetail(@PathVariable(name = "id") Long id) {
        Response responseData = new Response();

        GroupDto groupDto = groupService.getGroupDetailById(id);
        responseData.setData(groupDto);
        responseData.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @DeleteMapping("/groups/{id}")
    public ResponseEntity<?> deleteGroupById(@PathVariable Long id) {
        Response responseData = new Response();
        responseData.setData(groupService.deleteGroupById(id));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @PostMapping("/groups/delete-user")
    public ResponseEntity<?> deleteUserGroup(@RequestBody UserGroupRequest userGroupRequest) {
        Response responseData = new Response();
        responseData.setData(groupService.deleteUserGroupById(userGroupRequest));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @PostMapping("/groups/invite-users")
    public ResponseEntity<?> addUserGroup(@RequestBody UserGroupRequest userGroupRequest){
        Response responseData = new Response();

        responseData.setData(groupService.addUserGroup(userGroupRequest));
        responseData.setSuccess(true);
        responseData.setMessage("Gửi mail đến người dùng thành công");

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/groups/{id}/add-users/active/{token}")
    public ResponseEntity<?> addUserGroup(@PathVariable(name = "id") Long id,
                                          @PathVariable(name = "token") String token){
        Response responseData = new Response();

        responseData.setData(groupService.activeUserGroup(id, token));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }


    //a lấy ra dánh sách ngươi dùng tham gia.
    @GetMapping("/groups/attendance")
    public ResponseEntity<?> getGroupAttendance(){
        Response responseData = new Response();

        responseData.setData(groupService.getGroupAttend());
        responseData.setSuccess(true);
        responseData.setMessage("Truy vấn thành công");

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }
}
