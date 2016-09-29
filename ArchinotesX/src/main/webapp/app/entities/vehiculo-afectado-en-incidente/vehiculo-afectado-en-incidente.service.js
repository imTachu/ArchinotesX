(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('VehiculoAfectadoEnIncidente', VehiculoAfectadoEnIncidente);

    VehiculoAfectadoEnIncidente.$inject = ['$resource'];

    function VehiculoAfectadoEnIncidente ($resource) {
        var resourceUrl =  'api/vehiculo-afectado-en-incidentes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { 
                method:'PUT',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                } 
            }
        });
    }
})();
