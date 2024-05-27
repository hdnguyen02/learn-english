package com.hdnguyen.learnenglish.dto;

import com.hdnguyen.learnenglish.entity.Card;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CardOfDeck {
    private Integer id;
    private String term;
    private String definition;
    private String image;
    private String audio;
    private String example;
    private String createAt;
    private Boolean isFavourite;
    private Boolean isRemembered;

    public CardOfDeck(Card card){
        this.id = card.getId();
        this.term = card.getTerm();
        this.definition = card.getDefinition();
        this.image = card.getImage();
        this.audio = card.getAudio();
        this.example = card.getExample();
        this.createAt = card.getCreateAt();
        this.isFavourite = card.getIsFavourite();
        this.isRemembered = card.getIsRemembered();
    }
}