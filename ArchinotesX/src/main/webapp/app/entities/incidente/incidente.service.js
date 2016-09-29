(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('Incidente', Incidente);

    Incidente.$inject = ['$resource', 'DateUtils'];

    function Incidente ($resource, DateUtils) {
        var resourceUrl =  'api/incidentes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaRecepcionLlamada = DateUtils.convertDateTimeFromServer(data.fechaRecepcionLlamada);
                    data.fechaInicioSenalizacion = DateUtils.convertDateTimeFromServer(data.fechaInicioSenalizacion);
                    data.fechaFinSenalizacion = DateUtils.convertDateTimeFromServer(data.fechaFinSenalizacion);
                    data.fechaInicioDespeje = DateUtils.convertDateTimeFromServer(data.fechaInicioDespeje);
                    data.fechaFinDespeje = DateUtils.convertDateTimeFromServer(data.fechaFinDespeje);
                    data.fechaInicioCierreVia = DateUtils.convertDateTimeFromServer(data.fechaInicioCierreVia);
                    data.fechaFinCierreVia = DateUtils.convertDateTimeFromServer(data.fechaFinCierreVia);
                    return data;
                }
            },
            'update': { 
                method:'PUT',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaRecepcionLlamada = DateUtils.convertDateTimeFromServer(data.fechaRecepcionLlamada);
                    data.fechaInicioSenalizacion = DateUtils.convertDateTimeFromServer(data.fechaInicioSenalizacion);
                    data.fechaFinSenalizacion = DateUtils.convertDateTimeFromServer(data.fechaFinSenalizacion);
                    data.fechaInicioDespeje = DateUtils.convertDateTimeFromServer(data.fechaInicioDespeje);
                    data.fechaFinDespeje = DateUtils.convertDateTimeFromServer(data.fechaFinDespeje);
                    data.fechaInicioCierreVia = DateUtils.convertDateTimeFromServer(data.fechaInicioCierreVia);
                    data.fechaFinCierreVia = DateUtils.convertDateTimeFromServer(data.fechaFinCierreVia);
                    return data;
                }
            },
            'finalize':{
                method:'PUT',
                url:'api/incidentes/finalize'
            }
        });
    }
})();
