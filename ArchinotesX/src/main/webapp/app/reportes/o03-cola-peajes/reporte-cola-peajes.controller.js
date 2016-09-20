(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ReporteColaPeajesController', ReporteColaPeajesController);

    ReporteColaPeajesController.$inject = ['$filter', 'Principal', 'service', 'csvNamePrefix', 'ParseLinks', 'paginationConstants', 'ReportOperacionRequestModel'];

    function ReporteColaPeajesController($filter, Principal, service, csvNamePrefix, ParseLinks, paginationConstants, ReportOperacionRequestModel) {
        var vm = this;
        var reporteModel=new ReportOperacionRequestModel(service);
        vm.colaPeajes = null;
        vm.totalPeajes = null;
        // vm.totalPeajesCumplen = null;
        // vm.totalPeajesIncumplen = null;
        // vm.porcentajeCumplimiento = 0;
        vm.links = null;
        vm.page = 1;
        vm.pageDetalle = 1;
        // vm.fromDate = null;
        // vm.toDate = null;
        vm.totalItems = null;
        vm.itemsPerPage = 20;
        vm.itemsPerPageDetalle = 20;
        vm.numberOfPages = null;
        vm.numberOfPagesDetalle = null;
        vm.filter = null;
        vm.filterByIncumplido = false;
        vm.allPeajes = null;
        vm.csvFilename = null;
        vm.criteriosAceptacion = null;
        // vm.diffDays = null;
        vm.maximoPejaesIncumplimiento = 1;
        // vm.tiposReporte = ['CONCESION', 'INTERVENTOR'];
        // vm.tipoReporte = vm.tiposReporte[0];

        // vm.today = today;
        vm.loadPage = loadPage;
        vm.loadPageDetalle = loadPageDetalle;
        // vm.onChangeDate = onChangeDate;
        vm.peajesAsPdf = peajesAsPdf;
        vm.verDetallePeaje = verDetallePeaje;
        // vm.previousMonth = previousMonth;
        // vm.toCurrencyFormat = toCurrencyFormat;
        // vm.toThousandSeparatorFormat = toThousandSeparatorFormat;
        vm.changeItemsPerPage = changeItemsPerPage;
        //vm.performFilterByIncumplido = performFilterByIncumplido;
        vm.verCriteriosAceptacion = verCriteriosAceptacion;
        vm.peajesAsCsv = peajesAsCsv;
        vm.verTodos = verTodos;
        //vm.closeAlert = closeAlert;

        // vm.previousMonth();
        // vm.onChangeDate();
        init();


        function init() {
            vm.totalPeajes = null;
            vm.selectedPeaje = null;

            vm.csvFilename = csvNamePrefix + ".cvs";
            reporteModel.query({
                page: vm.page - 1,
                size: vm.itemsPerPage
                // tipoReporte: vm.tipoReporte,
            }, function(result, headers) {
                vm.colaPeajes = result.registrosColasDePeaje;
                vm.totalPeajes = result.totalPeajes;
                // vm.totalPeajesCumplen = result.totalPeajesCumplen;
                // vm.totalPeajesIncumplen = result.totalPeajesIncumplen;
                // if( vm.totalPeajesIncumplen >= vm.maximoPejaesIncumplimiento ){vm.porcentajeCumplimiento = 0;}
                // else { vm.porcentajeCumplimiento = 100;}
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.numberOfPages = Math.ceil(vm.totalItems / vm.itemsPerPage);
            });

            vm.verCriteriosAceptacion();
        }

        function verDetallePeaje(idSelectedPeaje) {
            vm.selectedIdPeaje = idSelectedPeaje;
            service.detallePeaje({
                page: vm.pageDetalle - 1,
                size: vm.itemsPerPageDetalle,
                idColaPeaje: idSelectedPeaje
            }, function(result, headers) {
                vm.detallePeaje = result.registrosColasDePeajeDetalle;
                vm.linksDetalle = ParseLinks.parse(headers('link'));
                vm.totalItemsDetalle = headers('X-Total-Count');
                vm.numberOfPagesDetalle = Math.ceil(vm.totalItemsDetalle / vm.itemsPerPageDetalle);
            });
        }

        function loadPage(page) {
            vm.page = page;
            init();
            // vm.onChangeDate();
        }

        function loadPageDetalle(pageDetalle) {
            vm.pageDetalle = pageDetalle;
            vm.verDetallePeaje(vm.selectedIdPeaje);
        }

        function changeItemsPerPage(num) {
            vm.itemsPerPage = num;
            init();
            // vm.onChangeDate();
        }

        function peajesAsPdf() {
            // var dateFormat = 'yyyy-MM-dd';
            // var fromDate = $filter('date')(vm.fromDate, dateFormat);
            // var toDate = $filter('date')(vm.toDate, dateFormat);
            service.pdf({
                // fromDate: fromDate,
                // toDate: toDate,
                // filter: vm.filter
            }, function(result) {});
        }

        function peajesAsCsv() {
            // var dateFormat = 'yyyy-MM-dd';
            // var fromDate = $filter('date')(vm.fromDate, dateFormat);
            // var toDate = $filter('date')(vm.toDate, dateFormat);
            return service.getCsv({
                // fromDate: fromDate,
                // toDate: toDate
            }, function(result, headers) {
                vm.allPeajes = result;
                return result;
            }).$promise;
        }

        function verCriteriosAceptacion() {
            reporteModel.getCriteriosAceptacion().then(function(reportData){
                vm.criteriosAceptacion = reportData.criteriosAceptacion;
                vm.cantidadMaximaVehiculos = reportData.cantidadMaximaVehiculos;
            });
        }

        function verTodos() {
            vm.filterByIncumplido = false;
            // vm.onChangeDate();
            init();
        }

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.fromDate = false;
        vm.datePickerOpenStatus.toDate = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };

        /* ************************
         ** VALIDACIONES PEAJES **
         *************************** */

        vm.peajesIsFill = function() {
            return (vm.colaPeajes !== null && vm.colaPeajes.length > 0);
        };
    }
})();
