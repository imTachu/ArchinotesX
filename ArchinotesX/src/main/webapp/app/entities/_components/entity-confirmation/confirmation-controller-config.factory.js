(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('EntityConfirmationControllerConfig', EntityConfirmationControllerConfig);

    EntityConfirmationControllerConfig.$inject = [];

    function EntityConfirmationControllerConfig() {
        return ConfirmationControllerConfig;

        function ConfirmationControllerConfig(customOptions) {
            var defaultOptions = {
                entity: '',
                entityService: '',
                entityName: '',
                parentEntity: ''
            };

            var options = angular.extend(defaultOptions, customOptions || {});

            this.getEntity = function() {
                if (!options.entity)
                    throw "La entidad no se ha especificado";
                return options.entity;
            };

            this.getEntityService = function() {
                if (!options.entityService)
                    throw "El servicio no se ha especificado";
                return options.entityService;
            };

            this.getEntityName = function() {
                if (!options.entityName)
                    throw "EL nombre de la entidad no se ha especificado";
                return options.entityName;
            };

            this.getParentEntity = function() {
                if (!options.parentEntity)
                    throw "Entidad de inspección no se ha especificado";
                return options.parentEntity;
            };
        }
    }

})();
