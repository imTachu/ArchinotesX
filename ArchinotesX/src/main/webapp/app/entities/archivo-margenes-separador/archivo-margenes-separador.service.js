(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ArchivoMargenesSeparador', ArchivoMargenesSeparador);

    ArchivoMargenesSeparador.$inject = ['$resource', 'DateUtils'];

    function ArchivoMargenesSeparador ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-margenes-separadors/:id';

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
