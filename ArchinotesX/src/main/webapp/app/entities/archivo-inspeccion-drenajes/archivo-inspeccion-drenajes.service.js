(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('ArchivoInspeccionDrenajes', ArchivoInspeccionDrenajes);

    ArchivoInspeccionDrenajes.$inject = ['$resource', 'DateUtils'];

    function ArchivoInspeccionDrenajes ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-inspeccion-drenajes/:id';

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
