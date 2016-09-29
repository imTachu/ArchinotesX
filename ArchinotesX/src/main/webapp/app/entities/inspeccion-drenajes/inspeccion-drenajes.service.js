(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('InspeccionDrenajes', InspeccionDrenajes);

    InspeccionDrenajes.$inject = ['$resource', 'DateUtils'];

    function InspeccionDrenajes ($resource, DateUtils) {
        var resourceUrl =  'api/inspeccion-drenajes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaInspeccion = DateUtils.convertDateTimeFromServer(data.fechaInspeccion);
                    data.fechaVerificacion = DateUtils.convertDateTimeFromServer(data.fechaVerificacion);
                    return data;
                }
            },
            'update': { 
                method:'PUT',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaInspeccion = DateUtils.convertDateTimeFromServer(data.fechaInspeccion);
                    data.fechaVerificacion = DateUtils.convertDateTimeFromServer(data.fechaVerificacion);
                    return data;
                }
            },
            'finalize':{
                method:'PUT',
                url:'api/inspeccion-drenajes/finalize'
            }
        });
    }
})();
