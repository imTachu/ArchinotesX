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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    public void delete(Long id) {
        dataMicroserviceRepository.delete(id);
    }

    public Set<DataMicroservice> findDatamicroservicesByTag(String tags){
        Set<DataMicroservice> dataMicroservices = new HashSet<>();
        String[] tagsForQuery = tags.split(",");
        for (String tag : tagsForQuery){
            List<DataMicroservice> result = dataMicroserviceRepository.findDatamicroservicesByTag("%" + tag + "%");
            dataMicroservices.addAll(result);
        }
        return dataMicroservices;
    }
}
