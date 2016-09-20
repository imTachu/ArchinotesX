(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('IndiceMortalidadReporteController', IndiceMortalidadReporteController);

    IndiceMortalidadReporteController.$inject = ['$filter', 'Principal', 'service', 'csvNamePrefix', 'ParseLinks', 'paginationConstants', 'Tramo'];

    function IndiceMortalidadReporteController($filter, Principal, service, csvNamePrefix, ParseLinks, paginationConstants, Tramo) {
        var vm = this;

        vm.kilometros = null;
        vm.totalKilometros = null;
        vm.totalKilometrosCumplen = null;
        vm.totalKilometrosIncumplen = null;
        vm.porcentajeCumplimiento = 0;
        vm.links = null;
        vm.linksDetalle = null;
        vm.page = 1;
        vm.pageDetalle = 1;
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
        vm.selectedIdIndiceMortalidad = null;
        vm.selectedKilometro = null;
        vm.longitudConcesion = null;
        vm.tiposReporte = ['CONCESION', 'INTERVENTOR'];
        vm.tipoReporte = vm.tiposReporte[0];

        vm.loadPage = loadPage;
        vm.loadPageDetalle = loadPageDetalle;
        vm.kilometrosAsPdf = kilometrosAsPdf;
        vm.verDetalleKilometro = verDetalleKilometro;
        vm.toThousandSeparatorFormat = toThousandSeparatorFormat;
        vm.changeItemsPerPage = changeItemsPerPage;
        vm.kilometrosAsCsv = kilometrosAsCsv;

        init();

        function init() {
            vm.totalKilometros = null;
            vm.selectedKilometro = null;

            vm.csvFilename = "reporte_o1" + ".csv";
            service.query({
                page: vm.page - 1,
                size: vm.itemsPerPage
            }, function(result, headers) {
                vm.kilometros = result.kilometros;
                vm.longitudConcesion = result.longitudConcesion;
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.numberOfPages = Math.ceil(vm.totalItems / vm.itemsPerPage);
            });

        }

        function verDetalleKilometro(idIndiceMortalidad){
            vm.selectedIdIndiceMortalidad = idIndiceMortalidad;
            service.detalleKilometro({
                page: vm.pageDetalle - 1,
                size: vm.itemsPerPageDetalle,
                idIndiceMortalidad: idIndiceMortalidad
            }, function(result, headers) {
                vm.detalleKilometro = result.kilometrosDetalle;
                vm.linksDetalle = ParseLinks.parse(headers('link'));
                vm.totalItemsDetalle = headers('X-Total-Count');
                vm.numberOfPagesDetalle = Math.ceil(vm.totalItemsDetalle / vm.itemsPerPageDetalle);
            });
        }

        function kilometrosAsPdf() {
            service.pdf({
            }, function(result) {});
        }

        function kilometrosAsCsv() {
            return service.getCsv({
            }, function(result, headers) {
                vm.allKilometros = result;
                return result;
            }).$promise;
        }

        function toThousandSeparatorFormat(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
        }

        function loadPage(page) {
            vm.page = page;
            vm.onChangeDate();
        }

        function loadPageDetalle(pageDetalle) {
            vm.pageDetalle = pageDetalle;
            vm.verDetalleKilometro(vm.selectedIdIndiceMortalidad, vm.selectedKilometro);
        }

        function changeItemsPerPage(num) {
            vm.itemsPerPage = num;
            vm.onChangeDate();
        }

        /* ************************
        ** VALIDACIONES KILOMETROS **
        *************************** */

        vm.IsFill = function(){
            return (vm.kilometros !== null && vm.kilometros.length > 0);
        };
    }
})();
