package com.uniandes.thesis.service.util;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

@Service
public class ShellUtil {

    /**
     * Executes any bash command
     *
     * @param fileName
     * @return
     */
    public String executeCommand(File tempFolder, String fileName) {
        StringBuffer output = new StringBuffer();
        Process p;
        try {
            p =  Runtime.getRuntime().exec("cmd /c dcos marathon app add " + fileName + ".json", null, tempFolder);

            p.waitFor();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return output.toString();

    }
}
