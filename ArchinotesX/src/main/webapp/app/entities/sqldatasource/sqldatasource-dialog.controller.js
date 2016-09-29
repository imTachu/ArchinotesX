(function () {
    'use strict';
    angular
        .module('archinotesxApp')
        .controller('SQLDatasourceDialogController', SQLDatasourceDialogController);

    SQLDatasourceDialogController.$inject = ['EntityDialogControllerFactory', '$scope', 'entity', 'SQLDatasource', 'DateUtils'];

    function SQLDatasourceDialogController(EntityDialogControllerFactory, $scope, entity, SQLDatasource, DateUtils) {
        var EntityDialogController = EntityDialogControllerFactory.create($scope, SQLDatasource, entity);
        var TIPO_ACCIDENTE = {
            LATAS: 'Latas',
            HERIDOS: 'Heridos',
            MUERTOS: 'Muertos'
        };
        EntityDialogController.prototype = angular.extend(EntityDialogController.prototype, {

            postConstructor: function () {
                var vm = this;
            },
            initDatePickerFields: function () {
                var vm = this;
                vm.datePickerOpenStatus = {};
                vm.datePickerOpenStatus.fechaRecepcionLlamada = false;
                vm.datePickerOpenStatus.fechaLlegadaSenalizacion = false;
                vm.datePickerOpenStatus.fechaLlegadaAmbulancia = false;
                vm.datePickerOpenStatus.fechaLlegadaVehiculoApoyo = false;
                vm.datePickerOpenStatus.fechaLlegadaFinDespeje = false;
                vm.datePickerOpenStatus.fechaInicioCierreVia = false;
                vm.datePickerOpenStatus.fechaFinCierreVia = false;
            },
            startWatcherIfCanToSaveEntity: function () {

                var vm = this;
                $scope.$watchGroup([
                    'vm.sqldatasource.tipoDeSQLDatasource',
                    'vm.sqldatasource.tramoDeSQLDatasource',
                    'vm.sqldatasource.kilometro',
                    'vm.sqldatasource.abscisa',
                    'vm.sqldatasource.nombrePersonaQueReporta',
                    'vm.sqldatasource.telefonoPersonaQueReporta'
                ], function () {
                    vm.isInvalidToSave = false;
                    var entityForm = $scope.editForm;
                    if (!entityForm || entityForm.tipoDeSQLDatasource.$invalid ||
                        entityForm.tramoDeSQLDatasource.$invalid ||
                        entityForm.kilometro.$invalid ||
                        entityForm.abscisa.$invalid ||
                        entityForm.nombrePersonaQueReporta.$invalid ||
                        entityForm.telefonoPersonaQueReporta.$invalid
                    ) {
                        vm.isInvalidToSave = true;
                    }
                });
            },
            initCustomValidations: function () {

                var vm = this;
                $scope.$watchGroup(['vm.sqldatasource.fechaLlegadaSenalizacion', 'vm.sqldatasource.fechaLlegadaAmbulancia', 'vm.sqldatasource.fechaLlegadaVehiculoApoyo', 'vm.sqldatasource.fechaLlegadaFinDespeje'], function () {
                    var form = $scope.editForm;
                    if (vm.sqldatasource.id && form) {

                        var validateField = function (fieldName) {
                            var fechaRecepcionLlamada = entity.fechaRecepcionLlamada;
                            form[fieldName].$setValidity('invalidFechaRecepcion', true);
                            form[fieldName].$setValidity('fechaMenorAFechaRegistro', true);

                            if (!DateUtils.isValidDate(entity.fechaRecepcionLlamada)) {
                                form[fieldName].$setValidity('invalidFechaRecepcion', false);
                                return false;
                            }
                            else if (DateUtils.isValidDate(entity[fieldName]) && entity[fieldName] < fechaRecepcionLlamada) {

                                form[fieldName].$setValidity('fechaMenorAFechaRegistro', false);
                                return false;
                            }
                            return true;
                        };


                        var allDatesAreValid = validateField('fechaLlegadaSenalizacion');
                        allDatesAreValid = validateField('fechaLlegadaAmbulancia') && allDatesAreValid;
                        allDatesAreValid = validateField('fechaLlegadaVehiculoApoyo') && allDatesAreValid;
                        allDatesAreValid = validateField('fechaLlegadaFinDespeje') && allDatesAreValid;


                        form.fechaLlegadaFinDespeje.$setValidity('fechaDespejeNoEsMayor', true);
                        if (allDatesAreValid &&
                            (
                                entity.fechaLlegadaFinDespeje < entity.fechaLlegadaSenalizacion ||
                                entity.fechaLlegadaFinDespeje < entity.fechaLlegadaAmbulancia ||
                                entity.fechaLlegadaFinDespeje < entity.fechaLlegadaVehiculoApoyo
                            )) {
                            form.fechaLlegadaFinDespeje.$setValidity('fechaDespejeNoEsMayor', false);
                        }

                    }
                });
            }
        });

        var controller = new EntityDialogController({
            entityName: "sqldatasource",
            withFinalizeState: true
        });
        return controller;
    }
})();

