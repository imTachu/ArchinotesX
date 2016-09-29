(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('TipoAccidente', TipoAccidente);

    TipoAccidente.$inject = ['$resource'];

    function TipoAccidente ($resource) {
        var resourceUrl =  'api/tipo-accidentes/:id';

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
