(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('InspeccionSenalizacionV', InspeccionSenalizacionV);

    InspeccionSenalizacionV.$inject = ['$resource', 'DateUtils'];

    function InspeccionSenalizacionV ($resource, DateUtils) {
        var resourceUrl =  'api/inspeccion-senalizacion-vs/:id';

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
                url:'api/inspeccion-senalizacion-vs/finalize'
            }
        });
    }
})();
