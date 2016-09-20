(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('EstadoDesportillamiento', EstadoDesportillamiento);

    EstadoDesportillamiento.$inject = ['$resource'];

    function EstadoDesportillamiento ($resource) {
        var resourceUrl =  'api/estado-desportillamientos/:id';

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
                url:'api/estado-desportillamientos/finalize'
            }
        });
    }
})();
