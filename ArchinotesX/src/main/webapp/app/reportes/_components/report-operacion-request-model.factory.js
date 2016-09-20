(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('ReportOperacionRequestModel', ReportOperacionRequestModel);

    ReportOperacionRequestModel.$inject = ['$q', 'ReportRequestBaseFactory'];

    function ReportOperacionRequestModel($q, ReportRequestBaseFactory) {
        var ReporteModelCreator= ReportRequestBaseFactory.getCreator();
        ReporteModelCreator.prototype.calculateIncumplimiento=function(reportData){
            return 100;
        };
        return ReporteModelCreator;
    }
})();
