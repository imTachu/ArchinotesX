(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('IndiceMortalidadDetalle', IndiceMortalidadDetalle);

    IndiceMortalidadDetalle.$inject = ['$resource'];

    function IndiceMortalidadDetalle ($resource) {
        var resourceUrl =  'api/indice-mortalidad-detalles/:id';

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
