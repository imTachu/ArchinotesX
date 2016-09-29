(function() {
    'use strict';
    angular
        .module('archinotesxApp')
        .factory('AnguloMedicionSenalizacionV', AnguloMedicionSenalizacionV);

    AnguloMedicionSenalizacionV.$inject = ['$resource'];

    function AnguloMedicionSenalizacionV ($resource) {
        var resourceUrl =  'api/reports/angulosmedicionarreglo';

        return $resource(resourceUrl, {}, {
            'queryAll': { 
                method: 'GET', 
                isArray: true
            }
        });
    }
})();
