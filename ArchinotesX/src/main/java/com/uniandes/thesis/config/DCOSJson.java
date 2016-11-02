package com.uniandes.thesis.config;

public enum DCOSJson {

    CREATE_DATA_MICROSERVICE("/dcos/data-microservice.json");

    private final String filePath;

    DCOSJson(final String filePath) {
        this.filePath = filePath;
    }

    public String getFilePath() {
        return filePath;
    }

}
