(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('EstadoDrenajes', EstadoDrenajes);

    EstadoDrenajes.$inject = ['$resource'];

    function EstadoDrenajes ($resource) {
        var resourceUrl =  'api/estado-drenajes/:id';

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
                url:'api/estado-drenajes/finalize'
            }
        });
    }
})();
