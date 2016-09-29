(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EstadoBarreraContencion', EstadoBarreraContencion);

    EstadoBarreraContencion.$inject = ['$resource'];

    function EstadoBarreraContencion ($resource) {
        var resourceUrl =  'api/estado-barrera-contencions/:id';

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
            },
            'finalize':{
                method:'PUT',
                url:'api/estado-barrera-contencions/finalize'
            }
        });
    }
})();
