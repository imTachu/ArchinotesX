(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ColaPeaje', ColaPeaje);

    ColaPeaje.$inject = ['$resource', 'DateUtils'];

    function ColaPeaje ($resource, DateUtils) {
        var resourceUrl =  'api/cola-peajes/:id';

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
            'update': { method:'PUT',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fecha = DateUtils.convertDateTimeFromServer(data.fecha);
                    return data;
                }
            },
            'finalize':{
                method:'PUT',
                url:'api/cola-peajes/finalize'
            }
        });
    }
})();
