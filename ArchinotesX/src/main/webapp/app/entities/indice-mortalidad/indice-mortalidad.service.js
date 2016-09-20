(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('IndiceMortalidad', IndiceMortalidad);

    IndiceMortalidad.$inject = ['$resource', 'DateUtils'];

    function IndiceMortalidad ($resource, DateUtils) {
        var resourceUrl =  'api/indice-mortalidads/:id';

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
            },
            'finalize':{
                method:'PUT',
                url:'api/indice-mortalidads/finalize'
            }
        });
    }
})();
