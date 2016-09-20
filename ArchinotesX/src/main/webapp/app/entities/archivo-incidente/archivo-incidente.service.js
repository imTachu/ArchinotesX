(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('ArchivoIncidente', ArchivoIncidente);

    ArchivoIncidente.$inject = ['$resource', 'DateUtils'];

    function ArchivoIncidente ($resource, DateUtils) {
        var resourceUrl =  'api/archivo-incidentes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaDeRegistro = DateUtils.convertDateTimeFromServer(data.fechaDeRegistro);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'save':   {
                method:'POST',
                transformRequest: formDataObject,
                headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
            }
        });
    }

    function formDataObject (data) {
        var fd = new FormData();
        angular.forEach(data, function(value, key) {
            fd.append(key, value);
        });
        return fd;
    }
})();
