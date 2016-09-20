(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('IndiceCumplimientoReporteService', IndiceCumplimientoReporteService);

    IndiceCumplimientoReporteService.$inject = ['$resource', '$window'];

    function IndiceCumplimientoReporteService($resource, $window) {
        var service = $resource('api/reports/indicecumplimiento', {}, {
            'pdf': {
                url: 'api/reports/indicecumplimientopdf',
                method: 'POST',
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
            }
        });

        return service;
    }
})();
