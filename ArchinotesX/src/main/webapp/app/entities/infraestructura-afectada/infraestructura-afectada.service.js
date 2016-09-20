(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('InfraestructuraAfectada', InfraestructuraAfectada);

    InfraestructuraAfectada.$inject = ['$resource'];

    function InfraestructuraAfectada ($resource) {
        var resourceUrl =  'api/infraestructura-afectadas/:id';

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
