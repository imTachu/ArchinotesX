(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('OcupacionCarrilesDetalle', OcupacionCarrilesDetalle);

    OcupacionCarrilesDetalle.$inject = ['$resource', 'DateUtils'];

    function OcupacionCarrilesDetalle ($resource, DateUtils) {
        var resourceUrl =  'api/ocupacion-carriles-detalles/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaInicial = DateUtils.convertDateTimeFromServer(data.fechaInicial);
                    data.fechaFinal = DateUtils.convertDateTimeFromServer(data.fechaFinal);
                    return data;
                }
            },
            'update': { 
                method:'PUT',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaInicial = DateUtils.convertDateTimeFromServer(data.fechaInicial);
                    data.fechaFinal = DateUtils.convertDateTimeFromServer(data.fechaFinal);
                    return data;
                }
            }
        });
    }
})();
