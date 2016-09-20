(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('Peaje', Peaje);

    Peaje.$inject = ['$resource'];

    function Peaje ($resource) {
        var resourceUrl =  'api/peajes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
