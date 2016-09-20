(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('EntityConfirmationController', EntityConfirmationController);

    EntityConfirmationController.$inject = ['$filter','$scope', '$rootScope', 'AlertService', '$stateParams', '$state', 'controllerConfig', 'Tramo', 'ENTITY_STATES' ,'ConfirmationControllerFactory'];

    function EntityConfirmationController($filter, $scope, $rootScope, AlertService, $stateParams, $state, controllerConfig, Tramo, ENTITY_STATES, ConfirmationControllerFactory) {
        // var vm = this;

        var customOptions = {
            entity: controllerConfig.getEntity(),
            entityService: controllerConfig.getEntityService(),
            entityName: controllerConfig.getEntityName()
        };

        var ConfirmationBaseController = ConfirmationControllerFactory.create($scope, customOptions);
        var confirmationBaseController = new ConfirmationBaseController();

        return confirmationBaseController;
    }
})();
