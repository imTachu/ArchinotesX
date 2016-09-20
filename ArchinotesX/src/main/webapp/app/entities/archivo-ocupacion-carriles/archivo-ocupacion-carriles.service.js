(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ArchivoOcupacionCarriles', ArchivoOcupacionCarriles);

    ArchivoOcupacionCarriles.$inject = ['$resource', 'DateUtils'];

    function ArchivoOcupacionCarriles ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-ocupacion-carriles/:id';

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
