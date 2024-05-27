package com.hdnguyen.learnenglish.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name="classrooms")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 50, nullable = false)
    private String name;
    private String description;
    @Column(length = 10)
    private String createAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="email_owner")
    private User owner;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable( name = "users_classrooms", joinColumns = @JoinColumn(name = "id_classroom"),inverseJoinColumns = @JoinColumn(name = "email_user"))
    private List<User> participatingUsers;

    @OneToMany(mappedBy = "classroom", fetch = FetchType.EAGER)
    private List<Comment> comments;

    @OneToMany(mappedBy = "classroom", fetch = FetchType.EAGER)
    private List<Deck> decks;
}
