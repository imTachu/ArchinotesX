(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('TipoVehiculoAfectado', TipoVehiculoAfectado);

    TipoVehiculoAfectado.$inject = ['$resource'];

    function TipoVehiculoAfectado ($resource) {
        var resourceUrl =  'api/tipo-vehiculo-afectados/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
