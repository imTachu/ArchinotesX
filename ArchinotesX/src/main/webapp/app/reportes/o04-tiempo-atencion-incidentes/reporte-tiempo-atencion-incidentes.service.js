(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('TiempoAtencionIncidentesService', TiempoAtencionIncidentesService);

    TiempoAtencionIncidentesService.$inject = ['$resource', '$window','DateUtils'];

    function TiempoAtencionIncidentesService($resource, $window,DateUtils) {
        var service = $resource('api/reports/tiempoatencionincidentes', {}, {
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
                url: 'api/reports/tiempoatencionincidentescumplimiento',
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
                url: 'api/reports/tiempoatencionincidentespdf',
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
                url: 'api/reports/tiempoatencionincidentesall',
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
                url: 'api/reports/tiempoatencionincidentescriteriosaceptacion',
                method: 'GET'
            }
        });

        return service;
    }
})();
