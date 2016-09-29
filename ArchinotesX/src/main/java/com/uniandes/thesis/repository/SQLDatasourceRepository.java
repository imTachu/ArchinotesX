package com.uniandes.thesis.repository;

import com.uniandes.thesis.domain.SQLDatasource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SQLDatasourceRepository extends JpaRepository<SQLDatasource, Long> {
}
