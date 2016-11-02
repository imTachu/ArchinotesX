package com.uniandes.thesis.service.util;

import com.google.common.io.Files;
import com.uniandes.thesis.config.DCOSJson;
import com.uniandes.thesis.service.DCOSService;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FileUtil {

    private static final File dataMicroserviceTemplate = loadReadOnlyFromClasspath(DCOSJson.CREATE_DATA_MICROSERVICE.getFilePath());
//    private static final File tempFolder = prepareTempFolder();

    private static File prepareTempFolder() {
        File result;
        try {
            result = java.nio.file.Files.createTempDirectory(
                DCOSService.class.getSimpleName()).toFile();
            System.out.println(result.toString());

            return result;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static File loadReadOnlyFromClasspath(String relPath) {
        URL urlTemplate = FileUtil.class.getResource(relPath);
        File f = new File(urlTemplate.getFile());
        f.setWritable(false);

        return f;
    }

    public File replaceContentInFile(String name, String databaseUrl, String table) throws IOException {
        File tempFolder = new File("D:\\lsalamanca\\Descargas\\dcos");
        System.out.println(tempFolder.getPath());
        File target = new File(tempFolder, "./" + name + ".json");
        Files.copy(dataMicroserviceTemplate, target);
        target.createNewFile();
        try (Stream<String> lines = java.nio.file.Files.lines(target.toPath())) {
            List<String> replaced = lines
                .map(line -> line.replaceAll("DATABASE_URL_PARAM", databaseUrl))
                .map(line -> line.replaceAll("TABLE_PARAM", table))
                .map(line -> line.replaceAll("MICROSERVICE_ID_PARAM", name))
                .collect(Collectors.toList());
            java.nio.file.Files.write(target.toPath(), replaced);
        }
        return tempFolder;
    }
}
