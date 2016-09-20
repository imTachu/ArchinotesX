(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('IndiceMortalidadReporteService', IndiceMortalidadReporteService);

    IndiceMortalidadReporteService.$inject = ['$resource', '$window','DateUtils'];

    function IndiceMortalidadReporteService($resource, $window,DateUtils) {
        var service = $resource('api/reports/indicemortalidad', {}, {
            'query': {
                method: 'GET',
                transformResponse: function (data) 
                {
                    data = angular.fromJson(data);
                    angular.forEach(data.eventos, function(item)
                    {
                        item.fechaFinal = DateUtils.convertDateTimeFromServer(item.fechaFinal);
                        item.fechaInicial = DateUtils.convertDateTimeFromServer(item.fechaInicial);
                    });
                    return data;
                }
            },
            'pdf': {
                url: 'api/reports/indicemortalidadpdf',
                method: 'GET',
                params: {
                    fromDate: null,
                    toDate: null,
                    tipoReporte: null
                },
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
            'getCriteriosAceptacion': {
                url: 'api/reports/indicemortalidadcriteriosaceptacion',
                method: 'GET'
            },
            'getCsv': {
                url: 'api/reports/indicemortalidadall',
                method: 'GET',
                isArray: true,              
                transformResponse: function (data) 
                {
                    data = angular.fromJson(data);
                    angular.forEach(data, function(item)
                    {
                        item.fechaFinal = DateUtils.convertDateTimeFromServer(item.fechaFinal);
                        item.fechaInicial = DateUtils.convertDateTimeFromServer(item.fechaInicial);
                    });
                    return data;
                }
            },
            'detalleKilometro': {
                url: 'api/reports/detalleindicemortalidad',
                method: 'GET',
                params: {
                    idIndiceMortalidad: null
                }
            }
        });

        return service;
    }
})();
