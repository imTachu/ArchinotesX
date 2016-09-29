(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('ArchivoInspeccionSenalizacionH', ArchivoInspeccionSenalizacionH);

    ArchivoInspeccionSenalizacionH.$inject = ['$resource', 'DateUtils'];

    function ArchivoInspeccionSenalizacionH ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-inspeccion-senalizacion-hs/:id';

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
