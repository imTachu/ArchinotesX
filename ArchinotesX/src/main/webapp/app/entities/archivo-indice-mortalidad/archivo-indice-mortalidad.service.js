(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('ArchivoIndiceMortalidad', ArchivoIndiceMortalidad);

    ArchivoIndiceMortalidad.$inject = ['$resource', 'DateUtils'];

    function ArchivoIndiceMortalidad ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-indice-mortalidads/:id';

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
