(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoVehiculoApoyoDeleteController',TipoVehiculoApoyoDeleteController);

    TipoVehiculoApoyoDeleteController.$inject = ['$uibModalInstance', 'entity', 'TipoVehiculoApoyo'];

    function TipoVehiculoApoyoDeleteController($uibModalInstance, entity, TipoVehiculoApoyo) {
        var vm = this;
        vm.tipoVehiculoApoyo = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            TipoVehiculoApoyo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
