(function() {
    'use stric';

    angular
        .module('archinotesxApp')
        .controller('ModalConnectionController', ModalConnectionController);

    ModalConnectionController.$inject = ['$uibModalInstance'];

    function ModalConnectionController($uibModalInstance) {
        var vm = this;

        vm.clear = function (){
            $uibModalInstance.dismiss('ok');
        }
    }
})();