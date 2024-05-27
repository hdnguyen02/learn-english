package com.hdnguyen.learnenglish.response;


import com.hdnguyen.learnenglish.entity.Comment;
import com.hdnguyen.learnenglish.entity.Deck;
import com.hdnguyen.learnenglish.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomResponse {
    private Integer id;
    private String name;
    private String description;
    private String createAt;
    private User owner;
    private List<User> participatingUsers;
    private List<Comment> comments;
    private List<Deck> decks;
}
