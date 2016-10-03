package com.uniandes.thesis.service.util;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class ShellUtil {

    /**
     * Executes any bash command
     *
     * @param command
     * @return
     */
    public String executeCommand(String command) {
        StringBuffer output = new StringBuffer();
        Process p;
        try {
//            p = Runtime.getRuntime().exec(new String[]{"bash","-c", command});
            p = Runtime.getRuntime().exec(command);
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
