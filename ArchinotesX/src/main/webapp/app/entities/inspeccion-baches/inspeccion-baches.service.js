(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('InspeccionBaches', InspeccionBaches);

    InspeccionBaches.$inject = ['$resource', 'DateUtils'];

    function InspeccionBaches ($resource, DateUtils) {
        var resourceUrl =  'api/inspeccion-baches/:id';

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
                url:'api/inspeccion-baches/finalize'
            }
        });
    }
})();
