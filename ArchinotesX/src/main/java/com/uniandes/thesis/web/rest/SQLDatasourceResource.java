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

    @RequestMapping(value = "/sqldatasources",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SQLDatasource> createSQLDatasource(@Valid @RequestBody SQLDatasource sqldatasource) throws Exception{
        if (sqldatasource.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("sqldatasource", "idexists", "A new sqldatasource cannot already have an ID")).body(null);
        }
        SQLDatasource result = sqlDatasourceService.save(sqldatasource);
        return ResponseEntity.created(new URI("/api/sqldatasources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("sqldatasource", result.getId().toString()))
            .body(result);
    }

    @RequestMapping(value = "/sqldatasources",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SQLDatasource> updateSQLDatasource(@Valid @RequestBody SQLDatasource sqldatasource) throws Exception {
        if (sqldatasource.getId() == null) {
            return createSQLDatasource(sqldatasource);
        }
        SQLDatasource result = sqlDatasourceService.save(sqldatasource);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("sqldatasource", sqldatasource.getId().toString()))
            .body(result);
    }

    @RequestMapping(value = "/sqldatasources",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<SQLDatasource>> getAllSQLDatasources(Pageable pageable) throws URISyntaxException {
        Page<SQLDatasource> page = sqlDatasourceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sqldatasources");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/sqldatasources/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SQLDatasource> getSQLDatasource(@PathVariable Long id) {
        SQLDatasource sqldatasource = sqlDatasourceService.findOne(id);
        return Optional.ofNullable(sqldatasource)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
