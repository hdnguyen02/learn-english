package com.hdnguyen.learnenglish.dto;

import com.hdnguyen.learnenglish.entity.Deck;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LDeckDto {
    private Integer id;
    private String name;
    private String description;
    private Integer numberCards;
    private String createAt;

    public LDeckDto(Deck deck) {
        this.id = deck.getId();
        this.name = deck.getName();
        this.description = deck.getDescription();
        this.numberCards = deck.getCards() == null ? 0 : deck.getCards().size();
        this.createAt = deck.getCreateAt();
    }
}
