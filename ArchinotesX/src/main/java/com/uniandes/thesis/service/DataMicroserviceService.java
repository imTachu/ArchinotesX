package com.uniandes.thesis.service;

import com.uniandes.thesis.domain.DataMicroservice;
import com.uniandes.thesis.repository.DataMicroserviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DataMicroserviceService {

    @Autowired
    private DataMicroserviceRepository dataMicroserviceRepository;

    public Page<DataMicroservice> findAll(Pageable pageable) {
        return dataMicroserviceRepository.findAll(pageable);
    }

    public DataMicroservice findOne(Long id) {
        return dataMicroserviceRepository.findOne(id);
    }

    public DataMicroservice save(DataMicroservice DataMicroservice) {
        return dataMicroserviceRepository.save(DataMicroservice);
    }

    public void delete(DataMicroservice DataMicroservice) {
        dataMicroserviceRepository.delete(DataMicroservice);
    }
}
