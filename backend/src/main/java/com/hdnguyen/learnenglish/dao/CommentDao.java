package com.hdnguyen.learnenglish.dao;

import com.hdnguyen.learnenglish.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentDao extends JpaRepository<Comment, Integer> {
}
