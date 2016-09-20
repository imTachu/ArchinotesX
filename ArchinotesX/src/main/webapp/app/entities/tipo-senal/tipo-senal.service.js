(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('TipoSenal', TipoSenal);

    TipoSenal.$inject = ['$resource'];

    function TipoSenal ($resource) {
        var resourceUrl =  'api/tipo-senals/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'queryAll': { url:'api/tipo-senals-all', method: 'GET', isArray: true}
        });
    }
})();
