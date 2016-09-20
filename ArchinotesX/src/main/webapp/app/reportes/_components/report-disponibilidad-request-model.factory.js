(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('ReportDisponibilidadRequestModel', ReportDisponibilidadRequestModel);

    ReportDisponibilidadRequestModel.$inject = ['$q', 'ReportRequestBaseFactory'];

    function ReportDisponibilidadRequestModel($q, ReportRequestBaseFactory) {
        var ReporteModelCreator = ReportRequestBaseFactory.getCreator();
        ReporteModelCreator.prototype.calculateIncumplimiento = function(reportData) {
            return reportData.totalDisponibilidad;
        };

        ReporteModelCreator.prototype.getCriteriosAceptacion = function(callback) {
            var that = this;
            if (!this.criteriosAceptacionPromise) {
                this.criteriosAceptacionPromise = $q(function(resolve, reject) {
                    that.service.getCriteriosAceptacion().then(function(response, headers) {
                        var criteriosData = {
                            criteriosAceptacion: response
                        };
                        angular.extend(that.reportData, criteriosData);
                        if (angular.isFunction(callback))
                            callback(that.reportData, headers, that);
                        resolve(that.reportData, that);
                    });
                });
            }
            return this.criteriosAceptacionPromise;
        };

        ReporteModelCreator.prototype.query = function(requestData, callback) {
            var that = this;
            return $q(function(resolve, reject) {
                that.getCriteriosAceptacion().then(function() {

                    that.service.serverStatus('MES').then(function(response, headers) {
                        angular.extend(that.reportData, response);
                        that.reportData.porcentajeCumplimiento = that.calculateIncumplimiento(that.reportData);
                        that.reportData.ponderado = that.calculatePonderado();
                        if (angular.isFunction(callback))
                            callback(that.reportData, headers, that);
                        resolve(that.reportData, headers, that);
                    });
                });
            });
        };
        return ReporteModelCreator;
    }
})();
