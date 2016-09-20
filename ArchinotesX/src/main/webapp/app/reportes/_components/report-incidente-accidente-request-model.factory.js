(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('ReportIncidenteAccidenteRequestModel', ReportIncidenteAccidenteRequestModel);

    ReportIncidenteAccidenteRequestModel.$inject = ['$q', 'ReportRequestBaseFactory'];

    function ReportIncidenteAccidenteRequestModel($q, ReportRequestBaseFactory) {
        var ReporteModelCreator= ReportRequestBaseFactory.getCreator();
        ReporteModelCreator.prototype.calculateIncumplimiento=function(reportData){
            var porcentajeCumplimiento = 0;
            if (reportData.totalEventosIncumplen < reportData.maximoEventosIncumplimiento && reportData.totalEventos>0) {
                porcentajeCumplimiento = (reportData.totalEventosCumplen / reportData.totalEventos) * 100;
            }
            return porcentajeCumplimiento;
        };
        return ReporteModelCreator;
    }
})();
