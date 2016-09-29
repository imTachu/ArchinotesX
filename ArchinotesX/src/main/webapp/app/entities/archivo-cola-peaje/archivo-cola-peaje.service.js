(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('ArchivoColaPeaje', ArchivoColaPeaje);

    ArchivoColaPeaje.$inject = ['$resource', 'DateUtils'];

    function ArchivoColaPeaje ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-cola-peajes/:id';

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
