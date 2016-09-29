package com.uniandes.thesis.web.rest.util;

import org.springframework.http.HttpHeaders;

/**
 * Utility class for HTTP headers creation.
 *
 */
public class HeaderUtil {

    public static HttpHeaders createAlert(String message, String param) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-archinotesxApp-alert", message);
        headers.add("X-archinotesxApp-params", param);
        return headers;
    }

    public static HttpHeaders createEntityCreationAlert(String entityName, String param) {
        //return createAlert("Se ha creado " + entityName + " con el identificador " + param, param);
        return createAlert("Se ha creado registro con el identificador " + param, param);
    }

    public static HttpHeaders createEntityUpdateAlert(String entityName, String param) {
        //return createAlert("Se ha actualizado " + entityName + " con el identificador " + param, param);
        return createAlert("Se ha actualizado registro con el identificador " + param, param);
    }

    public static HttpHeaders createEntityDeletionAlert(String entityName, String param) {
        //return createAlert("El registro " + entityName + " se borró con el identificador " + param, param);
        return createAlert("El registro registro se borró con el identificador " + param, param);
    }

    public static HttpHeaders createFailureAlert(String entityName, String errorKey, String defaultMessage) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-archinotesxApp-error", defaultMessage);
        headers.add("X-archinotesxApp-params", entityName);
        return headers;
    }
}
