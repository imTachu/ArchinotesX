(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('JhiMetricsMonitoringController', JhiMetricsMonitoringController);

    JhiMetricsMonitoringController.$inject = ['$scope', 'JhiMetricsService', '$uibModal', 'PERIOD', 'PERIOD_AUX'];

    function JhiMetricsMonitoringController($scope, JhiMetricsService, $uibModal, PERIOD, PERIOD_AUX) {
        var vm = this;

        vm.cachesStats = {};
        vm.metrics = {};
        vm.refresh = refresh;
        vm.refreshThreadDumpData = refreshThreadDumpData;
        vm.getServerStatus = getServerStatus;
        vm.servicesStats = {};
        vm.updatingMetrics = true;
        vm.periodOptions = [PERIOD.WEEK, PERIOD.MONTH, PERIOD.SEMESTER, PERIOD.YEAR];
        vm.auxStatus = {};
        vm.period = vm.periodOptions[0];
        vm.dates = [];
        vm.outMinutes = [];
        vm.errNum = [];

        vm.refresh();
        vm.getServerStatus();

        $scope.$watch('vm.metrics', function(newValue) {
            vm.servicesStats = {};
            vm.cachesStats = {};
            angular.forEach(newValue.timers, function(value, key) {
                if (key.indexOf('web.rest') !== -1 || key.indexOf('service') !== -1) {
                    vm.servicesStats[key] = value;
                }
                if (key.indexOf('net.sf.ehcache.Cache') !== -1) {
                    // remove gets or puts
                    var index = key.lastIndexOf('.');
                    var newKey = key.substr(0, index);

                    // Keep the name of the domain
                    index = newKey.lastIndexOf('.');
                    vm.cachesStats[newKey] = {
                        'name': newKey.substr(index + 1),
                        'value': value
                    };
                }
            });
        });

        function refresh() {
            vm.updatingMetrics = true;
            JhiMetricsService.getMetrics().then(function(promise) {
                vm.metrics = promise;
                vm.updatingMetrics = false;
            }, function(promise) {
                vm.metrics = promise.data;
                vm.updatingMetrics = false;
            });
        }

        function refreshThreadDumpData() {
            JhiMetricsService.threadDump().then(function(data) {
                $uibModal.open({
                    templateUrl: 'app/admin/metrics/metrics.modal.html',
                    controller: 'JhiMetricsMonitoringModalController',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        threadDump: function() {
                            return data;
                        }

                    }
                });
            });
        }

        function getServerStatus() {
            if(vm.period === "Año"){ vm.period = PERIOD_AUX.YEAR; }
            var period = vm.period.toUpperCase();
            JhiMetricsService.serverStatus(period).then(function(promise) {
                vm.auxStatus = promise;
                fillData(vm.auxStatus);
            }, function(promise) {
                vm.auxStatus = promise.data;
            });
        }


        function fillData(aux) {
            vm.dataPie = {
                datasets: [{
                    label: "Disponibilidad",
                    data: [
                        100 - parseInt(aux.totalDisponibilidad),
                        parseInt(aux.totalDisponibilidad)
                    ],
                    backgroundColor: [
                        "rgba(247,70,74,.8)",
                        "rgba(123,219,124,.8)"
                    ],
                    segmentShowStroke: false,
                    borderWidth: 1
                }],
                labels: [
                    "Total",
                    "Disponibilidad"
                ]
            };

            for(var i=0; i < aux.eventos.length ; i++){
                vm.dates[i] = aux.eventos[i].fecha;
                vm.errNum[i] = aux.eventos[i].numeroErrores;
                vm.outMinutes[i] = aux.eventos[i].minutosFueraDeServicio;
            }
            
            vm.dataBar = {
                labels: vm.dates,
                datasets: [{
                    label: 'Errores',
                    backgroundColor: 'rgba(247,70,74,.8)',
                    data: vm.errNum
                }, {
                    label: 'Minútos Fuera de servicio',
                    backgroundColor: 'rgba(247,170,74,.8)',
                    data: vm.outMinutes
                }]
            };
        }

        vm.optionsPie = {
            cutoutPercentage: 25,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var result = [];
                        var datasetIndex;
                        for (datasetIndex = 0; datasetIndex < data.datasets.length; datasetIndex++) {
                            result.push(data.datasets[datasetIndex].label + ' : ' + data.datasets[datasetIndex].data[tooltipItem.index] + '% ');
                        }
                        return result;
                    }
                }
            }
        };


    }
})();
