-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: archinotesx
-- ------------------------------------------------------
-- Server version	5.6.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accidente`
--

DROP TABLE IF EXISTS `accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_recepcion_llamada` timestamp NULL,
  `reportado_por_tercero` bit(1) DEFAULT NULL,
  `nombre_persona_que_reporta` varchar(40) DEFAULT NULL,
  `telefono_persona_que_reporta` varchar(10) DEFAULT NULL,
  `kilometro` int(11) DEFAULT NULL,
  `abscisa` int(11) DEFAULT NULL,
  `fecha_llegada_senalizacion` timestamp NULL,
  `fecha_llegada_ambulancia` timestamp NULL,
  `fecha_llegada_vehiculo_apoyo` timestamp NULL,
  `fecha_llegada_fin_despeje` timestamp NULL,
  `otra_infraestructura_afectada` varchar(20) DEFAULT NULL,
  `requiere_cierre_de_via` bit(1) DEFAULT NULL,
  `fecha_inicio_cierre_via` timestamp NULL,
  `fecha_fin_cierre_via` timestamp NULL,
  `entidad_que_cierra_via` varchar(20) DEFAULT NULL,
  `tipo_de_cierre` varchar(10) DEFAULT NULL,
  `comentario` varchar(500) DEFAULT NULL,
  `comentario_interventor` varchar(500) DEFAULT NULL,
  `visto_bueno_interventor` bit(1) DEFAULT NULL,
  `cumple` bit(1) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `infraestructura_en_accidente_id` bigint(20) DEFAULT NULL,
  `causa_de_accidente_id` bigint(20) DEFAULT NULL,
  `tipo_de_accidente_id` bigint(20) DEFAULT NULL,
  `clima_en_accidente_id` bigint(20) DEFAULT NULL,
  `tipo_novedad_de_accidente_id` bigint(20) DEFAULT NULL,
  `tramo_de_accidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_accidente_infraestructuraenaccidente_id` (`infraestructura_en_accidente_id`),
  KEY `fk_accidente_causadeaccidente_id` (`causa_de_accidente_id`),
  KEY `fk_accidente_tipodeaccidente_id` (`tipo_de_accidente_id`),
  KEY `fk_accidente_climaenaccidente_id` (`clima_en_accidente_id`),
  KEY `fk_accidente_tiponovedaddeaccidente_id` (`tipo_novedad_de_accidente_id`),
  KEY `fk_accidente_tramodeaccidente_id` (`tramo_de_accidente_id`),
  CONSTRAINT `fk_accidente_causadeaccidente_id` FOREIGN KEY (`causa_de_accidente_id`) REFERENCES `causa_accidente` (`id`),
  CONSTRAINT `fk_accidente_climaenaccidente_id` FOREIGN KEY (`clima_en_accidente_id`) REFERENCES `factor_climatologico` (`id`),
  CONSTRAINT `fk_accidente_infraestructuraenaccidente_id` FOREIGN KEY (`infraestructura_en_accidente_id`) REFERENCES `infraestructura_afectada` (`id`),
  CONSTRAINT `fk_accidente_tipodeaccidente_id` FOREIGN KEY (`tipo_de_accidente_id`) REFERENCES `tipo_accidente` (`id`),
  CONSTRAINT `fk_accidente_tiponovedaddeaccidente_id` FOREIGN KEY (`tipo_novedad_de_accidente_id`) REFERENCES `tipo_novedad_accidente` (`id`),
  CONSTRAINT `fk_accidente_tramodeaccidente_id` FOREIGN KEY (`tramo_de_accidente_id`) REFERENCES `tramo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accidente`
--

LOCK TABLES `accidente` WRITE;
/*!40000 ALTER TABLE `accidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archivo_accidente`
--

DROP TABLE IF EXISTS `archivo_accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archivo_accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `extension` varchar(4) DEFAULT NULL,
  `fecha_de_registro` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ubicacion` varchar(255) NOT NULL,
  `bucket` varchar(255) DEFAULT NULL,
  `key_s_3` varchar(255) DEFAULT NULL,
  `id_version` varchar(255) DEFAULT NULL,
  `archivo_de_accidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_archivoaccidente_archivodeaccidente_id` (`archivo_de_accidente_id`),
  CONSTRAINT `fk_archivoaccidente_archivodeaccidente_id` FOREIGN KEY (`archivo_de_accidente_id`) REFERENCES `accidente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivo_accidente`
--

LOCK TABLES `archivo_accidente` WRITE;
/*!40000 ALTER TABLE `archivo_accidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `archivo_accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archivo_incidente`
--

DROP TABLE IF EXISTS `archivo_incidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archivo_incidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `extension` varchar(6) DEFAULT NULL,
  `fecha_de_registro` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ubicacion` varchar(255) NOT NULL,
  `bucket` varchar(255) DEFAULT NULL,
  `key_s_3` varchar(255) DEFAULT NULL,
  `id_version` varchar(255) DEFAULT NULL,
  `archivo_de_incidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_archivoincidente_archivodeincidente_id` (`archivo_de_incidente_id`),
  CONSTRAINT `fk_archivoincidente_archivodeincidente_id` FOREIGN KEY (`archivo_de_incidente_id`) REFERENCES `incidente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivo_incidente`
--

LOCK TABLES `archivo_incidente` WRITE;
/*!40000 ALTER TABLE `archivo_incidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `archivo_incidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `causa_accidente`
--

DROP TABLE IF EXISTS `causa_accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `causa_accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `causa_accidente` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `causa_accidente`
--

LOCK TABLES `causa_accidente` WRITE;
/*!40000 ALTER TABLE `causa_accidente` DISABLE KEYS */;
INSERT INTO `causa_accidente` VALUES (1,'Exceso de velocidad'),(2,'Deficiencia humana'),(3,'Deficiencia mecánica'),(4,'Deficiencia en la vía'),(5,'Factores climatológicos');
/*!40000 ALTER TABLE `causa_accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `causa_incidente`
--

DROP TABLE IF EXISTS `causa_incidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `causa_incidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `causa_incidente` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `causa_incidente`
--

LOCK TABLES `causa_incidente` WRITE;
/*!40000 ALTER TABLE `causa_incidente` DISABLE KEYS */;
INSERT INTO `causa_incidente` VALUES (1,'Exceso de velocidad'),(2,'Deficiencia humana'),(3,'Deficiencia mecánica'),(4,'Deficiencia en la vía'),(5,'Factores climatológicos');
/*!40000 ALTER TABLE `causa_incidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centro_medico`
--

DROP TABLE IF EXISTS `centro_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `centro_medico` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_centro_medico` varchar(50) NOT NULL,
  `direccion_centro_medico` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centro_medico`
--

LOCK TABLES `centro_medico` WRITE;
/*!40000 ALTER TABLE `centro_medico` DISABLE KEYS */;
/*!40000 ALTER TABLE `centro_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `databasechangelog`
--

DROP TABLE IF EXISTS `databasechangelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangelog`
--

LOCK TABLES `databasechangelog` WRITE;
/*!40000 ALTER TABLE `databasechangelog` DISABLE KEYS */;
INSERT INTO `databasechangelog` VALUES ('00000000000001','jhipster','classpath:config/liquibase/changelog/00000000000000_initial_schema.xml','2016-05-08 17:33:21',1,'EXECUTED','7:79e59235ba33ccca325a0c23fd289e04','createTable, createIndex (x2), createTable (x2), addPrimaryKey, addForeignKeyConstraint (x2), loadData, dropDefaultValue, loadData (x2), createTable (x2), addPrimaryKey, createIndex (x2), addForeignKeyConstraint','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_Tramo.xml','2016-05-08 17:33:22',2,'EXECUTED','7:2fd644950cb16a0219fde87b262fd495','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_InfraestructuraAfectada.xml','2016-05-08 17:33:22',3,'EXECUTED','7:e01be8e242a7822b16e273dd5bee7c02','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_TipoVehiculoAfectado.xml','2016-05-08 17:33:22',4,'EXECUTED','7:b2706614d2c83d9708b636069cbc161a','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_TipoVehiculoApoyo.xml','2016-05-08 17:33:23',5,'EXECUTED','7:ceceb1266ef4df59219d1f7ddf2d0e68','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_FactorClimatologico.xml','2016-05-08 17:33:23',6,'EXECUTED','7:110bda1f19327848fd65bf3a46f8da1f','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_CausaIncidente.xml','2016-05-08 17:33:23',7,'EXECUTED','7:7ec5561cb63c9a5660a01d20d9c51e19','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_TipoIncidente.xml','2016-05-08 17:33:24',8,'EXECUTED','7:2e96f6d053c987c68ffbb1a65436a66b','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_Incidente.xml','2016-05-08 17:33:25',9,'EXECUTED','7:112ecd29b513e8dc851be0033cf29d4c','createTable, dropDefaultValue (x7)','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_VehiculoAfectadoEnIncidente.xml','2016-05-08 17:33:25',10,'EXECUTED','7:4339429cbea7edddf9e3d6c8bdddf1bc','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_VehiculoDeApoyoIncidente.xml','2016-05-08 17:33:25',11,'EXECUTED','7:d7dccb8b25a3c8a1df433ed19721c051','createTable, dropDefaultValue (x3)','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_InteraccionIncidente.xml','2016-05-08 17:33:26',12,'EXECUTED','7:c00fdb002374b6c521a28e3fb0a6a0d3','createTable, dropDefaultValue','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_ArchivoIncidente.xml','2016-05-08 17:33:26',13,'EXECUTED','7:e2411d88382b5b351766a541cbd01346','createTable, dropDefaultValue','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_CausaAccidente.xml','2016-05-08 17:33:27',14,'EXECUTED','7:12f241f7da9bdea904b567639f2c434a','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_TipoAccidente.xml','2016-05-08 17:33:27',15,'EXECUTED','7:4b3b2efe92e329d72650b0675afdac1d','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_TipoNovedadAccidente.xml','2016-05-08 17:33:27',16,'EXECUTED','7:1b0e20163f9ba5e94c12d9486b7b1b24','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_CentroMedico.xml','2016-05-08 17:33:27',17,'EXECUTED','7:481a04ff1bbf81e0f0d4b4b6ca744569','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_TipoAfectacionPersona.xml','2016-05-08 17:33:28',18,'EXECUTED','7:5cefbccbb5a4aa2055622ac0b62be278','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_Accidente.xml','2016-05-08 17:33:29',19,'EXECUTED','7:00d59ae97c5c16128432d3db83f31389','createTable, dropDefaultValue (x7)','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_PersonaAfectadaEnAccidente.xml','2016-05-08 17:33:29',20,'EXECUTED','7:c7dabfc9d388133510d14330898fc955','createTable, dropDefaultValue (x2)','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_VehiculoAfectadoEnAccidente.xml','2016-05-08 17:33:29',21,'EXECUTED','7:f6f3a967b87ea51d92be04b79f9159d1','createTable','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_VehiculoDeApoyoAccidente.xml','2016-05-08 17:33:30',22,'EXECUTED','7:648773f7374140dc6591b5baafe27659','createTable, dropDefaultValue (x3)','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_InteraccionAccidente.xml','2016-05-08 17:33:30',23,'EXECUTED','7:2599fddcef749a0acd0e5e01f2f99b64','createTable, dropDefaultValue','',NULL,'3.4.2',NULL,NULL),('20160504210227-1','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_ArchivoAccidente.xml','2016-05-08 17:33:31',24,'EXECUTED','7:da5f818280c706d66483ce2255d4e3fd','createTable, dropDefaultValue','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_Incidente.xml','2016-05-08 17:33:36',25,'EXECUTED','7:e5e02bc1a49c756de1ed31fb2fea200f','addForeignKeyConstraint (x5)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_VehiculoAfectadoEnIncidente.xml','2016-05-08 17:33:38',26,'EXECUTED','7:f1e76ac60a8fc04a2b8d24b04e22eee3','addForeignKeyConstraint (x2)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_VehiculoDeApoyoIncidente.xml','2016-05-08 17:33:41',27,'EXECUTED','7:a81e696270944c5d7c00ac59f8d2e133','addForeignKeyConstraint (x2)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_InteraccionIncidente.xml','2016-05-08 17:33:43',28,'EXECUTED','7:eff733fdcfa5a044beafdc74a29810d9','addForeignKeyConstraint (x2)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_ArchivoIncidente.xml','2016-05-08 17:33:44',29,'EXECUTED','7:a8922db80a7fb6f6569e6dddd62234e4','addForeignKeyConstraint','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_Accidente.xml','2016-05-08 17:33:50',30,'EXECUTED','7:9a904145b37b4592065c680b66c70a54','addForeignKeyConstraint (x6)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_PersonaAfectadaEnAccidente.xml','2016-05-08 17:33:54',31,'EXECUTED','7:83ff6dd03e997cf9dfcdf7022de03aec','addForeignKeyConstraint (x3)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_VehiculoAfectadoEnAccidente.xml','2016-05-08 17:33:56',32,'EXECUTED','7:df2003ff62234d709f727a180a47ba65','addForeignKeyConstraint (x2)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_VehiculoDeApoyoAccidente.xml','2016-05-08 17:33:58',33,'EXECUTED','7:8b76bedc48407b789baec1efdec69e67','addForeignKeyConstraint (x2)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_InteraccionAccidente.xml','2016-05-08 17:34:00',34,'EXECUTED','7:d16747facecde0569e3aaa929a67d0ba','addForeignKeyConstraint (x2)','',NULL,'3.4.2',NULL,NULL),('20160504210227-2','jhipster','classpath:config/liquibase/changelog/20160504210227_added_entity_constraints_ArchivoAccidente.xml','2016-05-08 17:34:01',35,'EXECUTED','7:e60219abf0cb488d491e27b332220bd8','addForeignKeyConstraint','',NULL,'3.4.2',NULL,NULL);
/*!40000 ALTER TABLE `databasechangelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `databasechangeloglock`
--

DROP TABLE IF EXISTS `databasechangeloglock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangeloglock`
--

LOCK TABLES `databasechangeloglock` WRITE;
/*!40000 ALTER TABLE `databasechangeloglock` DISABLE KEYS */;
INSERT INTO `databasechangeloglock` VALUES (1,'\0',NULL,NULL);
/*!40000 ALTER TABLE `databasechangeloglock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factor_climatologico`
--

DROP TABLE IF EXISTS `factor_climatologico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factor_climatologico` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `condicion_clima` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factor_climatologico`
--

LOCK TABLES `factor_climatologico` WRITE;
/*!40000 ALTER TABLE `factor_climatologico` DISABLE KEYS */;
INSERT INTO `factor_climatologico` VALUES (1,'Normal'),(2,'Neblina'),(3,'Lluvia'),(4,'Vendaval');
/*!40000 ALTER TABLE `factor_climatologico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidente`
--

DROP TABLE IF EXISTS `incidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `incidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_recepcion_llamada` timestamp NULL,
  `reportado_por_tercero` bit(1) DEFAULT NULL,
  `nombre_persona_que_reporta` varchar(40) DEFAULT NULL,
  `telefono_persona_que_reporta` varchar(10) DEFAULT NULL,
  `kilometro` int(11) DEFAULT NULL,
  `abscisa` int(11) DEFAULT NULL,
  `fecha_inicio_senalizacion` timestamp NULL,
  `fecha_fin_senalizacion` timestamp NULL,
  `fecha_inicio_despeje` timestamp NULL,
  `fecha_fin_despeje` timestamp NULL,
  `m_3_derrumbe` int(11) DEFAULT NULL,
  `otra_infraestructura_afectada` varchar(20) DEFAULT NULL,
  `requiere_cierre_de_via` bit(1) DEFAULT NULL,
  `fecha_inicio_cierre_via` timestamp NULL,
  `fecha_fin_cierre_via` timestamp NULL,
  `entidad_que_cierra_via` varchar(20) DEFAULT NULL,
  `tipo_de_cierre` varchar(10) DEFAULT NULL,
  `comentario` varchar(500) DEFAULT NULL,
  `comentario_interventor` varchar(500) DEFAULT NULL,
  `visto_bueno_interventor` bit(1) DEFAULT NULL,
  `cumple` bit(1) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `infraestructura_en_incidente_id` bigint(20) DEFAULT NULL,
  `causa_de_incidente_id` bigint(20) DEFAULT NULL,
  `tipo_de_incidente_id` bigint(20) DEFAULT NULL,
  `clima_en_incidente_id` bigint(20) DEFAULT NULL,
  `tramo_de_incidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_incidente_infraestructuraenincidente_id` (`infraestructura_en_incidente_id`),
  KEY `fk_incidente_causadeincidente_id` (`causa_de_incidente_id`),
  KEY `fk_incidente_tipodeincidente_id` (`tipo_de_incidente_id`),
  KEY `fk_incidente_climaenincidente_id` (`clima_en_incidente_id`),
  KEY `fk_incidente_tramodeincidente_id` (`tramo_de_incidente_id`),
  CONSTRAINT `fk_incidente_causadeincidente_id` FOREIGN KEY (`causa_de_incidente_id`) REFERENCES `causa_incidente` (`id`),
  CONSTRAINT `fk_incidente_climaenincidente_id` FOREIGN KEY (`clima_en_incidente_id`) REFERENCES `factor_climatologico` (`id`),
  CONSTRAINT `fk_incidente_infraestructuraenincidente_id` FOREIGN KEY (`infraestructura_en_incidente_id`) REFERENCES `infraestructura_afectada` (`id`),
  CONSTRAINT `fk_incidente_tipodeincidente_id` FOREIGN KEY (`tipo_de_incidente_id`) REFERENCES `tipo_incidente` (`id`),
  CONSTRAINT `fk_incidente_tramodeincidente_id` FOREIGN KEY (`tramo_de_incidente_id`) REFERENCES `tramo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidente`
--

LOCK TABLES `incidente` WRITE;
/*!40000 ALTER TABLE `incidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `incidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infraestructura_afectada`
--

DROP TABLE IF EXISTS `infraestructura_afectada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infraestructura_afectada` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `infraestructura_afectada` varchar(30) NOT NULL,
  `tipo_infraestructura` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infraestructura_afectada`
--

LOCK TABLES `infraestructura_afectada` WRITE;
/*!40000 ALTER TABLE `infraestructura_afectada` DISABLE KEYS */;
INSERT INTO `infraestructura_afectada` VALUES (1,'Berma','Vía'),(2,'Calzada completa','Vía'),(3,'Carril','Vía'),(4,'Puente','Vía'),(5,'Box coulvert','Estructura hidráulica'),(6,'Alcantarilla','Estructura hidráulica'),(7,'Peaje','Infraestructura operativa'),(8,'Báscula','Infraestructura operativa'),(9,'CCO','Infraestructura operativa'),(10,'Área de servicio','Infraestructura operativa'),(11,'Base operativa','Infraestructura operativa'),(12,'Glorieta','Vía');
/*!40000 ALTER TABLE `infraestructura_afectada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interaccion_accidente`
--

DROP TABLE IF EXISTS `interaccion_accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interaccion_accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_de_interaccion` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `interaccion` varchar(15) NOT NULL,
  `usuario_de_interaccion_accidente_id` bigint(20) DEFAULT NULL,
  `interaccion_en_accidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_interaccionaccidente_usuariodeinteraccionaccidente_id` (`usuario_de_interaccion_accidente_id`),
  KEY `fk_interaccionaccidente_interaccionenaccidente_id` (`interaccion_en_accidente_id`),
  CONSTRAINT `fk_interaccionaccidente_interaccionenaccidente_id` FOREIGN KEY (`interaccion_en_accidente_id`) REFERENCES `accidente` (`id`),
  CONSTRAINT `fk_interaccionaccidente_usuariodeinteraccionaccidente_id` FOREIGN KEY (`usuario_de_interaccion_accidente_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interaccion_accidente`
--

LOCK TABLES `interaccion_accidente` WRITE;
/*!40000 ALTER TABLE `interaccion_accidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `interaccion_accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interaccion_incidente`
--

DROP TABLE IF EXISTS `interaccion_incidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interaccion_incidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_de_interaccion` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `interaccion` varchar(15) NOT NULL,
  `usuario_de_interaccion_id` bigint(20) DEFAULT NULL,
  `interaccion_de_incidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_interaccionincidente_usuariodeinteraccion_id` (`usuario_de_interaccion_id`),
  KEY `fk_interaccionincidente_interacciondeincidente_id` (`interaccion_de_incidente_id`),
  CONSTRAINT `fk_interaccionincidente_interacciondeincidente_id` FOREIGN KEY (`interaccion_de_incidente_id`) REFERENCES `incidente` (`id`),
  CONSTRAINT `fk_interaccionincidente_usuariodeinteraccion_id` FOREIGN KEY (`usuario_de_interaccion_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interaccion_incidente`
--

LOCK TABLES `interaccion_incidente` WRITE;
/*!40000 ALTER TABLE `interaccion_incidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `interaccion_incidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_authority`
--

DROP TABLE IF EXISTS `jhi_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_authority`
--

LOCK TABLES `jhi_authority` WRITE;
/*!40000 ALTER TABLE `jhi_authority` DISABLE KEYS */;
INSERT INTO `jhi_authority` VALUES ('ROLE_ADMIN'),('ROLE_OPERADOR1'),('ROLE_OPERADOR2'),('ROLE_CONSULTA_CONCESION'),('ROLE_SUPERVISOR'),('ROLE_CONSULTA_INTERVENTOR'),('ROLE_INTERVENTOR');
/*!40000 ALTER TABLE `jhi_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_persistent_audit_event`
--

DROP TABLE IF EXISTS `jhi_persistent_audit_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_persistent_audit_event` (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `principal` varchar(255) NOT NULL,
  `event_date` timestamp NULL DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `idx_persistent_audit_event` (`principal`,`event_date`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_persistent_audit_event`
--

LOCK TABLES `jhi_persistent_audit_event` WRITE;
/*!40000 ALTER TABLE `jhi_persistent_audit_event` DISABLE KEYS */;
INSERT INTO `jhi_persistent_audit_event` VALUES (1,'user','2016-05-08 22:47:46','AUTHENTICATION_FAILURE'),(2,'user','2016-05-08 22:47:50','AUTHENTICATION_FAILURE'),(3,'user','2016-05-08 22:47:54','AUTHENTICATION_FAILURE'),(4,'user','2016-05-08 22:47:59','AUTHENTICATION_SUCCESS'),(5,'user','2016-05-09 00:10:38','AUTHENTICATION_SUCCESS'),(6,'user','2016-05-09 00:13:27','AUTHENTICATION_SUCCESS'),(7,'user','2016-05-09 22:09:57','AUTHENTICATION_FAILURE'),(8,'user','2016-05-09 22:10:02','AUTHENTICATION_SUCCESS'),(9,'user','2016-05-09 22:59:12','AUTHENTICATION_SUCCESS'),(10,'user','2016-05-09 23:06:05','AUTHENTICATION_SUCCESS'),(11,'admin','2016-05-09 23:42:56','AUTHENTICATION_SUCCESS');
/*!40000 ALTER TABLE `jhi_persistent_audit_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_persistent_audit_evt_data`
--

DROP TABLE IF EXISTS `jhi_persistent_audit_evt_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_persistent_audit_evt_data` (
  `event_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`,`name`),
  KEY `idx_persistent_audit_evt_data` (`event_id`),
  CONSTRAINT `fk_evt_pers_audit_evt_data` FOREIGN KEY (`event_id`) REFERENCES `jhi_persistent_audit_event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_persistent_audit_evt_data`
--

LOCK TABLES `jhi_persistent_audit_evt_data` WRITE;
/*!40000 ALTER TABLE `jhi_persistent_audit_evt_data` DISABLE KEYS */;
INSERT INTO `jhi_persistent_audit_evt_data` VALUES (1,'message','Bad credentials'),(1,'type','org.springframework.security.authentication.BadCredentialsException'),(2,'message','Bad credentials'),(2,'type','org.springframework.security.authentication.BadCredentialsException'),(3,'message','Bad credentials'),(3,'type','org.springframework.security.authentication.BadCredentialsException'),(7,'message','Bad credentials'),(7,'type','org.springframework.security.authentication.BadCredentialsException');
/*!40000 ALTER TABLE `jhi_persistent_audit_evt_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_user`
--

DROP TABLE IF EXISTS `jhi_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `activated` bit(1) NOT NULL,
  `lang_key` varchar(5) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NOT NULL,
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `idx_user_login` (`login`),
  UNIQUE KEY `idx_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_user`
--

LOCK TABLES `jhi_user` WRITE;
/*!40000 ALTER TABLE `jhi_user` DISABLE KEYS */;
INSERT INTO `jhi_user` VALUES (1,'system','$2a$10$mE.qmcV0mFU5NcKh73TZx.z4ueI/.bDWbj0T1BYyqP481kGGarKLG','System','System','system@localhost','','en',NULL,NULL,'system','2016-05-08 22:33:18',NULL,NULL,NULL),(2,'admin','$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC','Administrator','Administrator','admin@localhost','','en',NULL,NULL,'system','2016-05-08 22:33:18',NULL,NULL,NULL);
/*!40000 ALTER TABLE `jhi_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_user_authority`
--

DROP TABLE IF EXISTS `jhi_user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `fk_authority_name` (`authority_name`),
  CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_user_authority`
--

LOCK TABLES `jhi_user_authority` WRITE;
/*!40000 ALTER TABLE `jhi_user_authority` DISABLE KEYS */;
INSERT INTO `jhi_user_authority` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_ADMIN');
/*!40000 ALTER TABLE `jhi_user_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona_afectada_en_accidente`
--

DROP TABLE IF EXISTS `persona_afectada_en_accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persona_afectada_en_accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `genero` varchar(10) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha_inicio_traslado` timestamp NULL,
  `fecha_fin_traslado` timestamp NULL,
  `tipo_afectacion_de_persona_id` bigint(20) DEFAULT NULL,
  `centro_medico_de_traslado_id` bigint(20) DEFAULT NULL,
  `persona_afectada_en_accidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_personaafectadaenaccidente_tipoafectaciondepersona_id` (`tipo_afectacion_de_persona_id`),
  KEY `fk_personaafectadaenaccidente_centromedicodetraslado_id` (`centro_medico_de_traslado_id`),
  KEY `fk_personaafectadaenaccidente_personaafectadaenaccidente_id` (`persona_afectada_en_accidente_id`),
  CONSTRAINT `fk_personaafectadaenaccidente_centromedicodetraslado_id` FOREIGN KEY (`centro_medico_de_traslado_id`) REFERENCES `centro_medico` (`id`),
  CONSTRAINT `fk_personaafectadaenaccidente_personaafectadaenaccidente_id` FOREIGN KEY (`persona_afectada_en_accidente_id`) REFERENCES `accidente` (`id`),
  CONSTRAINT `fk_personaafectadaenaccidente_tipoafectaciondepersona_id` FOREIGN KEY (`tipo_afectacion_de_persona_id`) REFERENCES `tipo_afectacion_persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona_afectada_en_accidente`
--

LOCK TABLES `persona_afectada_en_accidente` WRITE;
/*!40000 ALTER TABLE `persona_afectada_en_accidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `persona_afectada_en_accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_accidente`
--

DROP TABLE IF EXISTS `tipo_accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo_accidente` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_accidente`
--

LOCK TABLES `tipo_accidente` WRITE;
/*!40000 ALTER TABLE `tipo_accidente` DISABLE KEYS */;
INSERT INTO `tipo_accidente` VALUES (1,'Latas'),(2,'Heridos'),(3,'Muertos');
/*!40000 ALTER TABLE `tipo_accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_afectacion_persona`
--

DROP TABLE IF EXISTS `tipo_afectacion_persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_afectacion_persona` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo_afectacion` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_afectacion_persona`
--

LOCK TABLES `tipo_afectacion_persona` WRITE;
/*!40000 ALTER TABLE `tipo_afectacion_persona` DISABLE KEYS */;
INSERT INTO `tipo_afectacion_persona` VALUES (1,'Herido leve'),(2,'Herido Grave'),(3,'Muerto');
/*!40000 ALTER TABLE `tipo_afectacion_persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_incidente`
--

DROP TABLE IF EXISTS `tipo_incidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_incidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo_incidente` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_incidente`
--

LOCK TABLES `tipo_incidente` WRITE;
/*!40000 ALTER TABLE `tipo_incidente` DISABLE KEYS */;
INSERT INTO `tipo_incidente` VALUES (1,'Derrumbe'),(2,'Caída de árbol sobre la vía'),(3,'Caída de carga sobre la vía'),(4,'Derrame de sustancias');
/*!40000 ALTER TABLE `tipo_incidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_novedad_accidente`
--

DROP TABLE IF EXISTS `tipo_novedad_accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_novedad_accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo_novedad` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_novedad_accidente`
--

LOCK TABLES `tipo_novedad_accidente` WRITE;
/*!40000 ALTER TABLE `tipo_novedad_accidente` DISABLE KEYS */;
INSERT INTO `tipo_novedad_accidente` VALUES (1,'Salida calzada'),(2,'Colisión con automóvil'),(3,'Colisión con animal'),(4,'Choque con objeto fijo'),(5,'Atropello peatón'),(6,'Accidente con bicicleta'),(7,'Accidente con moto');
/*!40000 ALTER TABLE `tipo_novedad_accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_vehiculo_afectado`
--

DROP TABLE IF EXISTS `tipo_vehiculo_afectado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_vehiculo_afectado` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo_vehiculo` varchar(20) NOT NULL,
  `clasificacion` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_vehiculo_afectado`
--

LOCK TABLES `tipo_vehiculo_afectado` WRITE;
/*!40000 ALTER TABLE `tipo_vehiculo_afectado` DISABLE KEYS */;
INSERT INTO `tipo_vehiculo_afectado` VALUES (1,'Moto','Liviano'),(2,'Automóvil','Liviano'),(3,'Camioneta','Liviano'),(4,'Van','Liviano'),(5,'Camión','Pesado');
/*!40000 ALTER TABLE `tipo_vehiculo_afectado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_vehiculo_apoyo`
--

DROP TABLE IF EXISTS `tipo_vehiculo_apoyo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_vehiculo_apoyo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo_vehiculo` varchar(20) NOT NULL,
  `clasificacion` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_vehiculo_apoyo`
--

LOCK TABLES `tipo_vehiculo_apoyo` WRITE;
/*!40000 ALTER TABLE `tipo_vehiculo_apoyo` DISABLE KEYS */;
INSERT INTO `tipo_vehiculo_apoyo` VALUES (1,'Ambulancia','Servicio médico'),(2,'Carro-taller','Servicio mecánico'),(3,'Grúa','Servicio de despeje'),(4,'Vehículo inspección','Servicio supervisión');
/*!40000 ALTER TABLE `tipo_vehiculo_apoyo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tramo`
--

DROP TABLE IF EXISTS `tramo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tramo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_tramo` varchar(60) NOT NULL,
  `unidad_funcional` varchar(7) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tramo`
--

LOCK TABLES `tramo` WRITE;
/*!40000 ALTER TABLE `tramo` DISABLE KEYS */;
INSERT INTO `tramo` VALUES (1,'UF.1-Variante El Juncal','UF.1'),(2,'UF.1-Neiva-Aipe','UF.1'),(3,'UF.1-Aipe-Castilla','UF.1'),(4,'UF.1-Castilla-Saldaña','UF.1'),(5,'UF.1-Saldaña-Espinal','UF.1'),(6,'UF.1-Espinal-Flandes','UF.1');
/*!40000 ALTER TABLE `tramo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo_afectado_en_accidente`
--

DROP TABLE IF EXISTS `vehiculo_afectado_en_accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculo_afectado_en_accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vehiculo_incidente` varchar(10) NOT NULL,
  `nombre_conductor_vehiculo_accidente` varchar(40) NOT NULL,
  `telefono_conductor_vehiculo_accidente` varchar(10) NOT NULL,
  `vehiculo_afectado_en_accidente_id` bigint(20) DEFAULT NULL,
  `vehiculo_afectado_de_accidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehiculoafectadoenaccidente_vehiculoafectadoenaccidente_id` (`vehiculo_afectado_en_accidente_id`),
  KEY `fk_vehiculoafectadoenaccidente_vehiculoafectadodeaccidente_id` (`vehiculo_afectado_de_accidente_id`),
  CONSTRAINT `fk_vehiculoafectadoenaccidente_vehiculoafectadodeaccidente_id` FOREIGN KEY (`vehiculo_afectado_de_accidente_id`) REFERENCES `accidente` (`id`),
  CONSTRAINT `fk_vehiculoafectadoenaccidente_vehiculoafectadoenaccidente_id` FOREIGN KEY (`vehiculo_afectado_en_accidente_id`) REFERENCES `tipo_vehiculo_afectado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo_afectado_en_accidente`
--

LOCK TABLES `vehiculo_afectado_en_accidente` WRITE;
/*!40000 ALTER TABLE `vehiculo_afectado_en_accidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo_afectado_en_accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo_afectado_en_incidente`
--

DROP TABLE IF EXISTS `vehiculo_afectado_en_incidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculo_afectado_en_incidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `placas_vehiculo_incidente` varchar(10) NOT NULL,
  `nombre_conductor_vehiculo_incidente` varchar(40) NOT NULL,
  `telefono_conductor_vehiculo_incidente` varchar(10) NOT NULL,
  `vehiculo_afectado_en_incidente_id` bigint(20) DEFAULT NULL,
  `vehiculo_afectado_de_incidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehiculoafectadoenincidente_vehiculoafectadoenincidente_id` (`vehiculo_afectado_en_incidente_id`),
  KEY `fk_vehiculoafectadoenincidente_vehiculoafectadodeincidente_id` (`vehiculo_afectado_de_incidente_id`),
  CONSTRAINT `fk_vehiculoafectadoenincidente_vehiculoafectadodeincidente_id` FOREIGN KEY (`vehiculo_afectado_de_incidente_id`) REFERENCES `incidente` (`id`),
  CONSTRAINT `fk_vehiculoafectadoenincidente_vehiculoafectadoenincidente_id` FOREIGN KEY (`vehiculo_afectado_en_incidente_id`) REFERENCES `tipo_vehiculo_afectado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo_afectado_en_incidente`
--

LOCK TABLES `vehiculo_afectado_en_incidente` WRITE;
/*!40000 ALTER TABLE `vehiculo_afectado_en_incidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo_afectado_en_incidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo_de_apoyo_accidente`
--

DROP TABLE IF EXISTS `vehiculo_de_apoyo_accidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculo_de_apoyo_accidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_solicitud_servicio` timestamp NULL,
  `fecha_inicio_servicio` timestamp NULL,
  `fecha_fin_servicio` timestamp NULL,
  `comentario` varchar(50) DEFAULT NULL,
  `tipo_vehiculo_de_apoyo_id` bigint(20) DEFAULT NULL,
  `vehiculo_de_apoyo_en_accidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehiculodeapoyoaccidente_tipovehiculodeapoyo_id` (`tipo_vehiculo_de_apoyo_id`),
  KEY `fk_vehiculodeapoyoaccidente_vehiculodeapoyoenaccidente_id` (`vehiculo_de_apoyo_en_accidente_id`),
  CONSTRAINT `fk_vehiculodeapoyoaccidente_tipovehiculodeapoyo_id` FOREIGN KEY (`tipo_vehiculo_de_apoyo_id`) REFERENCES `tipo_vehiculo_apoyo` (`id`),
  CONSTRAINT `fk_vehiculodeapoyoaccidente_vehiculodeapoyoenaccidente_id` FOREIGN KEY (`vehiculo_de_apoyo_en_accidente_id`) REFERENCES `accidente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo_de_apoyo_accidente`
--

LOCK TABLES `vehiculo_de_apoyo_accidente` WRITE;
/*!40000 ALTER TABLE `vehiculo_de_apoyo_accidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo_de_apoyo_accidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo_de_apoyo_incidente`
--

DROP TABLE IF EXISTS `vehiculo_de_apoyo_incidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculo_de_apoyo_incidente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_solicitud_servicio` timestamp NULL,
  `fecha_inicio_servicio` timestamp NULL,
  `fecha_fin_servicio` timestamp NULL,
  `comentario` varchar(50) DEFAULT NULL,
  `tipo_vehiculo_de_apoyo_id` bigint(20) DEFAULT NULL,
  `vehiculo_de_apoyo_en_incidente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehiculodeapoyoincidente_tipovehiculodeapoyo_id` (`tipo_vehiculo_de_apoyo_id`),
  KEY `fk_vehiculodeapoyoincidente_vehiculodeapoyoenincidente_id` (`vehiculo_de_apoyo_en_incidente_id`),
  CONSTRAINT `fk_vehiculodeapoyoincidente_tipovehiculodeapoyo_id` FOREIGN KEY (`tipo_vehiculo_de_apoyo_id`) REFERENCES `tipo_vehiculo_apoyo` (`id`),
  CONSTRAINT `fk_vehiculodeapoyoincidente_vehiculodeapoyoenincidente_id` FOREIGN KEY (`vehiculo_de_apoyo_en_incidente_id`) REFERENCES `incidente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo_de_apoyo_incidente`
--

LOCK TABLES `vehiculo_de_apoyo_incidente` WRITE;
/*!40000 ALTER TABLE `vehiculo_de_apoyo_incidente` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo_de_apoyo_incidente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-09 18:59:11
