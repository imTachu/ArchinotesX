(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('InspeccionDesportillamientosReporteService', InspeccionDesportillamientosReporteService);

    InspeccionDesportillamientosReporteService.$inject = ['$resource', '$window','DateUtils'];

    function InspeccionDesportillamientosReporteService($resource, $window,DateUtils) {
        var service = $resource('api/reports/estadodesportillamiento', {}, {
            'query': {
                method: 'GET',
                params: {
                    fromDate: null,
                    toDate: null,
                    tipoReporte: null,
                    filter: null
                }
            },
            'queryFiltro': {
                url: 'api/reports/estadodesportillamientocumplimiento',
                method: 'GET',
                params: {
                    cumplimiento: null,
                    fromDate: null,
                    toDate: null,
                    tipoReporte: null,
                    filter: null
                }
            },
            'pdf': {
                url: 'api/reports/estadodesportillamientopdf',
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
            'getCsv': {
                url: 'api/reports/estadodesportillamientoall',
                method: 'GET',
                isArray: true,
                params: {
                    fromDate: null,
                    toDate: null,
                    tipoReporte: null
                },              
                transformResponse: function (data) 
                {
                    data = angular.fromJson(data);
                    angular.forEach(data, function(item)
                    {
                        item.fecha = DateUtils.convertDateTimeFromServer(item.fecha);
                    });
                    
                    return data;
                }
            },
            'getCriteriosAceptacion': {
                url: 'api/reports/inspecciondesportillamientoscriteriosaceptacion',
                method: 'GET'
            },
            'detalleKilometro': {
                url: 'api/reports/detalleestadodesportillamiento',
                method: 'GET',
                isArray: true,
                params: {
                    idInspeccion: null,
                    kilometro: null
                }
            }
        });

        return service;
    }
})();
