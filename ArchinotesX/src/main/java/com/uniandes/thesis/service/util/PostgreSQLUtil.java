package com.uniandes.thesis.service.util;

import com.uniandes.thesis.domain.SQLDatasource;
import org.springframework.stereotype.Service;

@Service
public class PostgreSQLUtil {

    public String createConnectionString(SQLDatasource sqlDatasource) {
        return "jdbc:postgresql://" + sqlDatasource.getUsername() + ":" + sqlDatasource.getPassword() + "@" +
            sqlDatasource.getHost() + ":" + sqlDatasource.getPort() + "/" + sqlDatasource.getDbName();
    }
}
