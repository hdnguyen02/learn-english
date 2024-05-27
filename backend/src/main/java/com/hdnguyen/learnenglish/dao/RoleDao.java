package com.hdnguyen.learnenglish.dao;

import com.hdnguyen.learnenglish.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, String> {
}
