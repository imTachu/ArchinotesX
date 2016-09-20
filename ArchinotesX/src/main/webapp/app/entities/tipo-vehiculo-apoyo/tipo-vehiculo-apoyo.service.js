(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('TipoVehiculoApoyo', TipoVehiculoApoyo);

    TipoVehiculoApoyo.$inject = ['$resource'];

    function TipoVehiculoApoyo ($resource) {
        var resourceUrl =  'api/tipo-vehiculo-apoyos/:id';

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
