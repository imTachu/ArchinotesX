package com.uniandes.thesis.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Lorena Salamanca
 */
@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@ToString(of = {"id"})
@Entity
@Table(name = "sql_datasource")
public class SQLDatasource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "host", nullable = false)
    private String host;

    @NotNull
    @Column(name = "db_name", nullable = false)
    private String dbName;

    @NotNull
    @Column(name = "username", nullable = false)
    private String username;

    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Column(name = "port", length = 5, nullable = false)
    private int port;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "sqlDatasource")
    private List<DataMicroservice> dataMicroservices;

    public SQLDatasource() {
        super();
        dataMicroservices = new ArrayList<>();
    }

}
