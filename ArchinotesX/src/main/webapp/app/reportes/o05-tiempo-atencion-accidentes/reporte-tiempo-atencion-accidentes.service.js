(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('TiempoAtencionAccidentesService', TiempoAtencionAccidentesService);

    TiempoAtencionAccidentesService.$inject = ['$resource', '$window','DateUtils'];

    function TiempoAtencionAccidentesService($resource, $window,DateUtils) {
        var service = $resource('api/reports/tiempoatencionaccidentes', {}, {
            'query': {
                method: 'GET',
                params: {
                    fromDate: null,
                    toDate: null,
                    filter: null
                },
                transformResponse: function (data) 
                {
                    data = angular.fromJson(data);
                    angular.forEach(data.eventos, function(item)
                    {
                        item.fechaHora = DateUtils.convertDateTimeFromServer(item.fechaHora);
                    });
                    return data;
                }
            },
            'queryFiltro': {
                url: 'api/reports/tiempoatencionaccidentescumplimiento',
                method: 'GET',
                params: {
                    cumplimiento: null,
                    fromDate: null,
                    toDate: null
                },
                transformResponse: function (data) 
                {
                    data = angular.fromJson(data);
                    angular.forEach(data.eventos, function(item)
                    {
                        item.fechaHora = DateUtils.convertDateTimeFromServer(item.fechaHora);
                    });
                    return data;
                }
            },
            'pdf': {
                url: 'api/reports/tiempoatencionaccidentespdf',
                method: 'GET',
                headers: {
                    accept: 'application/pdf'
                },
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function(data) {
                    var pdf;
                    if (data) {
                        pdf = new Blob([data], {
                            type: 'application/pdf'
                        });
                        var fileURL = URL.createObjectURL(pdf);
                        $window.open(fileURL);
                    }
                    return {
                        response: pdf
                    };
                }
            },
            'getCsv': {
                url: 'api/reports/tiempoatencionaccidentesall',
                method: 'GET',
                isArray: true,
                params: {
                    fromDate: null,
                    toDate: null
                },
                transformResponse: function (data) 
                {
                    data = angular.fromJson(data);
                    angular.forEach(data, function(item)
                    {
                        item.fechaHora = DateUtils.convertDateTimeFromServer(item.fechaHora);
                    });
                    return data;
                }
            },
            'getCriteriosAceptacion': {
                url: 'api/reports/tiempoatencionaccidentescriteriosaceptacion',
                method: 'GET'
            }
        });

        return service;
    }
})();
