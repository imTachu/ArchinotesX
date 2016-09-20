(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('MedidaEstadoSenalizacionH', MedidaEstadoSenalizacionH);

    MedidaEstadoSenalizacionH.$inject = ['$resource'];

    function MedidaEstadoSenalizacionH ($resource) {
        var resourceUrl =  'api/medida-estado-senalizacion-hs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { 
                method:'PUT',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    }
})();
