(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('CausaIncidente', CausaIncidente);

    CausaIncidente.$inject = ['$resource'];

    function CausaIncidente ($resource) {
        var resourceUrl =  'api/causa-incidentes/:id';

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
