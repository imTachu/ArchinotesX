(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('PersonaAfectadaEnAccidente', PersonaAfectadaEnAccidente);

    PersonaAfectadaEnAccidente.$inject = ['$resource', 'DateUtils'];

    function PersonaAfectadaEnAccidente ($resource, DateUtils) {
        var resourceUrl =  'api/persona-afectada-en-accidentes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaInicioTraslado = DateUtils.convertDateTimeFromServer(data.fechaInicioTraslado);
                    data.fechaFinTraslado = DateUtils.convertDateTimeFromServer(data.fechaFinTraslado);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
