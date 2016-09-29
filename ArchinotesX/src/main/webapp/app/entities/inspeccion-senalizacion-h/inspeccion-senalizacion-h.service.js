(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('InspeccionSenalizacionH', InspeccionSenalizacionH);

    InspeccionSenalizacionH.$inject = ['$resource', 'DateUtils'];

    function InspeccionSenalizacionH ($resource, DateUtils) {
        var resourceUrl =  'api/inspeccion-senalizacion-hs/:id';

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
                url:'api/inspeccion-senalizacion-hs/finalize'
            }
        });
    }
})();
