(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('EstadoMargenesSeparador', EstadoMargenesSeparador);

    EstadoMargenesSeparador.$inject = ['$resource'];

    function EstadoMargenesSeparador ($resource) {
        var resourceUrl =  'api/estado-margenes-separadors/:id';

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
                url:'api/estado-margenes-separadors/finalize'
            }
        });
    }
})();
