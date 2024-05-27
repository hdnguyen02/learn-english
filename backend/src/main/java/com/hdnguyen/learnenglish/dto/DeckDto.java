package com.hdnguyen.learnenglish.dto;


import com.hdnguyen.learnenglish.entity.Deck;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DeckDto {
    private Integer id;
    private String description;
    private String name;
    private String createAt;
    private List<CardOfDeck> cards = new ArrayList<>();

    public DeckDto(Deck deck) {
        this.id = deck.getId();
        this.description = deck.getDescription();
        this.name = deck.getName();
        this.createAt = deck.getCreateAt();
        deck.getCards().forEach(card -> {
            this.cards.add(new CardOfDeck(card));
        });
    }
}
