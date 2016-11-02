package com.uniandes.thesis.service;

import com.uniandes.thesis.config.DCOSJson;
import com.uniandes.thesis.domain.SQLDatasource;
import com.uniandes.thesis.service.util.FileUtil;
import com.uniandes.thesis.service.util.ShellUtil;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class DCOSService {

    @Autowired
    public ShellUtil shellUtil;

    @Autowired
    public FileUtil fileUtil;

    @Autowired
    public SQLDatasourceService sqlDatasourceService;

    public void createDataMicroservice(String name, Long datasourceId, String table) throws IOException, ParseException {
        String databaseUrl = sqlDatasourceService.getConnectionString(datasourceId);
        File tempFolder = fileUtil.replaceContentInFile(name, databaseUrl, table);
        String output = shellUtil.executeCommand(tempFolder, name);
        System.out.println(output);
    }
}
