(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EstadoSenalizacionV', EstadoSenalizacionV);

    EstadoSenalizacionV.$inject = ['$resource'];

    function EstadoSenalizacionV ($resource) {
        var resourceUrl =  'api/estado-senalizacion-vs/:id';

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
                url:'api/estado-senalizacion-vs/finalize'
            }
        });
    }
})();
