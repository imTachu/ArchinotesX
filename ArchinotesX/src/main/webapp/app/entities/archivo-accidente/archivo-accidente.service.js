(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('ArchivoAccidente', ArchivoAccidente);

    ArchivoAccidente.$inject = ['$resource', 'DateUtils'];

    function ArchivoAccidente ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-accidentes/:id';

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
