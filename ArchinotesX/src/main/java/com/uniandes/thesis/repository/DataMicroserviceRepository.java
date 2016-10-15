package com.uniandes.thesis.repository;

import com.uniandes.thesis.domain.DataMicroservice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DataMicroserviceRepository extends JpaRepository<DataMicroservice, Long> {

    @Query("SELECT d FROM DataMicroservice d "
        + " WHERE d.tags like :tag ")
    List<DataMicroservice> findDatamicroservicesByTag(@Param("tag") String tag);

    @Query("SELECT d FROM DataMicroservice d "
        + " WHERE d.sqlDatasource.id = :datasourceId ")
    List<DataMicroservice> findDatamicroservicesBySQLDatasourceId(@Param("datasourceId") Long datasourceId);
}
