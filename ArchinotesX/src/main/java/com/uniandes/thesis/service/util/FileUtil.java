package com.uniandes.thesis.service.util;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;

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
        String jsonString = "{\"volumes\":null,\"id\":\"/data-microservices/ID_PARAMETER\",\"cmd\":null,\"args\":null,\"user\":null,\"env\":{\"DATABASE_URL\":\"DATABASE_URL_PARAMETER\",\"TABLE\":\"TABLE_PARAMETER\"},\"instances\":1,\"cpus\":0.1,\"mem\":64,\"disk\":0,\"gpus\":0,\"executor\":null,\"constraints\":null,\"fetch\":null,\"storeUrls\":null,\"backoffSeconds\":1,\"backoffFactor\":1.15,\"maxLaunchDelaySeconds\":3600,\"container\":{\"docker\":{\"image\":\"imtachu/data-microservice\",\"forcePullImage\":false,\"privileged\":false,\"portMappings\":[{\"containerPort\":80,\"protocol\":\"tcp\"}],\"network\":\"BRIDGE\"}},\"healthChecks\":null,\"readinessChecks\":null,\"dependencies\":null,\"upgradeStrategy\":{\"minimumHealthCapacity\":1,\"maximumOverCapacity\":1},\"labels\":null,\"acceptedResourceRoles\": [\"slave_public\"],\"residency\":null,\"secrets\":null,\"taskKillGracePeriodSeconds\":null,\"portDefinitions\":[{\"port\":10000,\"protocol\":\"tcp\",\"labels\":{}}],\"requirePorts\":false}";
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

        try (FileWriter file = new FileWriter("D:\\tesis\\" + name + ".json")) {
            file.write(json.toJSONString());
            System.out.println("Successfully Copied JSON Object to File...");
            System.out.println("\nJSON Object: " + json);
        }

    }
}
