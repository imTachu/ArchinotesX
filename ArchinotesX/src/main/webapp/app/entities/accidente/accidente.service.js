(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('Accidente', Accidente);

    Accidente.$inject = ['$resource', 'DateUtils'];

    function Accidente ($resource, DateUtils) {
        var resourceUrl =  'api/accidentes/:id';

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
                url:'api/accidentes/finalize'
            }
        });
    }
})();
