(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ArchivoInspeccionBaches', ArchivoInspeccionBaches);

    ArchivoInspeccionBaches.$inject = ['$resource', 'DateUtils'];

    function ArchivoInspeccionBaches ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-inspeccion-baches/:id';

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
