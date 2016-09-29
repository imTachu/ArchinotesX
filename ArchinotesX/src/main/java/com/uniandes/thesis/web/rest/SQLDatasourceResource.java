package com.uniandes.thesis.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.uniandes.thesis.domain.SQLDatasource;
import com.uniandes.thesis.service.SQLDatasourceService;
import com.uniandes.thesis.web.rest.util.HeaderUtil;
import com.uniandes.thesis.web.rest.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class SQLDatasourceResource {

    @Autowired
    private SQLDatasourceService sqlDatasourceService;

    @RequestMapping(value = "/accidentes",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SQLDatasource> createSQLDatasource(@Valid @RequestBody SQLDatasource accidente) throws Exception{
        if (accidente.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("accidente", "idexists", "A new accidente cannot already have an ID")).body(null);
        }
        SQLDatasource result = sqlDatasourceService.save(accidente);
        return ResponseEntity.created(new URI("/api/accidentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("accidente", result.getId().toString()))
            .body(result);
    }

    @RequestMapping(value = "/accidentes",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SQLDatasource> updateSQLDatasource(@Valid @RequestBody SQLDatasource accidente) throws Exception {
        if (accidente.getId() == null) {
            return createSQLDatasource(accidente);
        }
        SQLDatasource result = sqlDatasourceService.save(accidente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("accidente", accidente.getId().toString()))
            .body(result);
    }

    @RequestMapping(value = "/accidentes",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<SQLDatasource>> getAllSQLDatasources(Pageable pageable) throws URISyntaxException {
        Page<SQLDatasource> page = sqlDatasourceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/accidentes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/accidentes/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SQLDatasource> getSQLDatasource(@PathVariable Long id) {
        SQLDatasource accidente = sqlDatasourceService.findOne(id);
        return Optional.ofNullable(accidente)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
