(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('CentroMedico', CentroMedico);

    CentroMedico.$inject = ['$resource'];

    function CentroMedico ($resource) {
        var resourceUrl =  'api/centro-medicos/:id';

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
