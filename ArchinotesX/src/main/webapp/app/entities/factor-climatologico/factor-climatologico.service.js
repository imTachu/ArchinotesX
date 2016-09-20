(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('FactorClimatologico', FactorClimatologico);

    FactorClimatologico.$inject = ['$resource'];

    function FactorClimatologico ($resource) {
        var resourceUrl =  'api/factor-climatologicos/:id';

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
