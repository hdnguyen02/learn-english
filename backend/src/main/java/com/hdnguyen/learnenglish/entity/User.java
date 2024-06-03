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

    @Column(name="date_of_birth", length = 10)
    private String dateOfBirth;

    @Column(name = "create_at", length = 10)
    private String createAt;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Deck> decks;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable( name = "users_roles", joinColumns = @JoinColumn(name = "email_user"),inverseJoinColumns = @JoinColumn(name = "name_role"))
    private Set<Role> roles = new HashSet<>();


    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<Token> tokens;

    @Column
    private Integer age;

    @Column
    private String gender;

    @Column
    private String phone;

    @Column
    private String avatar;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserGroup> userGroups;

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
    
    public User(String email) {
        this.email = email;
    }


}
