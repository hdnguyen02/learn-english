package com.hdnguyen.learnenglish.dto;

import com.hdnguyen.learnenglish.entity.Deck;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DeckOfCard {
    private int id;
    private String name;

    public DeckOfCard(Deck deck) {
        this.id = deck.getId();
        this.name = deck.getName();
    }
}

