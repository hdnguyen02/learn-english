package com.hdnguyen.learnenglish.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "UserGroup")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "email_user")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "id_group")
    private Group group;

    private String tokenActive;

    private boolean isActive;
}
