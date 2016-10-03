package com.uniandes.thesis.repository;

import com.uniandes.thesis.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
