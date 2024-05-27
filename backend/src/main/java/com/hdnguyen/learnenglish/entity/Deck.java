package com.hdnguyen.learnenglish.entity;


import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Table(name="decks")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Deck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(nullable = false, length = 50)
    private String name;

    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="email_user")
    private User user;

    @OneToMany(mappedBy = "deck",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Card> cards;

    @Column(name = "create_at", length = 10)
    private String createAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_classroom")
    private Classroom classroom;
}
