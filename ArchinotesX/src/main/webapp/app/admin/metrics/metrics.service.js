(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .factory('JhiMetricsService', JhiMetricsService);

    JhiMetricsService.$inject = ['$rootScope', '$http'];

    function JhiMetricsService($rootScope, $http) {
        var service = {
            getMetrics: getMetrics,
            threadDump: threadDump,
            serverStatus: serverStatus,
            getCriteriosAceptacion:getCriteriosAceptacion
        };

        return service;

        function getMetrics() {
            return $http.get('metrics/metrics').then(function(response) {
                return response.data;
            });
        }

        function threadDump() {
            return $http.get('dump').then(function(response) {
                return response.data;
            });
        }

        function serverStatus(period) {
            return $http.get(
            'api/errordisponibilidad', {
                params: {
                    periodo: period
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function getCriteriosAceptacion(){
            return $http.get(
            'api/reports/disponibilidadarchinotesxcriteriosaceptacion', {
            }).then(function(response) {
                return response.data;
            });   
        }
    }
}
)();
