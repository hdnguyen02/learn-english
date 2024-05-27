package com.hdnguyen.learnenglish;

import com.hdnguyen.learnenglish.controller.AuthController;
import com.hdnguyen.learnenglish.dao.RoleDao;
import com.hdnguyen.learnenglish.entity.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class LearnEnglishApplication {

	public static void main(String[] args) {
		SpringApplication.run(LearnEnglishApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner (RoleDao roleDao) {
		return arg -> {
			List<Role> roles = roleDao.findAll();
			if (!roles.isEmpty()) return;
			Role roleStudent = new Role("STUDENT");
			Role roleTeacher = new Role("TEACHER");
			Role roleAdmin = new Role("ADMIN");
			roles.add(roleStudent);
			roles.add(roleTeacher);
			roles.add(roleAdmin);
			roleDao.saveAll(roles);
		};
	}
}
