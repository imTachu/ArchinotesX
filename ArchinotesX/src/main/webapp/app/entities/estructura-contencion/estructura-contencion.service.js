(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EstructuraContencion', EstructuraContencion);

    EstructuraContencion.$inject = ['$resource'];

    function EstructuraContencion ($resource) {
        var resourceUrl =  'api/estructura-contencions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true, cache:true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'queryAll': { url:'api/estructura-contencions-all', method: 'GET', isArray: true}
        });
    }
})();
