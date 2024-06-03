package com.hdnguyen.learnenglish.service;

import com.hdnguyen.learnenglish.Helper;
import com.hdnguyen.learnenglish.dao.GroupDao;
import com.hdnguyen.learnenglish.dao.UserDao;
//import com.ktpm.dao.UserGroupDao;
//import com.ktpm.dto.GroupDto;
//import com.ktpm.dto.UserDto;
//import com.ktpm.entity.Group;
//import com.ktpm.entity.User;
//import com.ktpm.entity.UserGroup;
//import com.ktpm.exception.GroupAlreadyExistsException;
//import com.ktpm.request.GroupRequest;
//import com.ktpm.request.UserGroupRequest;
//import com.ktpm.sendmail.EmailDetails;
//import com.ktpm.sendmail.EmailServiceImpl;
import com.hdnguyen.learnenglish.dao.UserGroupDao;
import com.hdnguyen.learnenglish.dto.GroupDto;
import com.hdnguyen.learnenglish.dto.UserDto;
import com.hdnguyen.learnenglish.entity.Group;
import com.hdnguyen.learnenglish.entity.User;
import com.hdnguyen.learnenglish.entity.UserGroup;
import com.hdnguyen.learnenglish.exception.GroupAlreadyExistsException;
import com.hdnguyen.learnenglish.request.GroupRequest;
import com.hdnguyen.learnenglish.request.UserGroupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class GroupService {
    @Autowired
    private GroupDao groupRepository;

    @Autowired
    private UserGroupDao userGroupRepository;

    @Autowired
    private UserDao userRepository;

    @Autowired
    private Helper helper;


    @Autowired
    private EmailServiceImpl emailServiceImpl;

    public GroupDto createGroup(GroupRequest groupRequest) {
        Group group = new Group();
        Date created = new Date();

        String emailOwner = helper.getEmailUser();
        User owner = helper.getUser();

        group.setName(groupRequest.getName());
        group.setDescription(groupRequest.getDescription());
        group.setOwner(owner);
        group.setCreated(created);
        group.setCreatedBy(emailOwner);

        return GroupDto.mapToGroupDto(groupRepository.save(group));
    }

    public boolean updateGroup(GroupRequest groupRequest) {
        Group group = groupRepository.findById(groupRequest.getId()).orElseThrow();

        group.setName(groupRequest.getName());
        group.setDescription(groupRequest.getDescription());
        group.setOwner(new User(groupRequest.getEmail()));

        Date modified = new Date();
        group.setModified(modified);
        group.setModifiedBy(groupRequest.getEmail());

        groupRepository.save(group);

        return true;
    }

    public GroupDto getGroupById(Long id) {
        Group group = groupRepository.findById(id).orElseThrow();
        return GroupDto.mapToGroupDto(group);
    }

    public GroupDto getGroupDetailById(Long id) {
        Group group = groupRepository.findById(id).orElseThrow();
        return GroupDto.mapToGroupDtoDetail(group);
    }

    public List<UserDto> getUserOfGroup(Long id){
        List<UserDto> userDtos = new ArrayList<>();
        Group group = groupRepository.findById(id).orElseThrow();

        List<UserGroup> userActiveGroup = group.getUserGroups().stream().filter(UserGroup::isActive).toList();
        userActiveGroup.forEach(ele-> {
            userDtos.add(new UserDto(ele.getUser()));
        });
        return userDtos;
    }


    public List<GroupDto> getGroupByUser() {
        User owner = helper.getUser(); // thông tin của người dùng
        List<Group> groups = groupRepository.findByOwner(owner);
        List<GroupDto> groupDtos = new ArrayList<>();

        groups.forEach(group -> {
            groupDtos.add(GroupDto.mapToGroupDto(group));
        });

        return groupDtos;
    }

    public boolean deleteGroupById(Long id) {
        Group group = groupRepository.findById(id).orElseThrow();
        groupRepository.delete(group);
        return true;
    }


    public boolean addUserGroup(UserGroupRequest userGroupRequest) {
        // check email user
        Optional<User> userOptional = userRepository.findById(userGroupRequest.getEmail());
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Người dùng có mail không tồn tại!");
        }

        List<UserGroup> userGroups = userGroupRepository.findByUserAndGroup(new User(userGroupRequest.getEmail()),
                new Group(userGroupRequest.getGroupId())
        );
        String token = UUID.randomUUID().toString();
        if (!userGroups.isEmpty()) {
            UserGroup userGroupDB = userGroups.get(0);
            if (!userGroupDB.isActive()) {
                userGroupDB.setTokenActive(token);
                Thread threadSaveData = new Thread(()-> {
                    userGroupRepository.save(userGroupDB);
                });

                Thread threadSendMail = new Thread(()->{
                    sendMailAddGroup(userGroupRequest.getGroupId(), userGroupRequest.getEmail(), token);
                });

                threadSendMail.start();
                threadSaveData.start();
            }

        } else {
            UserGroup userGroup =  new UserGroup();
            userGroup.setTokenActive(token);

            userGroup.setUser(new User(userGroupRequest.getEmail()));
            userGroup.setGroup(new Group(userGroupRequest.getGroupId()));
            userGroup.setActive(false);

            Thread threadSendMail = new Thread(()->{
                sendMailAddGroup(userGroupRequest.getGroupId(), userGroupRequest.getEmail(), token);
            });

            Thread threadSaveData = new Thread(()-> {
                userGroupRepository.save(userGroup);
            });

            threadSendMail.start();
            threadSaveData.start();

        }

        return true;
    }

    private void sendMailAddGroup(Long groupId, String emailTo, String token) {
        EmailDetail details = new EmailDetail();
        details.setSubject("Thư mời tham gia lớp học");
        details.setRecipient(emailTo);
        String link = "http://localhost:8080/api/v1/groups/"+groupId+"/add-users/active/" + token;
        details.setMsgBody("<p>Xin chào bạn,</p>" +
                "<p>Bạn vui lòng nhấn vào <a href=\'"+link+"\'>link này</a> để tham gia lớp học.</p>" +
                "    <p>Trân trọng,</p>");
        emailServiceImpl.sendMailWithAttachment(details);
    }

    public boolean activeUserGroup(Long groupId, String token) {
        Optional<UserGroup> userGroupOptional = userGroupRepository.findByGroupAndTokenActive(new Group(groupId), token);
        if (userGroupOptional.isEmpty()) {
            return false;
        }

        UserGroup userGroup = userGroupOptional.get();
        userGroup.setActive(true);
        userGroupRepository.save(userGroup);
        return true;
    }

    public boolean deleteUserGroupById(UserGroupRequest userGroupRequest) {
        Optional<User> userOptional = userRepository.findById(userGroupRequest.getEmail());
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Người dùng có mail không tồn tại!");
        }
        System.out.println(userGroupRequest.getGroupId());
        List<UserGroup> userGroups = userGroupRepository.findByUserAndGroup(new User(userGroupRequest.getEmail()),
                new Group(userGroupRequest.getGroupId())
        );
        if (userGroups.isEmpty()){
            throw new UsernameNotFoundException("Người dùng có mail không có trong nhóm!");
        }

        userGroupRepository.delete(userGroups.get(0));
        return true;
    }

    public List<GroupDto> getGroupAttend() {

        User user = helper.getUser();

        List<GroupDto> groupDtos = new ArrayList<>();

        List<UserGroup> userGroups = userGroupRepository.findByUserAndIsActive(user, true);
        userGroups.forEach(ele -> {
            groupDtos.add(GroupDto.mapToGroupDto(ele.getGroup()));
        });

        return groupDtos;
    }
}
