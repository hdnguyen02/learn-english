package com.hdnguyen.learnenglish.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Table(name = "comments")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "parentId")
    private Comment comment;

    @Column(length = Integer.MAX_VALUE)
    private String content;

    @OneToMany(mappedBy = "comment")
    private Set<Comment> comments = new HashSet<>();

    //    private Long userId;
    @ManyToOne()
    @JoinColumn(name = "email_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    public  Comment(Long id) {
        this.id = id;
    }

}
