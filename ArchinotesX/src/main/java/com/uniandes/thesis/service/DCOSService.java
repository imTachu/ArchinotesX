package com.uniandes.thesis.service;

import com.uniandes.thesis.config.DCOSJson;
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

    public void createDataMicroservice(String name, String databaseUrl, String table) throws IOException, ParseException {
        File tempFolder = fileUtil.replaceContentInFile(name, databaseUrl, table);

        String output = shellUtil.executeCommand(tempFolder, name);
//        String output = shellUtil.executeCommand("dcos marathon app add myApp.json");
        System.out.println(output);
    }
}
