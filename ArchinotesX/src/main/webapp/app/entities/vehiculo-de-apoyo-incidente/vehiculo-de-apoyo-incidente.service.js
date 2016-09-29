(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('VehiculoDeApoyoIncidente', VehiculoDeApoyoIncidente);

    VehiculoDeApoyoIncidente.$inject = ['$resource', 'DateUtils'];

    function VehiculoDeApoyoIncidente ($resource, DateUtils) {
        var resourceUrl =  'api/vehiculo-de-apoyo-incidentes/:id';

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
