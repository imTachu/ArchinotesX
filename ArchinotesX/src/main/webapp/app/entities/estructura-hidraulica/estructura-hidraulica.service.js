(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('EstructuraHidraulica', EstructuraHidraulica);

    EstructuraHidraulica.$inject = ['$resource'];

    function EstructuraHidraulica ($resource) {
        var resourceUrl =  'api/estructura-hidraulicas/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true, cache:true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'queryAll': { url:'api/estructura-hidraulicas-all', method: 'GET', isArray: true}
        });
    }
})();
