(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoSenalDeleteController',TipoSenalDeleteController);

    TipoSenalDeleteController.$inject = ['$uibModalInstance', 'entity', 'TipoSenal'];

    function TipoSenalDeleteController($uibModalInstance, entity, TipoSenal) {
        var vm = this;
        vm.tipoSenal = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            TipoSenal.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
