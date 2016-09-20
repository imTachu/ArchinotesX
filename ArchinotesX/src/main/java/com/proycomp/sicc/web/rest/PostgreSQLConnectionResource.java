package com.proycomp.sicc.web.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

@RestController
@RequestMapping(value = "/sicc", produces = MediaType.APPLICATION_JSON_VALUE)
public class PostgreSQLConnectionResource {

    @RequestMapping(value = "/tenants", method = RequestMethod.GET)
    public void getAllTenants() throws SQLException {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("Where is your PostgreSQL JDBC Driver? "
                + "Include it in your library path!");
            e.printStackTrace();
            return;
        }

        System.out.println("PostgreSQL JDBC Driver Registered!");
        Connection connection;

        try {
            connection = DriverManager.getConnection(
                "jdbc:postgresql://archinotesx.cv3pd00vsf0w.us-east-1.rds.amazonaws.com:5432/archinotesx", "archinotesx",
                "archinotesx");
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
            return;
        }
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

}
