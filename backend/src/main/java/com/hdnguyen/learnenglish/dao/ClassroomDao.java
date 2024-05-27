package com.hdnguyen.learnenglish.dao;

import com.hdnguyen.learnenglish.entity.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomDao extends JpaRepository<Classroom, Integer> {
}
