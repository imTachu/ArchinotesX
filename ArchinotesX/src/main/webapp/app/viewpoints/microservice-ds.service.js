(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('MicroservicesByDS', MicroservicesByDS);

    MicroservicesByDS.$inject = ['$resource', 'DateUtils'];


    function MicroservicesByDS ($resource, DateUtils) {
        var resourceUrl =  '/api/datamicroservices/find-by-ds/:id';

        return $resource(resourceUrl, {}, {
            'get': {
                method: 'GET',
                isArray: true,
                params: { id: null },
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    }
})();
