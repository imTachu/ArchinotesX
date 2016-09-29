(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EstadoBaches', EstadoBaches);

    EstadoBaches.$inject = ['$resource'];

    function EstadoBaches ($resource) {
        var resourceUrl =  'api/estado-baches/:id';

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
                url:'api/estado-baches/finalize'
            }
        });
    }
})();
