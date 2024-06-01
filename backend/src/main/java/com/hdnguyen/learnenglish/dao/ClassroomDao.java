package com.hdnguyen.learnenglish.dao;

import com.hdnguyen.learnenglish.entity.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomDao extends JpaRepository<Classroom, Integer> {
}
