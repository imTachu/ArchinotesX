package com.proycomp.sicc.config;

import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import lombok.Getter;
import lombok.Setter;

/**
 * Propiedades específicas a SICC
 *
 * @author Lorena Salamanca
 *
 * <p>
 * Properties are configured in the application.yml file.
 * </p>
 */
@ConfigurationProperties(prefix = "sicc", ignoreUnknownFields = false)
public class SiccProperties {

    private final CriteriosAceptacion criteriosAceptacion = new CriteriosAceptacion();
    private String unidadFuncionalDefault = "UF0";
    private String ubicacionBucketGlobal = "http://s3.amazonaws.com/";
    private String endpointCloudWatch = "http://monitoring.us-east-1.amazonaws.com/";
    private String bucketGlobalAmazonS3;
    private String prefijoNombreArchivo = "_";
    private String autoScalingGroupName = "ASG_NAME";
    private String awsAccessKey = "AWS_ACCESS_KEY_ID";
    private String awsSecretKey = "AWS_SECRET_ACCESS_KEY";

    public String getPrefijoNombreArchivo() {
        return prefijoNombreArchivo;
    }
    
    public void setPrefijoNombreArchivo(String prefijoNombreArchivo) {
        this.prefijoNombreArchivo = prefijoNombreArchivo;
    }

    public String getBucketGlobalAmazonS3() {
        return bucketGlobalAmazonS3;
    }

    public void setBucketGlobalAmazonS3(String bucketGlobalAmazonS3) {
        this.bucketGlobalAmazonS3 = bucketGlobalAmazonS3;
    }
    
    public String getUbicacionBucketGlobal() {
        return ubicacionBucketGlobal;
    }

    public void setUbicacionBucketGlobal(String ubicacionBucketGlobal) {
        this.ubicacionBucketGlobal = ubicacionBucketGlobal;
    }
    public CriteriosAceptacion getCriteriosAceptacion() {
        return criteriosAceptacion;
    }

    public String getUnidadFuncionalDefault() {
        return unidadFuncionalDefault;
    }

    public void setUnidadFuncionalDefault(String unidadFuncionalDefault) {
        this.unidadFuncionalDefault = unidadFuncionalDefault;
    }

    public String getEndpointCloudWatch() {
        return endpointCloudWatch;
    }

    public void setEndpointCloudWatch(String endpointCloudWatch) {
        this.endpointCloudWatch = endpointCloudWatch;
    }

    public String getAutoScalingGroupName() {
        return autoScalingGroupName;
    }

    public void setAutoScalingGroupName(String autoScalingGroupName) {
        this.autoScalingGroupName = autoScalingGroupName;
    }

    public String getAwsAccessKey() {
        return awsAccessKey;
    }

    public void setAwsAccessKey(String awsAccessKey) {
        this.awsAccessKey = awsAccessKey;
    }

    public String getAwsSecretKey() {
        return awsSecretKey;
    }

    public void setAwsSecretKey(String awsSecretKey) {
        this.awsSecretKey = awsSecretKey;
    }

    public static class CriteriosAceptacion {

        private final O1 o1 = new O1();
        private final O2 o2 = new O2();
        private final O3 o3 = new O3();
        private final O4 o4 = new O4();
        private final O5 o5 = new O5();
        private final O6 o6 = new O6();
        private final E6 e6 = new E6();
        private final E8 e8 = new E8();
        private final E10 e10 = new E10();
        private final E11 e11 = new E11();
        private final E12 e12 = new E12();
        private final E13 e13 = new E13();
        private final E24 e24 = new E24();

        public O1 getO1() {
            return o1;
        }

        public O2 getO2() {
            return o2;
        }
        
        public O3 getO3() {
            return o3;
        }
        
        public O4 getO4() {
            return o4;
        }

        public O5 getO5() {
            return o5;
        }
        
        public O6 getO6() {
            return o6;
        }

        public E6 getE6() {
            return e6;
        }

        public E8 getE8() {
            return e8;
        }

        public E10 getE10() {
            return e10;
        }

        public E11 getE11() {
            return e11;
        }

        public E12 getE12() {
            return e12;
        }

        public E13 getE13() {
            return e13;
        }

        public E24 getE24() {
            return e24;
        }

        public static class O1 {

            private double maximoIndiceMortalidad = 0.12;
            private double longitudConcesion = 198.35;
            private String nombreBucket = "O1";    
            private Double ponderadoContrato = 0.01;
            private String nombreIndicador = "Índice de mortalidad.";

            public String getNombreIndicador() {
                return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) {
                this.nombreIndicador = nombreIndicador;
            }
             
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public double getMaximoIndiceMortalidad() {
                return maximoIndiceMortalidad;
            }

            public void setMaximoIndiceMortalidad(double maximoIndiceMortalidad) {
                this.maximoIndiceMortalidad = maximoIndiceMortalidad;
            }

            public double getLongitudConcesion() {
                return longitudConcesion;
            }

            public void setLongitudConcesion(double longitudConcesion) {
                this.longitudConcesion = longitudConcesion;
            }
            
            
        }

        public static class O2 {

            private Integer maximoLongitudRetencion = 300;
            private String nombreBucket = "O2";    
            private Double ponderadoContrato = 0.0895;
            private String nombreIndicador = "Ocupación de carriles.";

            public String getNombreIndicador() {
                return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) {
                this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }

            public Integer getMaximoLongitudRetencion() {
                return maximoLongitudRetencion;
            }

            public void setMaximoLongitudRetencion(Integer maximoLongitudRetencion) {
                this.maximoLongitudRetencion = maximoLongitudRetencion;
            }
        }
        
        public static class O3 {

            private Integer tamañoIntervalo= 10;
            private Integer cantidadMaximaVehiculos= 10;
            private Integer denominadorDeCantidadPeajes= 2;
            private Integer tiempoMaximoCola = 60;
            private String nombreBucket = "O3";    
            private Double ponderadoContrato = 0.1050;
            private String nombreIndicador = "Cola de peaje.";

            public String getNombreIndicador() {
                return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) {
                this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public Integer getTamañoIntervalo() {
                return tamañoIntervalo;
            }

            public void setTamañoIntervalo(Integer tamañoIntervalo) {
                this.tamañoIntervalo = tamañoIntervalo;
            }

            public Integer getCantidadMaximaVehiculos() {
                return cantidadMaximaVehiculos;
            }

            public void setCantidadMaximaVehiculos(Integer cantidadMaximaVehiculos) {
                this.cantidadMaximaVehiculos = cantidadMaximaVehiculos;
            }

            public Integer getDenominadorDeCantidadPeajes() {
                return denominadorDeCantidadPeajes;
            }

            public void setDenominadorDeCantidadPeajes(Integer denominadorDeCantidadPeajes) {
                this.denominadorDeCantidadPeajes = denominadorDeCantidadPeajes;
            }
            
            public Integer getTiempoMaximoCola() {
                return tiempoMaximoCola;
            }

            public void setTiempoMaximoCola(Integer tiempoMaximoCola) {
                this.tiempoMaximoCola = tiempoMaximoCola;
            }
            
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }            
        }
        
        public static class O4 {

            private int maximoEventosIncumplimiento = 3;
            private int tiempoSenalizacion = 60;
            private final TiempoDespeje tiempoDespeje = new TiempoDespeje();
            private String nombreBucket = "O4";
            private Double ponderadoContrato = 0.1050;
            private String nombreIndicador = "Tiempo de atención de incidentes.";

            public String getNombreIndicador() {
                return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) {
                this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public int getMaximoEventosIncumplimiento() {
                return maximoEventosIncumplimiento;
            }

            public int getTiempoSenalizacion() {
                return tiempoSenalizacion;
            }

            public TiempoDespeje getTiempoDespeje() {
                return tiempoDespeje;
            }

            public void setMaximoEventosIncumplimiento(int maximoEventosIncumplimiento) {
                this.maximoEventosIncumplimiento = maximoEventosIncumplimiento;
            }

            public void setTiempoSenalizacion(int tiempoSenalizacion) {
                this.tiempoSenalizacion = tiempoSenalizacion;
            }

            public static class TiempoDespeje {

                private int calzadaMenos200 = 240;
                private int calzadaEntre200y2000 = 1440;
                private int bermaMenos200 = 1440;
                private int bermaEntre200y2000 = 1440;
                private int nuevosDispositivosMayor2000 = 10080;
                private int mayorDificultadMayor2000 = 43200;

                public int getCalzadaMenos200() {
                    return calzadaMenos200;
                }

                public int getCalzadaEntre200y2000() {
                    return calzadaEntre200y2000;
                }

                public int getBermaMenos200() {
                    return bermaMenos200;
                }

                public int getBermaEntre200y2000() {
                    return bermaEntre200y2000;
                }

                public int getNuevosDispositivosMayor2000() {
                    return nuevosDispositivosMayor2000;
                }

                public int getMayorDificultadMayor2000() {
                    return mayorDificultadMayor2000;
                }

                public void setCalzadaMenos200(int calzadaMenos200) {
                    this.calzadaMenos200 = calzadaMenos200;
                }

                public void setCalzadaEntre200y2000(int calzadaEntre200y2000) {
                    this.calzadaEntre200y2000 = calzadaEntre200y2000;
                }

                public void setBermaMenos200(int bermaMenos200) {
                    this.bermaMenos200 = bermaMenos200;
                }

                public void setBermaEntre200y2000(int bermaEntre200y2000) {
                    this.bermaEntre200y2000 = bermaEntre200y2000;
                }

                public void setNuevosDispositivosMayor2000(int nuevosDispositivosMayor2000) {
                    this.nuevosDispositivosMayor2000 = nuevosDispositivosMayor2000;
                }

                public void setMayorDificultadMayor2000(int mayorDificultadMayor2000) {
                    this.mayorDificultadMayor2000 = mayorDificultadMayor2000;
                }
            }
        }

        public static class O5 {

            private int maximoEventosIncumplimiento = 3;
            private final TiempoSenalizacion tiempoSenalizacion = new TiempoSenalizacion();
            private String nombreBucket = "O5";
            private Double ponderadoContrato = 0.0550;
            private String nombreIndicador = "Tiempo de atención de accidentes y emergencias.";

            public String getNombreIndicador() {
                return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) {
                this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public int getMaximoEventosIncumplimiento() {
                return maximoEventosIncumplimiento;
            }

            public void setMaximoEventosIncumplimiento(int maximoEventosIncumplimiento) {
                this.maximoEventosIncumplimiento = maximoEventosIncumplimiento;
            }

            public TiempoSenalizacion getTiempoSenalizacion() {
                return tiempoSenalizacion;
            }

            public static class TiempoSenalizacion {

                private int senalizacion = 30;
                private int ambulancia = 30;
                private int grua = 60;
                
                public int getSenalizacion() {
                    return senalizacion;
                }

                public void setSenalizacion(int senalizacion) {
                    this.senalizacion = senalizacion;
                }

                public int getAmbulancia() {
                    return ambulancia;
                }

                public void setAmbulancia(int ambulancia) {
                    this.ambulancia = ambulancia;
                }

                public int getGrua() {
                    return grua;
                }

                public void setGrua(int grua) {
                    this.grua = grua;
                }
            }
        }

        public static class O6 {

            private Double ponderadoContrato = 0.0525;
            private String nombreIndicador = "Disponibilidad del SICC.";
            private String nombreBucket = "O6";
           
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public String getNombreIndicador() 
            {
                    return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) 
            {
                    this.nombreIndicador = nombreIndicador;
            }
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
      
        }
        
        public static class E6 {

            private double maximoProfundidad = 0.25;
            private double maximoSuperficie = 0.05;
            private int maximoKilometrosIncumplimiento = 0;
            private long tiempoAtencion = 1;
            private String nombreBucket = "E6";
            private Double ponderadoContrato = 0.04025;
            private String nombreIndicador = "Baches.";

            public String getNombreIndicador() 
            {
                    return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) 
            {
                    this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public long getTiempoAtencion() {
                return tiempoAtencion;
            }

            public void setTiempoAtencion(long tiempoAtencion) {
                this.tiempoAtencion = tiempoAtencion;
            }
            
            public int getMaximoKilometrosIncumplimiento() {
                return maximoKilometrosIncumplimiento;
            }

            public void setMaximoKilometrosIncumplimiento(int maximoKilometrosIncumplimiento) {
                this.maximoKilometrosIncumplimiento = maximoKilometrosIncumplimiento;
            }

            public double getMaximoProfundidad() {
                return maximoProfundidad;
            }

            public void setMaximoProfundidad(double maximoProfundidad) {
                this.maximoProfundidad = maximoProfundidad;
            }

            public double getMaximoSuperficie() {
                return maximoSuperficie;
            }

            public void setMaximoSuperficie(double maximoSuperficie) {
                this.maximoSuperficie = maximoSuperficie;
            }

        }

        public static class E8 {

            private double alturaVegetacion = 0.3;
            private int maximaCantidadArticulosBasura = 25;
            private int maximoKilometrosIncumplimiento = 1;
            private long tiempoAtencion = 7;
            private String nombreBucket = "E8";
            private Double ponderadoContrato = 0.1510;
            private String nombreIndicador = "Estado de márgenes, separador central. Área de servicio y corredor del proyecto";

            public String getNombreIndicador() 
            {
                    return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) 
            {
                    this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public long getTiempoAtencion() {
                return tiempoAtencion;
            }

            public void setTiempoAtencion(long tiempoAtencion) {
                this.tiempoAtencion = tiempoAtencion;
            }
            
            public int getMaximoKilometrosIncumplimiento() {
                return maximoKilometrosIncumplimiento;
            }

            public void setMaximoKilometrosIncumplimiento(int maximoKilometrosIncumplimiento) {
                this.maximoKilometrosIncumplimiento = maximoKilometrosIncumplimiento;
            }

            public double getAlturaVegetacion() {
                return alturaVegetacion;
            }

            public void setAlturaVegetacion(double alturaVegetacion) {
                this.alturaVegetacion = alturaVegetacion;
            }
            
            public int getMaximaCantidadArticulosBasura() {
                return maximaCantidadArticulosBasura;
            }

            public void setMaximaCantidadArticulosBasura(int maximaCantidadArticulosBasura) {
                this.maximaCantidadArticulosBasura = maximaCantidadArticulosBasura;
            }
        }

        public static class E10 {

            private double seccionObstruida = 25;
            private int maximoKilometrosIncumplimiento = 1;
            private long tiempoAtencion = 7;
            private String nombreBucket = "E10";
            private Double ponderadoContrato = 0.12;
            private String nombreIndicador = "Drenajes superficiales, longitudinal y trasversal.";

            public String getNombreIndicador() 
            {
                    return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) 
            {
                    this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public long getTiempoAtencion() {
                return tiempoAtencion;
            }

            public void setTiempoAtencion(long tiempoAtencion) {
                this.tiempoAtencion = tiempoAtencion;
            }
            
            public int getMaximoKilometrosIncumplimiento() {
                return maximoKilometrosIncumplimiento;
            }

            public void setMaximoKilometrosIncumplimiento(int maximoKilometrosIncumplimiento) {
                this.maximoKilometrosIncumplimiento = maximoKilometrosIncumplimiento;
            }

            public double getSeccionObstruida() {
                return seccionObstruida;
            }

            public void setSeccionObstruida(double seccionObstruida) {
                this.seccionObstruida = seccionObstruida;
            }
        }

        public static class E11 {

            private double retroflectividad = 80;
            private double porcentajeDeInstalacion = 0.80;
            private int maximoKilometrosIncumplimiento = 2;
            private long tiempoAtencionPorIlegibilidad = 2;
            private long tiempoAtencionPorReflectividad = 7;
            private String nombreBucket = "E11";
            private Double ponderadoContrato = 0.0805;
            private String nombreIndicador = "Señalización vertical.";
            private final AngulosMedicionNivelesCombo angulosMedicionNivelesCombo = new AngulosMedicionNivelesCombo();
            private final NivelesMinimosRetroreflexionMicroprismas nivelesMinimosRetroreflexionMicroprismas = new NivelesMinimosRetroreflexionMicroprismas();
            
            public AngulosMedicionNivelesCombo getAngulosMedicionNivelesCombo() {
                return angulosMedicionNivelesCombo;
            }

            public NivelesMinimosRetroreflexionMicroprismas getNivelesMinimosRetroreflexionMicroprismas() {
                return nivelesMinimosRetroreflexionMicroprismas;
            }
            
            public String getNombreIndicador() 
            {
                    return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) 
            {
                    this.nombreIndicador = nombreIndicador;
            }
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public long getTiempoAtencionPorReflectividad() {
                return tiempoAtencionPorReflectividad;
            }

            public void setTiempoAtencionPorReflectividad(long tiempoAtencionPorReflectividad) {
                this.tiempoAtencionPorReflectividad = tiempoAtencionPorReflectividad;
            }

            public long getTiempoAtencionPorIlegibilidad() {
                return tiempoAtencionPorIlegibilidad;
            }

            public void setTiempoAtencionPorIlegibilidad(long tiempoAtencionPorIlegibilidad) {
                this.tiempoAtencionPorIlegibilidad = tiempoAtencionPorIlegibilidad;
            }
            
            public int getMaximoKilometrosIncumplimiento() {
                return maximoKilometrosIncumplimiento;
            }

            public void setMaximoKilometrosIncumplimiento(int maximoKilometrosIncumplimiento) {
                this.maximoKilometrosIncumplimiento = maximoKilometrosIncumplimiento;
            }

            public double getRetroflectividad() {
                return retroflectividad;
            }

            public void setRetroflectividad(double retroflectividad) {
                this.retroflectividad = retroflectividad;
            }
            
            public double getPorcentajeDeInstalacion() {
                return porcentajeDeInstalacion;
            }

            public void setPorcentajeDeInstalacion(double porcentajeDeInstalacion) {
                this.porcentajeDeInstalacion = porcentajeDeInstalacion;
            }
            @Getter
            @Setter
            public static class AngulosMedicionNivelesCombo  {
                private String anguloPunto1EntradaMenos4=  "0.1 | -4";           
                private String anguloPunto1EntradaMas30=  "0.1 | +30";      
                private String anguloPunto2EntradaMenos4=  "0.2 | -4";
                private String anguloPunto2EntradaMas30 =  "0.2 | +30";
                private String anguloPunto5EntradaMenos4 =  "0.5 | -4";
                private String anguloPunto5EntradaMas30 = "0.5 | +30";
                
                public List<String> getAngulosMedicionNivelesArreglo() {
                    List<String> angulosMedicion;
                    angulosMedicion = new ArrayList();
                    angulosMedicion.add(anguloPunto1EntradaMenos4);
                    angulosMedicion.add(anguloPunto1EntradaMas30);
                    angulosMedicion.add(anguloPunto2EntradaMenos4);
                    angulosMedicion.add(anguloPunto2EntradaMas30);
                    angulosMedicion.add(anguloPunto5EntradaMenos4);
                    angulosMedicion.add(anguloPunto5EntradaMas30);
                    return angulosMedicion;
                }
            }
            
            @Getter
            @Setter
            public static class NivelesMinimosRetroreflexionMicroprismas {

                private Double anguloPunto1EntradaMenos4Blanco= 500d;
                private Double anguloPunto1EntradaMenos4Amarillo= 380d;
                private Double anguloPunto1EntradaMenos4Naranja= 200d;
                private Double anguloPunto1EntradaMenos4Verde= 70d;
                private Double anguloPunto1EntradaMenos4Rojo= 90d;
                private Double anguloPunto1EntradaMenos4Azul= 42d;
                private Double anguloPunto1EntradaMenos4Marron= 25d;
                private Double anguloPunto1EntradaMenos4AmarilloVerdeFluorescente= 400d;
                private Double anguloPunto1EntradaMenos4AmarilloFluorescente= 300d;
                private Double anguloPunto1EntradaMenos4NaranjaFluorescente= 150d;

                private Double anguloPunto1EntradaMas30Blanco= 240d;
                private Double anguloPunto1EntradaMas30Amarillo= 175d;
                private Double anguloPunto1EntradaMas30Naranja= 94d;
                private Double anguloPunto1EntradaMas30Verde= 32d;
                private Double anguloPunto1EntradaMas30Rojo= 42d;
                private Double anguloPunto1EntradaMas30Azul= 20d;
                private Double anguloPunto1EntradaMas30Marron= 12d;
                private Double anguloPunto1EntradaMas30AmarilloVerdeFluorescente= 185d;
                private Double anguloPunto1EntradaMas30AmarilloFluorescente= 140d;
                private Double anguloPunto1EntradaMas30NaranjaFluorescente= 70d;

                private Double anguloPunto2EntradaMenos4Blanco= 360d;
                private Double anguloPunto2EntradaMenos4Amarillo= 270d;
                private Double anguloPunto2EntradaMenos4Naranja= 145d;
                private Double anguloPunto2EntradaMenos4Verde= 50d;
                private Double anguloPunto2EntradaMenos4Rojo= 65d;
                private Double anguloPunto2EntradaMenos4Azul= 30d;
                private Double anguloPunto2EntradaMenos4Marron= 18d;
                private Double anguloPunto2EntradaMenos4AmarilloVerdeFluorescente= 290d;
                private Double anguloPunto2EntradaMenos4AmarilloFluorescente= 220d;
                private Double anguloPunto2EntradaMenos4NaranjaFluorescente= 105d;

                private Double anguloPunto2EntradaMas30Blanco= 170d;
                private Double anguloPunto2EntradaMas30Amarillo= 135d;
                private Double anguloPunto2EntradaMas30Naranja= 68d;
                private Double anguloPunto2EntradaMas30Verde= 25d;
                private Double anguloPunto2EntradaMas30Rojo= 30d;
                private Double anguloPunto2EntradaMas30Azul= 14d;
                private Double anguloPunto2EntradaMas30Marron= 8.5;
                private Double anguloPunto2EntradaMas30AmarilloVerdeFluorescente= 135d;
                private Double anguloPunto2EntradaMas30AmarilloFluorescente= 100d;
                private Double anguloPunto2EntradaMas30NaranjaFluorescente= 50d;

                private Double anguloPunto5EntradaMenos4Blanco= 150d;
                private Double anguloPunto5EntradaMenos4Amarillo= 110d;
                private Double anguloPunto5EntradaMenos4Naranja= 60d;
                private Double anguloPunto5EntradaMenos4Verde= 21d;
                private Double anguloPunto5EntradaMenos4Rojo= 27d;
                private Double anguloPunto5EntradaMenos4Azul= 13d;
                private Double anguloPunto5EntradaMenos4Marron= 7.5;
                private Double anguloPunto5EntradaMenos4AmarilloVerdeFluorescente= 120d;
                private Double anguloPunto5EntradaMenos4AmarilloFluorescente= 90d;
                private Double anguloPunto5EntradaMenos4NaranjaFluorescente= 45d;

                private Double anguloPunto5EntradaMas30Blanco= 72d;
                private Double anguloPunto5EntradaMas30Amarillo= 54d;
                private Double anguloPunto5EntradaMas30Naranja= 28d;
                private Double anguloPunto5EntradaMas30Verde= 10d;
                private Double anguloPunto5EntradaMas30Rojo= 13d;
                private Double anguloPunto5EntradaMas30Azul= 6d;
                private Double anguloPunto5EntradaMas30Marron= 3.5;
                private Double anguloPunto5EntradaMas30AmarilloVerdeFluorescente= 55d;
                private Double anguloPunto5EntradaMas30AmarilloFluorescente= 40d;
                private Double anguloPunto5EntradaMas30NaranjaFluorescente= 22d;
 
                public List<List<Double>> getNivelesMinimosRetroreflexionArreglo() 
                {
                    List<List<Double>> nivelesRetroreflexion;
                    nivelesRetroreflexion = new ArrayList();
                    nivelesRetroreflexion.add(getNivelesRetroreflexionBlanco());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionAmarillo());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionNaranja());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionVerde());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionRojo());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionAzul());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionMarron());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionAmarilloVerdeFluorescente());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionAmarilloFluorescente());
                    nivelesRetroreflexion.add(getNivelesRetroreflexionNaranjaFluorescente());
                    return nivelesRetroreflexion;
                }
                
                public List<Double> getNivelesRetroreflexionBlanco()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4Blanco);
                    niveles.add(anguloPunto1EntradaMas30Blanco);
                    niveles.add(anguloPunto2EntradaMenos4Blanco);
                    niveles.add(anguloPunto2EntradaMas30Blanco);
                    niveles.add(anguloPunto5EntradaMenos4Blanco);
                    niveles.add(anguloPunto5EntradaMas30Blanco);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionAmarillo()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4Amarillo);
                    niveles.add(anguloPunto1EntradaMas30Amarillo);
                    niveles.add(anguloPunto2EntradaMenos4Amarillo);
                    niveles.add(anguloPunto2EntradaMas30Amarillo);
                    niveles.add(anguloPunto5EntradaMenos4Amarillo);
                    niveles.add(anguloPunto5EntradaMas30Amarillo);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionNaranja()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4Naranja);
                    niveles.add(anguloPunto1EntradaMas30Naranja);
                    niveles.add(anguloPunto2EntradaMenos4Naranja);
                    niveles.add(anguloPunto2EntradaMas30Naranja);
                    niveles.add(anguloPunto5EntradaMenos4Naranja);
                    niveles.add(anguloPunto5EntradaMas30Naranja);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionVerde()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4Verde);
                    niveles.add(anguloPunto1EntradaMas30Verde);
                    niveles.add(anguloPunto2EntradaMenos4Verde);
                    niveles.add(anguloPunto2EntradaMas30Verde);
                    niveles.add(anguloPunto5EntradaMenos4Verde);
                    niveles.add(anguloPunto5EntradaMas30Verde);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionRojo()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4Rojo);
                    niveles.add(anguloPunto1EntradaMas30Rojo);
                    niveles.add(anguloPunto2EntradaMenos4Rojo);
                    niveles.add(anguloPunto2EntradaMas30Rojo);
                    niveles.add(anguloPunto5EntradaMenos4Rojo);
                    niveles.add(anguloPunto5EntradaMas30Rojo);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionAzul()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4Azul);
                    niveles.add(anguloPunto1EntradaMas30Azul);
                    niveles.add(anguloPunto2EntradaMenos4Azul);
                    niveles.add(anguloPunto2EntradaMas30Azul);
                    niveles.add(anguloPunto5EntradaMenos4Azul);
                    niveles.add(anguloPunto5EntradaMas30Azul);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionMarron()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4Marron);
                    niveles.add(anguloPunto1EntradaMas30Marron);
                    niveles.add(anguloPunto2EntradaMenos4Marron);
                    niveles.add(anguloPunto2EntradaMas30Marron);
                    niveles.add(anguloPunto5EntradaMenos4Marron);
                    niveles.add(anguloPunto5EntradaMas30Marron);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionAmarilloVerdeFluorescente()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4AmarilloVerdeFluorescente);
                    niveles.add(anguloPunto1EntradaMas30AmarilloVerdeFluorescente);
                    niveles.add(anguloPunto2EntradaMenos4AmarilloVerdeFluorescente);
                    niveles.add(anguloPunto2EntradaMas30AmarilloVerdeFluorescente);
                    niveles.add(anguloPunto5EntradaMenos4AmarilloVerdeFluorescente);
                    niveles.add(anguloPunto5EntradaMas30AmarilloVerdeFluorescente);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionAmarilloFluorescente()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4AmarilloFluorescente);
                    niveles.add(anguloPunto1EntradaMas30AmarilloFluorescente);
                    niveles.add(anguloPunto2EntradaMenos4AmarilloFluorescente);
                    niveles.add(anguloPunto2EntradaMas30AmarilloFluorescente);
                    niveles.add(anguloPunto5EntradaMenos4AmarilloFluorescente);
                    niveles.add(anguloPunto5EntradaMas30AmarilloFluorescente);
                    return niveles;
                }
                public List<Double> getNivelesRetroreflexionNaranjaFluorescente()
                {
                    List<Double> niveles;
                    niveles = new ArrayList<>();
                    niveles.add(anguloPunto1EntradaMenos4NaranjaFluorescente);
                    niveles.add(anguloPunto1EntradaMas30NaranjaFluorescente);
                    niveles.add(anguloPunto2EntradaMenos4NaranjaFluorescente);
                    niveles.add(anguloPunto2EntradaMas30NaranjaFluorescente);
                    niveles.add(anguloPunto5EntradaMenos4NaranjaFluorescente);
                    niveles.add(anguloPunto5EntradaMas30NaranjaFluorescente);
                    return niveles;
                }
            }
        }

        public static class E12 {

            private double maximaLongitudTramo = 20;
            private int maximoKilometrosIncumplimiento = 1;
            private int blancasCandelasMaximo = 160;
            private int blancasMetrosMaximo = 140;
            private int amarillasCandelasMaximo = 140;
            private int amarillasMetrosMaximo = 120;
            private int nota1 = 15;
            private int nota2 = 30;
            private long tiempoAtencion = 7;
            private String nombreBucket = "E12";
            private Double ponderadoContrato = 0.0805;
            private String nombreIndicador = "Señalización horizontal.";

            public String getNombreIndicador() 
            {
                    return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) 
            {
                    this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public long getTiempoAtencion() {
                return tiempoAtencion;
            }

            public void setTiempoAtencion(long tiempoAtencion) {
                this.tiempoAtencion = tiempoAtencion;
            }

            public int getMaximoKilometrosIncumplimiento() {
                return maximoKilometrosIncumplimiento;
            }

            public void setMaximoKilometrosIncumplimiento(int maximoKilometrosIncumplimiento) {
                this.maximoKilometrosIncumplimiento = maximoKilometrosIncumplimiento;
            }

            public double getMaximaLongitudTramo() {
                return maximaLongitudTramo;
            }

            public void setMaximaLongitudTramo(double maximaLongitudTramo) {
                this.maximaLongitudTramo = maximaLongitudTramo;
            }

            public int getBlancasCandelasMaximo() {
                return blancasCandelasMaximo;
            }

            public void setBlancasCandelasMaximo(int blancasCandelasMaximo) {
                this.blancasCandelasMaximo = blancasCandelasMaximo;
            }

            public int getBlancasMetrosMaximo() {
                return blancasMetrosMaximo;
            }

            public void setBlancasMetrosMaximo(int blancasMetrosMaximo) {
                this.blancasMetrosMaximo = blancasMetrosMaximo;
            }

            public int getAmarillasCandelasMaximo() {
                return amarillasCandelasMaximo;
            }

            public void setAmarillasCandelasMaximo(int amarillasCandelasMaximo) {
                this.amarillasCandelasMaximo = amarillasCandelasMaximo;
            }

            public int getAmarillasMetrosMaximo() {
                return amarillasMetrosMaximo;
            }

            public void setAmarillasMetrosMaximo(int amarillasMetrosMaximo) {
                this.amarillasMetrosMaximo = amarillasMetrosMaximo;
            }

            public int getNota1() {
                return nota1;
            }

            public void setNota1(int nota1) {
                this.nota1 = nota1;
            }

            public int getNota2() {
                return nota2;
            }

            public void setNota2(int nota2) {
                this.nota2 = nota2;
            }

        }
        
        public static class E13 {

            private double maximaLongitudTramo = 20;
            private int maximoKilometrosIncumplimiento = 2;
            private long tiempoAtencion = 1;
            private String nombreBucket = "E13";
            private Double ponderadoContrato = 0.0805;
            private String nombreIndicador = "Barreras y elementos de contención.";

            public String getNombreIndicador() 
            {
                    return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) 
            {
                    this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public long getTiempoAtencion() {
                return tiempoAtencion;
            }

            public void setTiempoAtencion(long tiempoAtencion) {
                this.tiempoAtencion = tiempoAtencion;
            }
            
            public int getMaximoKilometrosIncumplimiento() {
                return maximoKilometrosIncumplimiento;
            }

            public void setMaximoKilometrosIncumplimiento(int maximoKilometrosIncumplimiento) {
                this.maximoKilometrosIncumplimiento = maximoKilometrosIncumplimiento;
            }

            public double getMaximaLongitudTramo() {
                return maximaLongitudTramo;
            }

            public void setMaximaLongitudTramo(double maximaLongitudTramo) {
                this.maximaLongitudTramo = maximaLongitudTramo;
            }

        }
                
        public static class E24 {

            private double maximoDesportillamientosKilometro = 30;
            private int maximoKilometrosIncumplimiento = 99999999;
            private long tiempoAtencion = 14;
            private String nombreBucket = "E24";
            private Double ponderadoContrato = 0.04025;
            private String nombreIndicador = "Desportillamiento.";

            public String getNombreIndicador() 
            {
                    return nombreIndicador;
            }

            public void setNombreIndicador(String nombreIndicador) 
            {
                    this.nombreIndicador = nombreIndicador;
            }
            
            public Double getPonderadoContrato() {
                return ponderadoContrato;
            }

            public void setPonderadoContrato(Double ponderadoContrato) {
                this.ponderadoContrato = ponderadoContrato;
            }
            
            public String getNombreBucket() {
                return nombreBucket;
            }

            public void setNombreBucket(String nombreBucket) {
                this.nombreBucket = nombreBucket;
            }
            
            public long getTiempoAtencion() {
                return tiempoAtencion;
            }

            public void setTiempoAtencion(long tiempoAtencion) {
                this.tiempoAtencion = tiempoAtencion;
            }
            
            public int getMaximoKilometrosIncumplimiento() {
                return maximoKilometrosIncumplimiento;
            }

            public void setMaximoKilometrosIncumplimiento(int maximoKilometrosIncumplimiento) {
                this.maximoKilometrosIncumplimiento = maximoKilometrosIncumplimiento;
            }

            public double getMaximoDesportillamientosKilometro() {
                return maximoDesportillamientosKilometro;
            }

            public void setMaximoDesportillamientosKilometro(double maximoDesportillamientosKilometro) {
                this.maximoDesportillamientosKilometro = maximoDesportillamientosKilometro;
            }

        }
    }
}