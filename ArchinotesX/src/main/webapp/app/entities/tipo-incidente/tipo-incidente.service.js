(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('TipoIncidente', TipoIncidente);

    TipoIncidente.$inject = ['$resource'];

    function TipoIncidente ($resource) {
        var resourceUrl =  'api/tipo-incidentes/:id';

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
