(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('TipoAfectacionPersona', TipoAfectacionPersona);

    TipoAfectacionPersona.$inject = ['$resource'];

    function TipoAfectacionPersona ($resource) {
        var resourceUrl =  'api/tipo-afectacion-personas/:id';

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
