package com.hdnguyen.learnenglish.dao;

import com.hdnguyen.learnenglish.entity.Deck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeckDao extends JpaRepository<Deck, Integer> {

    List<Deck> findByUserEmail(String email);
    Optional<Deck> findFirstByIdAndUserEmail(Integer idDeck, String emailUser);
    @Query("SELECT d FROM Deck d WHERE d.user.email = ?1 AND CONCAT(d.name, ' ', d.description) LIKE %?2%")
    List<Deck> search(String emailUser, String searchTerm);





}
