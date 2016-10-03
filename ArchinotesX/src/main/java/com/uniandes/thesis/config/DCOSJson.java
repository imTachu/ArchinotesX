package com.uniandes.thesis.config;

import java.time.LocalDate;

public enum DCOSJson {

    CREATE_DATA_MICROSERVICE("dcos/data_microservice.json", "indice-cumplimiento");

    private final String filePath;

    private final String prefijoArchivoDescarga;

    DCOSJson(final String filePath, final String prefijoArchivoDescarga) {
        this.filePath = filePath;
        this.prefijoArchivoDescarga = prefijoArchivoDescarga;
    }

    public String filename() {
        return prefijoArchivoDescarga;
    }

    public String filename(LocalDate fromDate, LocalDate toDate) {
        return prefijoArchivoDescarga + "_" + fromDate + "_" + toDate;
    }

    public String getFilePath() {
        return filePath;
    }

}
