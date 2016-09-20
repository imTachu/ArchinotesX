(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('OcupacionCarriles', OcupacionCarriles);

    OcupacionCarriles.$inject = ['$resource', 'DateUtils'];

    function OcupacionCarriles ($resource, DateUtils) {
        var resourceUrl =  'api/ocupacion-carriles/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fecha = DateUtils.convertDateTimeFromServer(data.fecha);
                    return data;
                }
            },
            'update': { 
                method:'PUT',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fecha = DateUtils.convertDateTimeFromServer(data.fecha);
                    return data;
                }
            },
            'finalize':{
                method:'PUT',
                url:'api/ocupacion-carriles/finalize'
            }
        });
    }
})();
