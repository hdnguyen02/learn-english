package com.hdnguyen.learnenglish.entity;


import jakarta.persistence.*;
import lombok.*;

@Table(name="cards")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String term;

    @Column(nullable = false)
    private String definition;

    private String image;

    private String audio;

    private String example;

    @Column(name = "created_at")
    private String createAt;

    @Column(name = "is_favourite")
    private Boolean isFavourite;

    @Column(name = "is_remembered")
    private Boolean isRemembered;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_deck", nullable = false)
    private Deck deck;
}
