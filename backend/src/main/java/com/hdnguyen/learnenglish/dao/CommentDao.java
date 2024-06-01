package com.hdnguyen.learnenglish.dao;

import com.hdnguyen.learnenglish.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentDao extends JpaRepository<Comment, Integer> {
}
