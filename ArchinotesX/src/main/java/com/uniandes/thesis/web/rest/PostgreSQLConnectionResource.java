package com.uniandes.thesis.web.rest;

import com.uniandes.thesis.domain.SQLDatasource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

@RestController
@RequestMapping(value = "/api/postgresql", produces = MediaType.APPLICATION_JSON_VALUE)
public class PostgreSQLConnectionResource {

    /**
     * Service to test if a database can be reached
     *
     * @param sqldatasource
     * @return
     * @throws SQLException
     */
    @RequestMapping(value = "/test-connection", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createSQLDatasource(@Valid @RequestBody SQLDatasource sqldatasource) {
        try {
            testConnection(sqldatasource);
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
        return ResponseEntity.ok().body(null);
    }

    /**
     * Get all tables of a given datasource
     *
     * @param sqldatasource
     * @throws SQLException
     */
    @RequestMapping(value = "/get-tables", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public void getAllTenants(@Valid @RequestBody SQLDatasource sqldatasource) throws SQLException {
        Connection connection = testConnection(sqldatasource);
        if (connection != null) {
            System.out.println("You made it, take control your database now!");
            DatabaseMetaData md = connection.getMetaData();
            ResultSet rs = md.getTables(null, null, "%", null);
            while (rs.next()) {
                System.out.println(rs.getString(3));
            }

        } else {
            System.out.println("Failed to make connection!");
        }
    }

    /**
     * Tests if a PostgreSQL database can be reached
     *
     * @param sqlDatasource
     * @return
     */
    public Connection testConnection(SQLDatasource sqlDatasource) throws SQLException {
        return DriverManager.getConnection("jdbc:postgresql://" + sqlDatasource.getHost() + ":" +
            sqlDatasource.getPort() + "/" + sqlDatasource.getDbName(), sqlDatasource.getUsername(), sqlDatasource.getPassword());
    }
}
