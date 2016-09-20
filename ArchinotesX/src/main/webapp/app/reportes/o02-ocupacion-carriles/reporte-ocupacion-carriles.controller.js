(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ReporteOcupacionCarrilesController', ReporteOcupacionCarrilesController);

    ReporteOcupacionCarrilesController.$inject = ['$filter', 'Principal', 'service', 'csvNamePrefix', 'ParseLinks', 'paginationConstants', 'ReportOperacionRequestModel'];

    function ReporteOcupacionCarrilesController($filter, Principal, service, csvNamePrefix, ParseLinks, paginationConstants, ReportOperacionRequestModel) {
        var vm = this;
        var reporteModel=new ReportOperacionRequestModel(service);
        vm.ocupacionCarriles = null;
        vm.totalOcupacionCarriles = null;
        // vm.totalOcupacionCarrilesCumplen = null;
        // vm.totalOcupacionCarrilesIncumplen = null;
        // vm.porcentajeCumplimiento = 0;
        vm.links = null;
        vm.page = 1;
        vm.pageDetalle = 1;
        // vm.fromDate = null;
        // vm.toDate = null;
        vm.totalItems = null;
        vm.itemsPerPage = 20;
        vm.numberOfPages = null;
        vm.itemsPerPageDetalle = 20;
        vm.numberOfPagesDetalle = null;
        vm.filter = null;
        vm.filterByIncumplido = false;
        vm.allOcupacionCarriles = null;
        vm.csvFilename = null;
        vm.criteriosAceptacion = null;
        // vm.diffDays = null;
        vm.maximoOcupacionCarriles = 1;
        // vm.tiposReporte = ['CONCESION', 'INTERVENTOR'];
        // vm.tipoReporte = vm.tiposReporte[0];

        // vm.today = today;
        vm.loadPage = loadPage;
        vm.loadPageDetalle = loadPageDetalle;
        // vm.onChangeDate = onChangeDate;
        vm.ocupacionCarrilesAsPdf = ocupacionCarrilesAsPdf;
        vm.verDetalleOcupacionCarriles = verDetalleOcupacionCarriles;
        // vm.previousMonth = previousMonth;
        // vm.toCurrencyFormat = toCurrencyFormat;
        // vm.toThousandSeparatorFormat = toThousandSeparatorFormat;
        vm.changeItemsPerPage = changeItemsPerPage;
        //vm.performFilterByIncumplido = performFilterByIncumplido;
        vm.verCriteriosAceptacion = verCriteriosAceptacion;
        vm.ocupacionCarrilesAsCsv = ocupacionCarrilesAsCsv;
        // vm.verTodos = verTodos; 
        //vm.closeAlert = closeAlert;

        // vm.previousMonth();
        // vm.onChangeDate();
        init();


        function init() {
            vm.totalOcupacionCarriles = null;
            vm.selectedOcupacionCa = null;

            vm.csvFilename = csvNamePrefix + ".cvs";
            reporteModel.query({
                page: vm.page - 1,
                size: vm.itemsPerPage
                // tipoReporte: vm.tipoReporte,
            }, function(result, headers) {
                vm.ocupacionCarriles = result.registrosOcupacionCarriles;
                vm.totalOcupacionCarriles = result.totalOcupacionCarriles;
                // vm.totalOcupacionCarrilesCumplen = result.totalOcupacionCarrilesCumplen;
                // vm.totalOcupacionCarrilesIncumplen = result.totalOcupacionCarrilesIncumplen;
                // if( vm.totalOcupacionCarrilesIncumplen >= vm.maximoOcupacionCarriles ){vm.porcentajeCumplimiento = 0;}
                // else { vm.porcentajeCumplimiento = 100;}
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.numberOfPages = Math.ceil(vm.totalItems / vm.itemsPerPage);
            });

            vm.verCriteriosAceptacion();
        }

        function verDetalleOcupacionCarriles(idSelectedOcupacionCarriles) {
            vm.selectedIdPeaje = idSelectedOcupacionCarriles;
            service.detalleOcupacionCarriles({
                page: vm.pageDetalle - 1,
                size: vm.itemsPerPageDetalle,
                idOcupacionCarriles: idSelectedOcupacionCarriles
            }, function(result, headers) {
                vm.detalleOcupacionCarriles = result.registrosOcupacionCarrilesDetalle;
                vm.linksDetalle = ParseLinks.parse(headers('link'));
                vm.totalItemsDetalle = headers('X-Total-Count');
                vm.numberOfPagesDetalle = Math.ceil(vm.totalItemsDetalle / vm.itemsPerPageDetalle);
            });
        }

        function loadPage(page) {
            vm.page = page;
            init();
        }

        function loadPageDetalle(pageDetalle) {
            vm.pageDetalle = pageDetalle;
            vm.verDetalleOcupacionCarriles(vm.selectedIdPeaje);
        }

        function changeItemsPerPage(num) {
            vm.itemsPerPage = num;
            init();
        }

        function ocupacionCarrilesAsPdf() {
            service.pdf({}, function(result) {});
        }

        function ocupacionCarrilesAsCsv() {
            return service.getCsv({}, function(result, headers) {
                vm.allOcupacionCarriles = result;
                return result;
            }).$promise;
        }

        function verCriteriosAceptacion() {
            reporteModel.getCriteriosAceptacion().then(function(reportData){
                vm.criteriosAceptacion = reportData.criteriosAceptacion;
                vm.maximoLongitudRetencion = reportData.maximoLongitudRetencion;
            });
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

        vm.ocupacionCarrilesIsFill = function() {
            return (vm.ocupacionCarriles !== null && vm.ocupacionCarriles.length > 0);
        };
    }
})();
