(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('InspeccionDesportillamiento', InspeccionDesportillamiento);

    InspeccionDesportillamiento.$inject = ['$resource', 'DateUtils'];

    function InspeccionDesportillamiento ($resource, DateUtils) {
        var resourceUrl =  'api/inspeccion-desportillamientos/:id';

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
                url:'api/inspeccion-desportillamientos/finalize'
            }
        });
    }
})();
