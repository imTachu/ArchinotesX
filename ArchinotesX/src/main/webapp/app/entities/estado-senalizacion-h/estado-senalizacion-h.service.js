(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EstadoSenalizacionH', EstadoSenalizacionH);

    EstadoSenalizacionH.$inject = ['$resource'];

    function EstadoSenalizacionH ($resource) {
        var resourceUrl =  'api/estado-senalizacion-hs/:id';

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
                url:'api/estado-senalizacion-hs/finalize'
            }
        });
    }
})();
