package com.uniandes.thesis.web.rest;

import com.uniandes.thesis.domain.DataMicroservice;
import com.uniandes.thesis.service.DCOSService;
import com.uniandes.thesis.service.DataMicroserviceService;
import com.uniandes.thesis.web.rest.util.HeaderUtil;
import com.uniandes.thesis.web.rest.util.PaginationUtil;
import org.json.simple.parser.ParseException;
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
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DataMicroserviceResource {

    @Autowired
    private DataMicroserviceService dataMicroserviceService;

    @Autowired
    private DCOSService dcosService;

    /**
     * Create a new DataMicroservice
     *
     * @param datamicroservice
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/datamicroservices", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DataMicroservice> createDataMicroservice(@Valid @RequestBody DataMicroservice datamicroservice) throws Exception {
        if (datamicroservice.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("datamicroservice", "idexists", "A new datamicroservice cannot already have an ID")).body(null);
        }
        DataMicroservice result = dataMicroserviceService.save(datamicroservice);
        return ResponseEntity.created(new URI("/api/datamicroservices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("datamicroservice", result.getId().toString()))
            .body(result);
    }

    /**
     * Update a DataMicroservice
     *
     * @param datamicroservice
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/datamicroservices", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DataMicroservice> updateDataMicroservice(@Valid @RequestBody DataMicroservice datamicroservice) throws Exception {
        if (datamicroservice.getId() == null) {
            return createDataMicroservice(datamicroservice);
        }
        DataMicroservice result = dataMicroserviceService.save(datamicroservice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("datamicroservice", datamicroservice.getId().toString()))
            .body(result);
    }

    /**
     * Delete a DataMicroservice
     *
     * @param datamicroservice
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/datamicroservices", method = RequestMethod.DELETE)
    public ResponseEntity deleteDataMicroservice(@Valid @RequestBody DataMicroservice datamicroservice) throws Exception {
        if (datamicroservice.getId() == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("datamicroservice", "idnull", "Cannot delete a cannot without an ID")).body(null);
        }
        dataMicroserviceService.delete(datamicroservice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityDeletionAlert("datamicroservice", "Successfully deleted")).body(null);
    }

    /**
     * Get all DataMicroservice
     *
     * @param pageable
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(value = "/datamicroservices", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DataMicroservice>> getAllDataMicroservices(Pageable pageable) throws URISyntaxException, IOException, ParseException {
        Page<DataMicroservice> page = dataMicroserviceService.findAll(pageable);
        dcosService.createDataMicroservice("teeeest", "postgres://test:testtest@test.c4zzuekbjjf5.us-west-2.rds.amazonaws.com:5432/test", "sgdrgdfdfg");
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/datamicroservices");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * Get a DataMicroservice
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/datamicroservices/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DataMicroservice> getDataMicroservice(@PathVariable Long id) {
        DataMicroservice datamicroservice = dataMicroserviceService.findOne(id);
        return Optional.ofNullable(datamicroservice)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
