(function (){
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('DeleteMicroserviceController', DeleteMicroserviceController);

    DeleteMicroserviceController.$inject = ['DataMicroservice', 'entity', '$uibModalInstance'];

    function DeleteMicroserviceController(DataMicroservice, entity, $uibModalInstance){
        var vm = this;
        vm.microservice = entity;

        vm.microserviceDelete = function(){
            DataMicroservice.delete({}).$promise.then(function(result){
                $uibModalInstance.close(result);
            });
        }

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
            console.log("cancelar");
        };
    }
})();
