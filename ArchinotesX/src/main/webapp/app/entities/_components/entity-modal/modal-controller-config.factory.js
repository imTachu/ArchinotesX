(function() {
    'use strict';

    angular
        .module('siccApp')
        .factory('EntityModalControllerConfig', EntityModalControllerConfig);


    EntityModalControllerConfig.$inject = [];

    function EntityModalControllerConfig() {
        return ModalControllerConfig;

        function ModalControllerConfig(customEntity) {
            var entity = customEntity || '';

            this.getEntity = function() {
                if (!entity)
                    throw 'La entidad no se ha especificado';
                return entity;
            };
        }
    }
})();
