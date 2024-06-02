package com.hdnguyen.learnenglish.controller;

    
import com.hdnguyen.learnenglish.dto.CardDto;
import com.hdnguyen.learnenglish.response.Response;
import com.hdnguyen.learnenglish.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class CardController {


    private final CardService cardService;


    @PostMapping("cards")
    public ResponseEntity<Response> createCard(
            @RequestParam Integer idDeck,
            @RequestParam String term,
            @RequestParam String definition,
            @RequestParam (required = false) String example,
            @RequestParam (required = false) MultipartFile image,
            @RequestParam (required = false) MultipartFile audio) throws Exception {

        CardDto cardDto = cardService.createCard(idDeck, term, definition, example, image, audio);
        String message = "Tạo thẻ thành công";
        Response response = new Response(cardDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/cards/search")
        public ResponseEntity<Response> searchCards(@RequestParam String content) {
            List<CardDto> cardsDto = cardService.searchCards(content);
            String message = "Truy vấn card thành công";
            Response response = new Response(cardsDto, message, true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/cards/filter")
        public ResponseEntity<Response> filterCards(@RequestParam (required = false) Integer idDeck,
                                                    @RequestParam (required = false) Boolean isFavourite,
                                                    @RequestParam (required = false) Boolean isRemembered) {
            List<CardDto> cardsDto = cardService.filterCards(idDeck, isFavourite, isRemembered);
            String message = "Truy vấn card thành công";
            Response response = new Response(cardsDto, message, true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/cards")
    public ResponseEntity<Response> getCards() {
        List<CardDto> cardsDto = cardService.getCards(); // thực hiện truy vấn tất cả.
        String message = "Truy vấn card thành công";
        Response response = new Response(cardsDto, message, true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("cards/{id}")
    public ResponseEntity<Response> getCardWithId(@PathVariable Integer id) throws Exception {
        CardDto cardDto = cardService.getCardWithId(id);
        String message = "Truy vấn thẻ thành công";
        Response response = new Response(cardDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("cards")
    public ResponseEntity<Response> deleteCard(@RequestParam int [] ids) {
        String message = "Xóa thẻ thành công";
        cardService.deleteCards(ids);
        Response response = new Response(null, message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("cards/{id}")
    public ResponseEntity<Response> deleteCard(@PathVariable Integer id) throws Exception {
        CardDto cardDto = cardService.deleteCard(id);
        String message = "Xoá thẻ thành công";
        Response response = new Response(cardDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("cards/{id}")
    public ResponseEntity<Response> updateCard(@PathVariable Integer id,
                                     @RequestParam (required = false) Integer idDeck,
                                     @RequestParam (required = false) String term,
                                     @RequestParam (required = false) String definition,
                                         @RequestParam (required = false) String example,
                                         @RequestParam (required = false) MultipartFile image,
                                         @RequestParam (required = false) MultipartFile audio,
                                         @RequestParam (required = false) Boolean isFavourite,
                                     @RequestParam (required = false) Boolean isRemembered) throws Exception {
        CardDto cardDto = cardService.updateCard(id ,idDeck, term, definition,
                example,image,audio,isFavourite, isRemembered);
        String message = "Hiệu chỉnh thẻ thành công";
        Response response = new Response(cardDto, message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
