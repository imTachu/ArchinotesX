(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('TipoNovedadAccidente', TipoNovedadAccidente);

    TipoNovedadAccidente.$inject = ['$resource'];

    function TipoNovedadAccidente ($resource) {
        var resourceUrl =  'api/tipo-novedad-accidentes/:id';

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
