package com.uniandes.thesis.service;

import com.uniandes.thesis.domain.DataMicroservice;
import com.uniandes.thesis.domain.Project;
import com.uniandes.thesis.domain.SQLDatasource;
import com.uniandes.thesis.repository.DataMicroserviceRepository;
import com.uniandes.thesis.repository.ProjectRepository;
import com.uniandes.thesis.repository.SQLDatasourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DataMicroserviceService {

    @Autowired
    private DataMicroserviceRepository dataMicroserviceRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SQLDatasourceRepository sqlDatasourceRepository;

    public Page<DataMicroservice> findAll(Pageable pageable) {
        return dataMicroserviceRepository.findAll(pageable);
    }

    public DataMicroservice findOne(Long id) {
        return dataMicroserviceRepository.findOne(id);
    }

    public DataMicroservice save(DataMicroservice dataMicroservice, Long datasourceId, Long projectId) {
        Project project = projectRepository.findOne(projectId);
        SQLDatasource sqlDatasource = sqlDatasourceRepository.findOne(datasourceId);
        dataMicroservice.setProject(project);
        dataMicroservice.setSqlDatasource(sqlDatasource);
        return dataMicroserviceRepository.save(dataMicroservice);
    }

    public void delete(DataMicroservice DataMicroservice) {
        dataMicroserviceRepository.delete(DataMicroservice);
    }
}
