package com.hdnguyen.learnenglish.dto;

import com.hdnguyen.learnenglish.entity.Group;
import com.hdnguyen.learnenglish.entity.UserGroup;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupDto {
    private Long id;
    private UserDto owner;
    private String name;
    private String description;
    private int quantity;
    List<UserDto> userGroups = new ArrayList<>();

    public static GroupDto mapToGroupDto(Group group){
        GroupDto groupDto = new GroupDto();
        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setOwner(new UserDto(group.getOwner()));
        groupDto.setDescription(group.getDescription());

        int sizeUserGroups = (int)group.getUserGroups().stream().filter(UserGroup::isActive).count();
        groupDto.setQuantity(sizeUserGroups);

        return  groupDto;
    }

    public static GroupDto mapToGroupDtoDetail(Group group){
        GroupDto groupDto = new GroupDto();
        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setOwner(new UserDto(group.getOwner()));
        groupDto.setDescription(group.getDescription());

        List<UserGroup> userGroupsActive = group.getUserGroups().stream().filter(UserGroup::isActive).toList();
        List<UserDto> userDtos  = new ArrayList<>();
        userGroupsActive.forEach(ele->{
            userDtos.add(new UserDto(ele.getUser()));
        });

        groupDto.setUserGroups(userDtos);

        int sizeUserGroups = userGroupsActive.size();

        groupDto.setQuantity(sizeUserGroups);

        return  groupDto;
    }

}
