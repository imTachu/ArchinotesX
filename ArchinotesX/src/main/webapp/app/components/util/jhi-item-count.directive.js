(function() {
    'use strict';

    var jhiItemCount = {
        template: '<div class="info">' +
                    'Mostrando página {{(($ctrl.page-1) * $ctrl.itemsPerPage)==0 ? 1:(($ctrl.page-1) * $ctrl.itemsPerPage)+1}} - ' +
                    '{{($ctrl.page * $ctrl.itemsPerPage) < $ctrl.queryCount ? ($ctrl.page * $ctrl.itemsPerPage) : $ctrl.queryCount}} ' +
                    'de {{$ctrl.queryCount}} registros.' +
                '</div>',
        bindings: {
            page: '<',
            queryCount: '<total'
        },
        controller: ['paginationConstants', '$scope', function(paginationConstants, $scope) {
            this.itemsPerPage = paginationConstants.itemsPerPage;
        }]
    };

    angular
        .module('siccApp')
        .component('jhiItemCount', jhiItemCount);
})();
