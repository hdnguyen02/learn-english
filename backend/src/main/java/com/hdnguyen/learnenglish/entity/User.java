package com.hdnguyen.learnenglish.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.*;


@Table(name="users")
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User implements UserDetails {

    @Id
    @Column( length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 100)
    private String name;

    @Column(length = 10)
    private String birthdate;

    @Column(name = "create_at", length = 10)
    private String createAt;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Deck> decks;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable( name = "users_roles", joinColumns = @JoinColumn(name = "email_user"),inverseJoinColumns = @JoinColumn(name = "name_role"))
    private Set<Role> roles;

    @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
    private List<Classroom> myClassrooms;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable( name = "users_classrooms", joinColumns = @JoinColumn(name = "email_user"),inverseJoinColumns = @JoinColumn(name = "id_classroom"))
    private List<Classroom> participatingClassrooms;


    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<Token> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new HashSet<>();
        this.roles.forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }


    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }
}
