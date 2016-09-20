(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ArchivoInspeccionSenalizacionV', ArchivoInspeccionSenalizacionV);

    ArchivoInspeccionSenalizacionV.$inject = ['$resource', 'DateUtils'];

    function ArchivoInspeccionSenalizacionV ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-inspeccion-senalizacion-vs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaDeRegistro = DateUtils.convertDateTimeFromServer(data.fechaDeRegistro);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
