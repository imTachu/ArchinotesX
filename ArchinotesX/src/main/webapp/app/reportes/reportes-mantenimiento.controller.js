(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('ReportesMantenimientoController', ReportesMantenimientoController);

    ReportesMantenimientoController.$inject = ['$filter', 'Principal', 'service', 'csvNamePrefix', 'ParseLinks', 'paginationConstants', 'Tramo', 'DateUtils', 'ReportMantenimientoRequestModel'];

    function ReportesMantenimientoController($filter, Principal, service, csvNamePrefix, ParseLinks, paginationConstants, Tramo, DateUtils, ReportMantenimientoRequestModel) {
        var vm = this;
        var reporteModel=new ReportMantenimientoRequestModel(service);
        vm.kilometros = null;
        vm.totalKilometros = null;
        vm.totalKilometrosCumplen = null;
        vm.totalKilometrosIncumplen = null;
        vm.porcentajeCumplimiento = 0;
        vm.links = null;
        vm.linksDetalle = null;
        vm.page = 1;
        vm.pageDetalle = 1;
        vm.fromDate = null;
        vm.toDate = null;
        vm.totalItems = null;
        vm.totalItemsDetalle = null;
        vm.detalleKilometro = null;
        vm.itemsPerPage = 20;
        vm.itemsPerPageDetalle = 20;
        vm.numberOfPages = null;
        vm.numberOfPagesDetalle = null;
        vm.filter = null;
        vm.filterByIncumplido = false;
        vm.allKilometros = null;
        vm.csvFilename = null;
        vm.criteriosAceptacion = null;
        vm.diffDays = null;
        vm.maximoKilometrosIncumplimiento = 3;
        vm.unidadesFuncionales = null;
        vm.currentUnidadFuncional = null;
        vm.selectedUnidadFuncional = null;
        vm.selectedIdInspeccion = null;
        vm.selectedKilometro = null;
        vm.account = null;
        vm.tiposReporte = ['CONCESION', 'INTERVENTOR'];
        vm.tipoReporte = vm.tiposReporte[0];

        vm.loadPage = loadPage;
        vm.loadPageDetalle = loadPageDetalle;
        vm.onChangeDate = onChangeDate;
        vm.kilometrosAsPdf = kilometrosAsPdf;
        vm.verDetalleKilometro = verDetalleKilometro;
        vm.changeItemsPerPage = changeItemsPerPage;
        vm.performFilterByIncumplido = performFilterByIncumplido;
        vm.kilometrosAsCsv = kilometrosAsCsv;
        vm.verTodos = verTodos;
        vm.closeAlert = closeAlert;
        vm.dateFormat = 'yyyy-MM-dd';

        getAllUnidadesFuncionales();

        function getAllUnidadesFuncionales(){
            Tramo.getAllUnidadesFuncionales({}, function(unidadesFuncionales) {
                vm.unidadesFuncionales = unidadesFuncionales;
                vm.currentUnidadFuncional = unidadesFuncionales[0];
                getAccount();
                verCriteriosAceptacion();
                previousMonth();
            });
        }

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.tipoReporte = vm.account.tipoReporte;
                onChangeDate();
            });
        }

        function onChangeDate() {
            vm.totalKilometros = null;
            vm.selectedKilometro = null;
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.fromDate, dateFormat);
            var toDate = $filter('date')(vm.toDate, dateFormat);
            var currentUnidadFuncional = vm.currentUnidadFuncional;
            vm.diffDays = DateUtils.dateDaysDiff(vm.toDate, vm.fromDate);

            if (vm.currentUnidadFuncional === vm.unidadesFuncionales[0]){
                currentUnidadFuncional = null;
            }

            if (vm.diffDays < 0) {
                previousMonth();
                onChangeDate();
            } else {
                vm.csvFilename = csvNamePrefix + fromDate + "_" + toDate + ".csv";
                reporteModel.query({
                    page: vm.page - 1,
                    size: vm.itemsPerPage,
                    fromDate: fromDate,
                    toDate: toDate,
                    tipoReporte: vm.tipoReporte,
                    filter: currentUnidadFuncional
                }, function(result, headers) {
                    vm.kilometros = result.kilometros;
                    vm.totalKilometros = result.totalKilometros;
                    vm.totalKilometrosCumplen = result.totalKilometrosCumplen;
                    vm.totalKilometrosIncumplen = result.totalKilometrosIncumplen;
                    vm.porcentajeCumplimiento=reporteModel.getIncumplimientoFormateado();
                    vm.links = ParseLinks.parse(headers('link'));
                    vm.totalItems = headers('X-Total-Count');
                    vm.numberOfPages = Math.ceil(vm.totalItems / vm.itemsPerPage);
                });
            }
        }

        function verDetalleKilometro(selectedUnidadFuncional, idInspeccion, kilometro){
            vm.selectedKilometro = kilometro;
            vm.selectedIdInspeccion = idInspeccion;
            vm.selectedUnidadFuncional = selectedUnidadFuncional;
            service.detalleKilometro({
                page: vm.pageDetalle - 1,
                size: vm.itemsPerPageDetalle,
                idInspeccion: idInspeccion,
                kilometro: kilometro
            }, function(result, headers) {
                vm.detalleKilometro = result;
                vm.linksDetalle = ParseLinks.parse(headers('link'));
                vm.totalItemsDetalle = headers('X-Total-Count');
                vm.numberOfPagesDetalle = Math.ceil(vm.totalItemsDetalle / vm.itemsPerPageDetalle);
            });
        }

        function performFilterByIncumplido(bool) {
            vm.totalKilometros = null;
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.fromDate, dateFormat);
            var toDate = $filter('date')(vm.toDate, dateFormat);
            var currentUnidadFuncional = vm.currentUnidadFuncional;

            if (vm.currentUnidadFuncional === vm.unidadesFuncionales[0]){
                currentUnidadFuncional = null;
            }
            reporteModel.queryFiltro({
                page: vm.page - 1,
                size: vm.itemsPerPage,
                cumplimiento: bool,
                fromDate: fromDate,
                toDate: toDate,
                filter: currentUnidadFuncional,
                tipoReporte: vm.tipoReporte
            }, function(result, headers) {
                vm.kilometros = result.kilometros;
                vm.totalKilometros = result.totalKilometros;
                vm.totalKilometrosCumplen = result.totalKilometrosCumplen;
                vm.totalKilometrosIncumplen = result.totalKilometrosIncumplen;
                vm.porcentajeCumplimiento= reporteModel.getIncumplimientoFormateado();
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.numberOfPages = Math.ceil(vm.totalItems / vm.itemsPerPage);
            });
            vm.filterByIncumplido = true;
        }

        function kilometrosAsPdf() {
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.fromDate, dateFormat);
            var toDate = $filter('date')(vm.toDate, dateFormat);
            service.pdf({
                fromDate: fromDate,
                toDate: toDate,
                tipoReporte: vm.tipoReporte
            }, function(result) {});
        }

        function kilometrosAsCsv() {
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.fromDate, dateFormat);
            var toDate = $filter('date')(vm.toDate, dateFormat);
            return service.getCsv({
                fromDate: fromDate,
                toDate: toDate,
                tipoReporte: vm.tipoReporte
            }, function(result, headers) {
                vm.allKilometros = result;
                return result;
            }).$promise;
        }

        function verCriteriosAceptacion() {
            reporteModel.getCriteriosAceptacion().then(function(reportData){
                vm.criteriosAceptacion = reportData.criteriosAceptacion;
                vm.maximoKilometrosIncumplimiento = reportData.maximoKilometrosIncumplimiento;
            });
        }

        function verTodos() {
            vm.filterByIncumplido = false;
            vm.onChangeDate();
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

        function loadPageDetalle(pageDetalle) {
            vm.pageDetalle = pageDetalle;
            vm.verDetalleKilometro(vm.selectedIdInspeccion, vm.selectedKilometro);
        }

        function changeItemsPerPage(num) {
            vm.itemsPerPage = num;
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

        vm.pieValidationKilometros = function(){
            return (vm.totalKilometros > 0);
        };

        vm.pieValidationCumplimiento = function(){
            return (vm.porcentajeCumplimiento > 0);
        }; 

        /* ************************
        ** VALIDACIONES KILOMETROS **
        *************************** */

        vm.IsFill = function(){
            return (vm.kilometros !== null && vm.kilometros.length > 0);
        };
    }
})();
