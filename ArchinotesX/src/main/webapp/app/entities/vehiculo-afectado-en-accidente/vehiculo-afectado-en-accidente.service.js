(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('VehiculoAfectadoEnAccidente', VehiculoAfectadoEnAccidente);

    VehiculoAfectadoEnAccidente.$inject = ['$resource'];

    function VehiculoAfectadoEnAccidente ($resource) {
        var resourceUrl =  'api/vehiculo-afectado-en-accidentes/:id';

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
