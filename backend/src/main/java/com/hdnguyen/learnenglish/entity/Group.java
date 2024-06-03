package com.hdnguyen.learnenglish.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Table(name = "grades")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Group extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = Integer.MAX_VALUE)
    private String description;

    @ManyToOne()
    @JoinColumn(name = "email_owner")
    private User owner;

    @OneToMany(mappedBy = "group")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<UserGroup> userGroups = new ArrayList<>();

    public Group(Long id) {
        this.id = id;
    }

}
