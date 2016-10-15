(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('MicroservicesTags', MicroservicesTags);

    MicroservicesTags.$inject = ['$resource', 'DateUtils'];

    function MicroservicesTags ($resource, DateUtils) {
        var resourceUrl =  'api/datamicroservices/tags/:tags';

        // var resourceUrl =  'api/sqldatasources/:id';

        return $resource(resourceUrl, {}, {
            'query': {
                method: 'GET',
                isArray: true
            },
            'get': {
                method: 'GET',
                isArray: true,
                params: { tags: null },
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    }
})();
