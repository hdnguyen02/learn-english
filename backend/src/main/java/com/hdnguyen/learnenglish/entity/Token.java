package com.hdnguyen.learnenglish.entity;


import jakarta.persistence.*;
import lombok.*;

@Table(name="tokens")
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private Boolean isSignOut;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="email_user")
    private User user;
}
