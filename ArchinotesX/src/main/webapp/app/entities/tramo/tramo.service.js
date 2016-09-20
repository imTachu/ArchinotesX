(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('Tramo', Tramo);

    Tramo.$inject = ['$resource'];

    function Tramo($resource) {
        var resourceUrl = 'api/tramos/:id';

        return $resource(resourceUrl, {}, {
            'query': {
                method: 'GET',
                isArray: true
            },
            'getAllUnidadesFuncionales': {
                url: 'api/unidadesfuncionales',
                method: 'GET',
                isArray: true
            },
            'get': {
                method: 'GET',
                transformResponse: function(data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': {
                method: 'PUT'
            }
        });
    }
})();
