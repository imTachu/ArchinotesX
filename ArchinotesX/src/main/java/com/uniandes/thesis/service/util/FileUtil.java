package com.uniandes.thesis.service.util;

import com.google.common.io.Resources;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FileUtil {

    public void replaceContentInFile(String filePath, String name, String databaseUrl, String table) throws IOException, ParseException {
//        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
//        InputStream is = classloader.getResourceAsStream(filePath);
//        Path targetFile = Paths.get(Resources.toString(Resources.getResource(filePath), Charset.defaultCharset()));
////        try (Stream<String> input = Files.lines(Paths.get(filePath));
////        try (Stream<String> lines = Files.lines(Paths.get()));
////             List<String> replaced = lines
////                 .map(line-> line.replaceAll(plainTextPattern, replaceWith))
////                 .collect(Collectors.toList());
////             Files.write(filePath, replaced);
////    }
//    try (Stream<String> lines = Files.lines(targetFile)) {
//        List<String> replaced = lines
//            .map(line-> line.replace("TABLE_PARAMETER", table))
//            .collect(Collectors.toList());
//        Files.write(targetFile, replaced);
//    }
        String jsonString = "{\"container\":{\"docker\":{\"privileged\":false,\"image\":\"imtachu\\/data-microservice\",\"forcePullImage\":false,\"portMappings\":[{\"protocol\":\"tcp\",\"containerPort\":8080}],\"network\":\"BRIDGE\"}},\"residency\":null,\"healthChecks\":null,\"taskKillGracePeriodSeconds\":null,\"instances\":1,\"maxLaunchDelaySeconds\":3600,\"upgradeStrategy\":{\"maximumOverCapacity\":1,\"minimumHealthCapacity\":1},\"acceptedResourceRoles\":[\"slave_public\"],\"constraints\":null,\"mem\":64,\"executor\":null,\"readinessChecks\":null,\"id\":\"\\/data_microservices\\/ID_PARAMETER\",\"backoffFactor\":1.15,\"cpus\":0.1,\"backoffSeconds\":1,\"volumes\":null,\"env\":{\"TABLE\":\"TABLE_PARAMETER\",\"DATABASE_URL\":\"DATABASE_URL_PARAMETER\"},\"secrets\":null,\"dependencies\":null,\"labels\":null,\"args\":null,\"disk\":0,\"requirePorts\":false,\"gpus\":0,\"fetch\":null,\"portDefinitions\":[{\"protocol\":\"tcp\",\"port\":10000,\"labels\":{}}],\"cmd\":null,\"storeUrls\":null,\"user\":null}";
        jsonString = jsonString.replace("TABLE_PARAMETER", table);
        jsonString = jsonString.replace("DATABASE_URL_PARAMETER", databaseUrl);
        jsonString = jsonString.replace("ID_PARAMETER", name);
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(jsonString);

        System.out.println(json.toJSONString());
        System.out.println(json.toString());
//        Path targetFile = Paths.get(Resources.toString(Resources.getResource(filePath), Charset.defaultCharset()));
//        String targetFile = Resources.toString(Resources.getResource(filePath), Charset.defaultCharset());
//        Files.write(targetFile, json);
//        try (FileWriter file = new FileWriter(targetFile)) {
//            file.write(json.toJSONString());
//            System.out.println("Successfully Copied JSON Object to File...");
//            System.out.println("\nJSON Object: " + json);
//        }
 }




}
