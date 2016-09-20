(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('DialogKMAbscisaValidationImplement', DialogKMAbscisaValidationImplement);

    DialogKMAbscisaValidationImplement.$inject = ['KMAbscisaHelper'];

    function DialogKMAbscisaValidationImplement (KMAbscisaHelper) {

        function implement(Controller){
            var tramo=null, tramoFieldName='';
            Controller.prototype.trackTramoToValidateKM=function(_tramoFieldName){
                tramoFieldName=_tramoFieldName;
            };
            Controller.prototype.setTramo=function(_tramo){
                tramo=_tramo;
            };
            Controller.prototype.addKmAbscisaValidation=function(kmFieldName, absFieldName){
                var $scope=this.getScope();
                var vm=this;
                var entity=vm.entity;
                var watchExpressions=['vm.entity.'+absFieldName, 'vm.entity.'+kmFieldName];
                if(tramoFieldName)
                    watchExpressions.push('vm.entity.'+tramoFieldName);
                $scope.$watchGroup(watchExpressions, function(){
                    var form=$scope.editForm;
                    if(form && form.$dirty){
                        var kmFormInput=form[kmFieldName];
                        kmFormInput.$setValidity('kilometroAbscisaInvalid', true);
                        kmFormInput.$setValidity('tramoDesconocido', true);
                        var km=entity[kmFieldName];
                        var abscisa=entity[absFieldName];
                        
                        if(angular.isNumber(km) && angular.isNumber(abscisa)){
                            var metros=_convertKMAbsToMetters(km+'+'+abscisa);
                            var tramoMaxMin=_getTramoMaxMin(tramo);
                            if(!tramo){
                                kmFormInput.$setValidity('tramoDesconocido', false);
                            }
                            else if(metros<tramoMaxMin.min || metros>tramoMaxMin.max){
                                kmFormInput.$setValidity('kilometroAbscisaInvalid', false);
                            }
                        }
                    }
                    
                });
            };

            Controller.prototype.onTramoChanged=function(){
                var vm=this;
                if(tramoFieldName)
                    this.setTramo(vm.entity[tramoFieldName]);
            };

            Controller.prototype.getTramo=function(){
                return tramo;
            };
        }
        
        function _getTramoMaxMin(tramo){
            var min=0, max=0;
            if(angular.isObject(tramo) && tramo.origen && tramo.destino){
                var origen=tramo.origen, destino=tramo.destino;
                var mettersOrigen=_convertKMAbsToMetters(origen);
                var mettersDestino=_convertKMAbsToMetters(destino);
                min=Math.min(mettersOrigen, mettersDestino);
                max=Math.max(mettersOrigen, mettersDestino);
            }
            return{
                min:min,
                max:max
            };
        }
        function _convertKMAbsToMetters(kmAbs){
            
            var converted=0;
            if(KMAbscisaHelper.isValidPattern(kmAbs)){
                converted=KMAbscisaHelper.convertKmAbscisaStringToMetters(kmAbs);
            }
            return converted;
        }

        return {
            implement:implement
        };
    }
})();
