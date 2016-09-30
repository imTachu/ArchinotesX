package com.uniandes.thesis.repository;

import com.uniandes.thesis.domain.DataMicroservice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataMicroserviceRepository extends JpaRepository<DataMicroservice, Long> {
}
