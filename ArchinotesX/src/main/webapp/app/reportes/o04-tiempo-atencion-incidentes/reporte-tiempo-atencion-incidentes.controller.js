(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TiempoAtencionIncidentesController', TiempoAtencionIncidentesController);

    TiempoAtencionIncidentesController.$inject = ['$filter', 'TiempoAtencionIncidentesService', 'ParseLinks', 'paginationConstants', 'DateUtils', 'ReportIncidenteAccidenteRequestModel'];

    function TiempoAtencionIncidentesController($filter, TiempoAtencionIncidentesService, ParseLinks, paginationConstants, DateUtils, ReportIncidenteAccidenteRequestModel) {
        var vm = this;
        var reporteModel=new ReportIncidenteAccidenteRequestModel(TiempoAtencionIncidentesService);
        vm.incidentes = null;
        vm.totalEventos = null;
        vm.totalEventosCumplen = null;
        vm.totalEventosIncumplen = null;
        vm.porcentajeCumplimiento = 0;
        vm.links = null;
        vm.page = 1;
        vm.fromDate = null;
        vm.toDate = null;
        vm.totalItems = null;
        vm.itemsPerPage = 20;
        vm.numberOfPages = null;
        vm.filter = null;
        vm.filterByIncumplido = false;
        vm.allIncidentes = null;
        vm.csvFilename = null;
        vm.criteriosAceptacion = null;
        vm.diffDays = null;
        vm.maximoEventosIncumplimiento = null;

        vm.today = today;
        vm.loadPage = loadPage;
        vm.onChangeDate = onChangeDate;
        vm.incidentesAsPdf = incidentesAsPdf;
        vm.previousMonth = previousMonth;
        vm.toCurrencyFormat = toCurrencyFormat;
        vm.toThousandSeparatorFormat = toThousandSeparatorFormat;
        vm.changeItemsPerPage = changeItemsPerPage;
        vm.performFilterByIncumplido = performFilterByIncumplido;
        vm.verCriteriosAceptacion = verCriteriosAceptacion;
        vm.incidentesAsCsv = incidentesAsCsv;
        vm.verTodos = verTodos;
        vm.closeAlert = closeAlert;

        vm.previousMonth();
        vm.onChangeDate();
        vm.verCriteriosAceptacion();
        vm.dateFormat='yyyy-MM-dd';

        function onChangeDate() {
            vm.totalEventos = null;
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.fromDate, dateFormat);
            var toDate = $filter('date')(vm.toDate, dateFormat);

            vm.diffDays = DateUtils.dateDaysDiff(vm.toDate, vm.fromDate);

            if (vm.diffDays < 0) {
                vm.previousMonth();
            } else {
                vm.csvFilename = "reporte_o4_" + fromDate + "_" + toDate + ".csv";
                reporteModel.query({
                    page: vm.page - 1,
                    size: vm.itemsPerPage,
                    fromDate: fromDate,
                    toDate: toDate,
                    filter: vm.filter
                }, function(result, headers) {
                    vm.incidentes = result.eventos;
                    vm.totalEventos = result.totalEventos;
                    vm.totalEventosCumplen = result.totalEventosCumplen;
                    vm.totalEventosIncumplen = result.totalEventosIncumplen;
                    vm.porcentajeCumplimiento = reporteModel.getIncumplimientoFormateado();
                    vm.links = ParseLinks.parse(headers('link'));
                    vm.totalItems = headers('X-Total-Count');
                    vm.numberOfPages = Math.ceil(vm.totalItems / vm.itemsPerPage);
                });

            }
        }

        function today() {
            var today = new Date();
            vm.toDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        }

        function previousMonth() {
            var today = new Date();
            if (today.getMonth() === 0) {
                vm.fromDate = new Date(today.getFullYear() - 1, 11, today.getDate());
            } else {
                vm.fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            }
            vm.toDate = new Date(today.getFullYear(), today.getMonth(), 0);
        }

        function loadPage(page) {
            vm.page = page;
            vm.onChangeDate();
        }

        function toCurrencyFormat(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }

        function changeItemsPerPage(num) {
            vm.itemsPerPage = num;
            vm.onChangeDate();
        }

        function incidentesAsPdf() {
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.fromDate, dateFormat);
            var toDate = $filter('date')(vm.toDate, dateFormat);
            TiempoAtencionIncidentesService.pdf({
                fromDate: fromDate,
                toDate: toDate,
                filter: vm.filter
            }, function(result) {});
        }

        function incidentesAsCsv() {
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.fromDate, dateFormat);
            var toDate = $filter('date')(vm.toDate, dateFormat);
            return TiempoAtencionIncidentesService.getCsv({
                fromDate: fromDate,
                toDate: toDate
            }, function(result, headers) {
                vm.allIncidentes = result;
                return result;
            }).$promise;
        }
        
        function verCriteriosAceptacion() {
            reporteModel.getCriteriosAceptacion().then(function(reportData){
                vm.criteriosAceptacion = reportData.criteriosAceptacion;
                vm.maximoEventosIncumplimiento = reportData.maximoEventosIncumplimiento;
            });
        }

        function toThousandSeparatorFormat(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
        }

        function performFilterByIncumplido(bool) {
            vm.totalEventos = null;
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.fromDate, dateFormat);
            var toDate = $filter('date')(vm.toDate, dateFormat);

            reporteModel.queryFiltro({
                page: vm.page - 1,
                size: vm.itemsPerPage,
                cumplimiento: bool,
                fromDate: fromDate,
                toDate: toDate,
                filter: vm.filter
            }, function(result, headers) {
                vm.incidentes = result.eventos;
                vm.totalEventos = result.totalEventos;
                vm.totalEventosCumplen = result.totalEventosCumplen;
                vm.totalEventosIncumplen = result.totalEventosIncumplen;
                vm.porcentajeCumplimiento= reporteModel.getIncumplimientoFormateado();
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.numberOfPages = Math.ceil(vm.totalItems / vm.itemsPerPage);
            });
            vm.filterByIncumplido = true;
        }

        function verTodos() {
            vm.filterByIncumplido = false;
            vm.onChangeDate();
        }

        function closeAlert() {
            vm.diffDays = null;
        }

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.fromDate = false;
        vm.datePickerOpenStatus.toDate = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };

        /* ************************
        ***** VALIDACIONES PIE ****
        *************************** */

        vm.pieValidationEventos = function(){
            return (vm.totalEventos > 0);
        };

        vm.pieValidationCumplimiento = function(){
            return (vm.porcentajeCumplimiento > 0);
        };

        /* ************************
        ** VALIDACIONES ACCIDENTES **
        *************************** */

        vm.incidentesIsFill = function(){
            return (vm.incidentes !== null && vm.incidentes.length > 0);
        };
    }
})();
