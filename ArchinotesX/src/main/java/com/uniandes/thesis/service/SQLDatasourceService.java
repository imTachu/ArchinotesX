package com.uniandes.thesis.service;

import com.uniandes.thesis.domain.SQLDatasource;
import com.uniandes.thesis.repository.SQLDatasourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SQLDatasourceService {

    @Autowired
    private SQLDatasourceRepository sqlDatasourceRepository;

    public Page<SQLDatasource> findAll(Pageable pageable) {
        return sqlDatasourceRepository.findAll(pageable);
    }

    public SQLDatasource findOne(Long id) {
        return sqlDatasourceRepository.findOne(id);
    }

    public SQLDatasource save(SQLDatasource SQLDatasource) {
        return sqlDatasourceRepository.save(SQLDatasource);
    }

    public void delete(Long id) {
        sqlDatasourceRepository.delete(id);
    }

    public String getConnectionString(Long datasourceId){
        SQLDatasource sqlDatasource = findOne(datasourceId);
        return "postgres://" + sqlDatasource.getUsername() + ":" + sqlDatasource.getPassword() + "@" + sqlDatasource.getHost() +
            ":" + sqlDatasource.getPort() + "/" + sqlDatasource.getDbName();
    }
}
