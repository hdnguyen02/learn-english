package com.hdnguyen.learnenglish.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name="comments")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String time;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_classroom")
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="email_user")
    private User user;
}
