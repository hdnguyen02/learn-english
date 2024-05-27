package com.hdnguyen.learnenglish.controller;

import com.hdnguyen.learnenglish.dto.DeckDto;
import com.hdnguyen.learnenglish.dto.LDeckDto;
import com.hdnguyen.learnenglish.request.DeckRequest;
import com.hdnguyen.learnenglish.response.Response;
import com.hdnguyen.learnenglish.service.DeckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class DeckController {

    private final DeckService deckService;

    @GetMapping("/decks")
    public ResponseEntity<Response> getDecks(@RequestParam(required = false) String searchTerm) {
        List<LDeckDto> decksDto;
        if (searchTerm == null) {
            decksDto = deckService.getDesks();
        }
        else {
            decksDto = deckService.searchDecks(searchTerm);
        }
        String message = "Truy vấn danh sách bộ thẻ thành công";
        Response response = new Response(decksDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/decks")
    public ResponseEntity<Response> createDeck(@RequestBody DeckRequest deckRequest) {
        LDeckDto deckDto = deckService.createDeck(deckRequest);
        String message = "Tạo bộ thẻ thành công";
        Response response = new Response(deckDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/decks/{id}")
    public ResponseEntity<Response> deleteDeck(@PathVariable Integer id) {
        LDeckDto deckDto = deckService.deleteDeck(id);
        String message = "Xóa bộ thẻ thành công";
        Response response = new Response(deckDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/decks/{id}")
    public ResponseEntity<Response> updateDeck(@PathVariable Integer id,@RequestBody DeckRequest deckRequest)  {
        LDeckDto deckDto = deckService.updateDeck(id, deckRequest);
        String message = "Hiệu chỉnh bộ thẻ thành công";
        Response response = new Response(deckDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("decks/{id}")
    public ResponseEntity<Response> getDeckWithId(@PathVariable Integer id) {
        DeckDto deckDto = deckService.getDeckWithId(id);
        String message = "Truy vấn bộ thẻ thành công";
        Response response = new Response(deckDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
