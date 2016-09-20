(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('ReportMantenimientoRequestModel', ReportMantenimientoRequestModel);

    ReportMantenimientoRequestModel.$inject = ['$q', 'ReportRequestBaseFactory'];

    function ReportMantenimientoRequestModel($q, ReportRequestBaseFactory) {
        var ReporteModelCreator = ReportRequestBaseFactory.getCreator();
        ReporteModelCreator.prototype.calculateIncumplimiento = function(reportData) {
            var porcentajeCumplimiento = 0;
            // if (reportData.totalKilometrosIncumplen < reportData.maximoKilometrosIncumplimiento) {
            if (reportData.totalKilometros > 0) {
                porcentajeCumplimiento = (reportData.totalKilometrosCumplen / reportData.totalKilometros) * 100;
            }
            //  }
            return porcentajeCumplimiento;
        };
        return ReporteModelCreator;
    }
})();
