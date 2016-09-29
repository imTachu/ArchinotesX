(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EstadoEntityConfirmationController', EstadoEntityConfirmationController);

    EstadoEntityConfirmationController.$inject = ['$filter','$scope', '$rootScope', 'AlertService', '$stateParams', '$state', 'controllerConfig', 'Tramo', 'ENTITY_STATES', 'ConfirmationControllerFactory'];

    function EstadoEntityConfirmationController($filter, $scope, $rootScope, AlertService, $stateParams, $state, controllerConfig, Tramo, ENTITY_STATES, ConfirmationControllerFactory) {
        // var vm = this;

        var customOptions = {
            entity: controllerConfig.getEntity(),
            entityService: controllerConfig.getEntityService(),
            entityName: controllerConfig.getEntityName(),
            parentEntity: controllerConfig.getParentEntity()
        };

        var ConfirmationBaseController = ConfirmationControllerFactory.create($scope, customOptions);
        var confirmationBaseController = new ConfirmationBaseController();

        return confirmationBaseController;
    }
})();
