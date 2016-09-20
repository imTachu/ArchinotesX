(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ArchivoInspeccionDesportillamiento', ArchivoInspeccionDesportillamiento);

    ArchivoInspeccionDesportillamiento.$inject = ['$resource', 'DateUtils'];

    function ArchivoInspeccionDesportillamiento ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-inspeccion-desportillamientos/:id';

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
