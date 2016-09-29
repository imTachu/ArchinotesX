(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('SQLDatasource', SQLDatasource);

    SQLDatasource.$inject = ['$resource', 'DateUtils'];

    function SQLDatasource ($resource, DateUtils) {
        var resourceUrl =  'api/sqldatasources/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaRecepcionLlamada = DateUtils.convertDateTimeFromServer(data.fechaRecepcionLlamada);
                    data.fechaLlegadaSenalizacion = DateUtils.convertDateTimeFromServer(data.fechaLlegadaSenalizacion);
                    data.fechaLlegadaAmbulancia = DateUtils.convertDateTimeFromServer(data.fechaLlegadaAmbulancia);
                    data.fechaLlegadaVehiculoApoyo = DateUtils.convertDateTimeFromServer(data.fechaLlegadaVehiculoApoyo);
                    data.fechaLlegadaFinDespeje = DateUtils.convertDateTimeFromServer(data.fechaLlegadaFinDespeje);
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
                    data.fechaLlegadaSenalizacion = DateUtils.convertDateTimeFromServer(data.fechaLlegadaSenalizacion);
                    data.fechaLlegadaAmbulancia = DateUtils.convertDateTimeFromServer(data.fechaLlegadaAmbulancia);
                    data.fechaLlegadaVehiculoApoyo = DateUtils.convertDateTimeFromServer(data.fechaLlegadaVehiculoApoyo);
                    data.fechaLlegadaFinDespeje = DateUtils.convertDateTimeFromServer(data.fechaLlegadaFinDespeje);
                    data.fechaInicioCierreVia = DateUtils.convertDateTimeFromServer(data.fechaInicioCierreVia);
                    data.fechaFinCierreVia = DateUtils.convertDateTimeFromServer(data.fechaFinCierreVia);
                    return data;
                }
            },
            'finalize':{
                method:'PUT',
                url:'api/sqldatasources/finalize'
            }
        });
    }
})();
