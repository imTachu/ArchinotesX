(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('IndiceCumplimientoController', IndiceCumplimientoController);

    IndiceCumplimientoController.$inject = [
        '$scope',
        '$filter',
        '$q',
        
        'ReportIncidenteAccidenteRequestModel',
        'ReportMantenimientoRequestModel',
        'ReportOperacionRequestModel',
        'ReportDisponibilidadRequestModel',

        'TiempoAtencionAccidentesService',
        'TiempoAtencionIncidentesService',
        'ColaPeajesReporteService',
        'OcupacionCarrilesReporteService',
        'IndiceMortalidadReporteService',
        'InspeccionDesportillamientosReporteService',
        'InspeccionBarrerasReporteService',
        'InspeccionSenalizacionHorizontalReporteService',
        'InspeccionSenalizacionVerticalReporteService',
        'InspeccionDrenajesReporteService',
        'InspeccionMargenesReporteService',
        'InspeccionBachesReporteService',
        'JhiMetricsService',

        'IndiceCumplimientoReporteService'
    ];

    function IndiceCumplimientoController(
        $scope,
        $filter,
        $q,
        ReportIncidenteAccidenteRequestModel,
        ReportMantenimientoRequestModel,
        ReportOperacionRequestModel,
        ReportDisponibilidadRequestModel,

        TiempoAtencionAccidentesService,
        TiempoAtencionIncidentesService,
        ColaPeajesReporteService,
        OcupacionCarrilesReporteService,
        IndiceMortalidadReporteService,
        InspeccionDesportillamientosReporteService,
        InspeccionBarrerasReporteService,
        InspeccionSenalizacionHorizontalReporteService,
        InspeccionSenalizacionVerticalReporteService,
        InspeccionDrenajesReporteService,
        InspeccionMargenesReporteService,
        InspeccionBachesReporteService,
        JhiMetricsService,

        IndiceCumplimientoReporteService
    ) {

        var vm = this;
        vm.isLoading=false;
        vm.fromDate = null;
        vm.toDate = null;
        vm.dateFormat = 'yyyy-MM';
        vm.pickerOptions_month = {
            datepickerMode: 'month',
            minMode: 'month',
            maxMode: 'month'
        };
        vm.totalIndicePonderadoContrato=0;
        vm.totalIndicePonderadoMes=0;
        vm.totalIndiceCumplimientoFinal=0;
        vm.PDFObject=null;
        vm.downloadingPDF=false;

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.fromDate = false;
        vm.datePickerOpenStatus.toDate = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };

        vm.onChangeDate = onChangeDate;
        vm.downloadAsPdf=downloadAsPdf;

        vm.selectedDate = new Date();

        vm.indicesCumplimiento = [];
        onChangeDate();

        function getDates(selectedDate) {

            vm.auxDate = new Date(vm.selectedDate);

            vm.fromDate = new Date(vm.auxDate.setDate(1));
            vm.toDate = new Date(vm.auxDate.setMonth(vm.auxDate.getMonth() + 1));
            vm.toDate = new Date(vm.toDate.setDate(vm.toDate.getDate() - 1));

            var dates = {
                fromDate: vm.fromDate,
                toDate: vm.toDate
            };

            return dates;
        }


        function onChangeDate() {
            vm.isLoading=true;
            var auxDate = getDates(); 

            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(auxDate.fromDate, dateFormat);
            var toDate = $filter('date')(auxDate.toDate, dateFormat);

            var indicesCumplimiento = [
                new ReportMantenimientoRequestModel(InspeccionBachesReporteService),
                new ReportMantenimientoRequestModel(InspeccionDesportillamientosReporteService),
                new ReportMantenimientoRequestModel(InspeccionMargenesReporteService),
                new ReportMantenimientoRequestModel(InspeccionDrenajesReporteService),
                new ReportMantenimientoRequestModel(InspeccionSenalizacionVerticalReporteService),
                new ReportMantenimientoRequestModel(InspeccionSenalizacionHorizontalReporteService),
                new ReportMantenimientoRequestModel(InspeccionBarrerasReporteService),
                new ReportOperacionRequestModel(IndiceMortalidadReporteService),
                new ReportOperacionRequestModel(OcupacionCarrilesReporteService),
                new ReportOperacionRequestModel(ColaPeajesReporteService),
                new ReportIncidenteAccidenteRequestModel(TiempoAtencionIncidentesService),
                new ReportIncidenteAccidenteRequestModel(TiempoAtencionAccidentesService),
                new ReportDisponibilidadRequestModel(JhiMetricsService)
            ];
            vm.indicesCumplimiento = indicesCumplimiento;

            var promises = [];
            angular.forEach(indicesCumplimiento, function(indice) {
                var queryPromise = indice.query({
                    fromDate: fromDate,
                    toDate: toDate,
                    tipoReporte: 'CONCESION'
                });
                promises.push(queryPromise);
            });


            $q.all(promises).then(function(indicadoresReportData){
                indicesTotalesCalculos(indicadoresReportData);                
                makePDFObject(indicadoresReportData);                
                vm.isLoading=false;
            },function(e){
                vm.isLoading=false;
            });
            vm.indicesCumplimientoPromises = promises;
        }


        function indicesTotalesCalculos(indicadoresReportData){
            var totalIndicePonderadoContrato=0;
            var totalIndicePonderadoMes=0;
            angular.forEach(indicadoresReportData, function(indicadorReportData){
                if(indicadorReportData.criteriosAceptacion && indicadorReportData.criteriosAceptacion.ponderadoContrato){
                    var indicPonderadoContrato=parseFloat(indicadorReportData.criteriosAceptacion.ponderadoContrato);
                    totalIndicePonderadoContrato+=indicPonderadoContrato;
                }

                if(indicadorReportData.ponderado){
                    var indicPonderadoMes=parseFloat(indicadorReportData.ponderado);
                    totalIndicePonderadoMes+=indicPonderadoMes;
                }
            });
            vm.totalIndicePonderadoContrato=totalIndicePonderadoContrato;
            vm.totalIndicePonderadoMes=totalIndicePonderadoMes;


            var totalIndiceCumplimientoFinal=totalIndicePonderadoMes;
            if(totalIndicePonderadoMes>1) {
                totalIndiceCumplimientoFinal=1;
            }
            vm.totalIndiceCumplimientoFinal=totalIndiceCumplimientoFinal;
        }

        function makePDFObject(indicadoresReportData){

            var auxDate = getDates(); 

            var reportYear = $filter('date')(auxDate.toDate, 'yyyy');
            reportYear = parseInt(reportYear);
            var reportMonth = $filter('date')(auxDate.toDate, 'MM');

            var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            reportMonth=meses[parseInt(reportMonth)-1];

            var PDFObject={
                anho:reportYear,
                mes:reportMonth,
                indiceCumplimiento:parseFloat($filter('number')(vm.totalIndicePonderadoMes, 4)),
                detalle:{}
            };

            angular.forEach(indicadoresReportData, function(indicadorReportData){
                var nombreIndicador="";
                var valorIndicadorMensual=0;
                var valorPonderadoMensual=0;
                if(indicadorReportData.criteriosAceptacion && indicadorReportData.criteriosAceptacion.nombreBucket){
                    nombreIndicador=indicadorReportData.criteriosAceptacion.nombreBucket;
                }
                if(indicadorReportData.porcentajeCumplimiento){
                    valorIndicadorMensual=indicadorReportData.porcentajeCumplimiento / 100;
                    valorIndicadorMensual=parseFloat($filter('number')(valorIndicadorMensual, 5));
                }
                if(indicadorReportData.ponderado){
                    valorPonderadoMensual=parseFloat($filter('number')(indicadorReportData.ponderado, 2));
                }
                PDFObject.detalle[nombreIndicador]={
                    valorIndicadorMensual:valorIndicadorMensual,
                    valorPonderadoMensual:valorPonderadoMensual
                };
            });
            //console.log(PDFObject);
            vm.PDFObject=PDFObject;
        }

        


        function downloadAsPdf(){
            vm.downloadingPDF=true;
            if(!vm.PDFObject)
                return;
            IndiceCumplimientoReporteService.pdf(vm.PDFObject, function(result) {
                vm.downloadingPDF=false;
            });
        }
    }
})();

