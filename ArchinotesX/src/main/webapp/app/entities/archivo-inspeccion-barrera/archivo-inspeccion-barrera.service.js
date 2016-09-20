(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ArchivoInspeccionBarrera', ArchivoInspeccionBarrera);

    ArchivoInspeccionBarrera.$inject = ['$resource', 'DateUtils'];

    function ArchivoInspeccionBarrera ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-inspeccion-barreras/:id';

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
