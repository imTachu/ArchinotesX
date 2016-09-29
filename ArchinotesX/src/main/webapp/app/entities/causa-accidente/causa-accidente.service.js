(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('CausaAccidente', CausaAccidente);

    CausaAccidente.$inject = ['$resource'];

    function CausaAccidente ($resource) {
        var resourceUrl =  'api/causa-accidentes/:id';

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
