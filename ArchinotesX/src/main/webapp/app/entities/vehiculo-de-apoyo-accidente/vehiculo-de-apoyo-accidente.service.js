(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('VehiculoDeApoyoAccidente', VehiculoDeApoyoAccidente);

    VehiculoDeApoyoAccidente.$inject = ['$resource', 'DateUtils'];

    function VehiculoDeApoyoAccidente ($resource, DateUtils) {
        var resourceUrl =  'api/vehiculo-de-apoyo-accidentes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaSolicitudServicio = DateUtils.convertDateTimeFromServer(data.fechaSolicitudServicio);
                    data.fechaInicioServicio = DateUtils.convertDateTimeFromServer(data.fechaInicioServicio);
                    data.fechaFinServicio = DateUtils.convertDateTimeFromServer(data.fechaFinServicio);
                    return data;
                }
            },
            'update': { 
                method:'PUT',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaSolicitudServicio = DateUtils.convertDateTimeFromServer(data.fechaSolicitudServicio);
                    data.fechaInicioServicio = DateUtils.convertDateTimeFromServer(data.fechaInicioServicio);
                    data.fechaFinServicio = DateUtils.convertDateTimeFromServer(data.fechaFinServicio);
                    return data;
                } 
            }
        });
    }
})();
