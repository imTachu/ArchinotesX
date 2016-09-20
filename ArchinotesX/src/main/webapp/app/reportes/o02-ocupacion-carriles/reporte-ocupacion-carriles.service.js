(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('OcupacionCarrilesReporteService', OcupacionCarrilesReporteService);

    OcupacionCarrilesReporteService.$inject = ['$resource', '$window','DateUtils'];

    function OcupacionCarrilesReporteService($resource, $window, DateUtils) {
        var service = $resource('api/reports/ocupacioncarriles', {}, {
            'query': {
                method: 'GET',
                // params: {
                //     fromDate: null,
                //     toDate: null,
                //     filter: null
                // }
                transformResponse: function (data) 
                {
                    data = angular.fromJson(data);
                    angular.forEach(data.eventos, function(item)
                    {
                        item[1] = DateUtils.convertDateTimeFromServer(item[1]);
                    });
                    return data;
                }
            },
            'pdf': {
                url: 'api/reports/ocupacioncarrilespdf',
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
                url: 'api/reports/ocupacioncarrilesall',
                method: 'GET',
                isArray: true,
                // params: {
                //     fromDate: null,
                //     toDate: null
                // }
                transformResponse: function (data) 
                {
                    data = angular.fromJson(data);
                    angular.forEach(data, function(item)
                    {
                        item[1] = DateUtils.convertDateTimeFromServer(item[1]);
                    });
                    return data;
                }
            },
            'getCriteriosAceptacion': {
                url: 'api/reports/ocupacioncarrilescriteriosaceptacion',
                method: 'GET'
            },
            'detalleOcupacionCarriles': {
                url: 'api/reports/detalleocupacioncarriles',
                method: 'GET',
                // isArray: true,
                params: {
                    idOcupacionCarriles: null
                    // kilometro: null
                }
            }
        });

        return service;
    }
})();
