(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('ReportRequestBaseFactory', ReportRequestBaseFactory);

    ReportRequestBaseFactory.$inject = ['$q'];

    function ReportRequestBaseFactory($q) {

        function getCreator() {
            function ReporteRequestModel(Service) {
                this.reportData = {};
                this.criteriosAceptacionPromise = null;
                this.service = Service;
                this.name = Math.ceil(Math.random() * 1000);
            }

            ReporteRequestModel.prototype.setService = function(Service) {
                this.service = Service;
            };

            ReporteRequestModel.prototype.getCriteriosAceptacion = function(callback) {
                var that = this;
                if (!this.criteriosAceptacionPromise) {
                    this.criteriosAceptacionPromise = $q(function(resolve, reject) {
                        that.service.getCriteriosAceptacion({},
                            function(result, headers) {
                                var criteriosData = {
                                    criteriosAceptacion: result.toJSON(),
                                    maximoEventosIncumplimiento: result.maximoEventosIncumplimiento
                                };
                                angular.extend(that.reportData, criteriosData);
                                if (angular.isFunction(callback))
                                    callback(that.reportData, headers, that);
                                resolve(that.reportData, that);
                            }, function(e){
                                reject(e);
                            });
                    });
                }
                return this.criteriosAceptacionPromise;
            };

            ReporteRequestModel.prototype.query = function(requestData, callback) {
                var that = this;
                return $q(function(resolve, reject) {
                    that.getCriteriosAceptacion().then(function() {
                        that.service.query(requestData, function(result, headers) {
                            angular.extend(that.reportData, result.toJSON());
                            that.reportData.porcentajeCumplimiento = that.calculateIncumplimiento(that.reportData);
                            that.reportData.ponderado = that.calculatePonderado();
                            if (angular.isFunction(callback))
                                callback(that.reportData, headers, that);
                            resolve(that.reportData, headers, that);
                        },function(e){
                            reject(e);
                        });
                    },function(e){
                        reject(e);
                    });
                });
            };

            ReporteRequestModel.prototype.queryFiltro = function(requestData, callback) {
                var that = this;
                return $q(function(resolve, reject) {
                    that.getCriteriosAceptacion().then(function() {
                        that.service.queryFiltro(requestData, function(result, headers) {
                            angular.extend(that.reportData, result.toJSON());
                            that.reportData.porcentajeCumplimiento = that.calculateIncumplimiento(that.reportData);
                            that.reportData.ponderado = that.calculatePonderado();
                            if (angular.isFunction(callback))
                                callback(that.reportData, headers, that);
                            resolve(that.reportData, headers, that);
                        },function(e){
                            reject(e);
                        });
                    },function(e){
                        reject(e);
                    });
                });
            };

            ReporteRequestModel.prototype.calculateIncumplimiento = function(reportData) {
                var porcentajeCumplimiento = 0;
                return porcentajeCumplimiento;
            };

            ReporteRequestModel.prototype.getIncumplimiento = function() {
                return this.reportData.porcentajeCumplimiento;
            };

            ReporteRequestModel.prototype.getIncumplimientoFormateado = function() {
                return Math.round(this.getIncumplimiento());
            };

            ReporteRequestModel.prototype.getIndicadorCodigo = function() {
                var codigo = '';
                if (this.reportData && this.reportData.criteriosAceptacion && this.reportData.criteriosAceptacion.nombreBucket)
                    codigo = this.reportData.criteriosAceptacion.nombreBucket;
                return codigo;
            };

            ReporteRequestModel.prototype.getIndicadorNombre = function() {
                var codigo = '';
                if (this.reportData && this.reportData.criteriosAceptacion && this.reportData.criteriosAceptacion.nombreIndicador)
                    codigo = this.reportData.criteriosAceptacion.nombreIndicador;
                return codigo;
            };

            ReporteRequestModel.prototype.getPonderadoContrato = function() {
                var ponderado = 0;
                if (this.reportData && this.reportData.criteriosAceptacion && this.reportData.criteriosAceptacion.ponderadoContrato)
                    ponderado = this.reportData.criteriosAceptacion.ponderadoContrato;
                return ponderado;
            };

            ReporteRequestModel.prototype.calculatePonderado = function() {
                var porcentajeCumplimiento = this.getIncumplimiento();
                var ponderadoContrato = this.getPonderadoContrato();
                var ponderado = 0;
                if (!isNaN(porcentajeCumplimiento)) {
                    ponderado = porcentajeCumplimiento / 100 * parseFloat(ponderadoContrato);
                }
                return ponderado;
            };

            ReporteRequestModel.prototype.getPonderadoIndicador = function() {
                var ponderado = 0;
                if (this.reportData && this.reportData.ponderado)
                    ponderado = this.reportData.ponderado;
                return ponderado;
            };



            return ReporteRequestModel;
        }
        return {
            getCreator: getCreator
        };
    }
})();
