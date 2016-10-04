(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('SQLDatasource', SQLDatasource);

    SQLDatasource.$inject = ['$resource', 'DateUtils'];

    function SQLDatasource ($resource, DateUtils) {
        var resourceUrl =  'api/sqldatasources/:id';

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
            'delete': {
                method: 'DELETE'
            }
        });
    }
})();
