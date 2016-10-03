(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('DataMicroservice', DataMicroservice);

    DataMicroservice.$inject = ['$resource', 'DateUtils'];

    function DataMicroservice ($resource, DateUtils) {
        var resourceUrl =  'api/datamicroservices/:id';

        return $resource(resourceUrl, {}, {
            'query': { 
                method: 'GET', 
                isArray: true
            },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'new': { 
                method:'POST'
            },
            'delete': {
                method: 'DELETE'
            }
        });
    }
})();
