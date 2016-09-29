(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('InspeccionBarreraContencion', InspeccionBarreraContencion);

    InspeccionBarreraContencion.$inject = ['$resource', 'DateUtils'];

    function InspeccionBarreraContencion ($resource, DateUtils) {
        var resourceUrl =  'api/inspeccion-barrera-contencions/:id';

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
                url:'api/inspeccion-barrera-contencions/finalize'
            }
        });
    }
})();
