(function () {
  'use strict';

  angular
    .module('archinotesxApp')
    .controller('ViewpointsController', ViewpointsController);

  ViewpointsController.$inject = ['$scope', 'Principal', 'DataMicroservice', '$state', 'SQLDatasource', '$interval', '$http'];

  function ViewpointsController($scope, Principal, DataMicroservice, $state, SQLDatasource, $interval, $http) {
    var vm = this;
    getDataMicroservices();
    getDataSources();
    // vm.getDataSources = getDataSources;
    function getDataSources() {
        var aux = SQLDatasource.query({});
        aux.$promise.then(function (data) {
            vm.sqldatasources = data;
        });
    }

    function getDataMicroservices() {
        var aux = DataMicroservice.query({});
        aux.$promise.then(function (data) {
            vm.dataMicroservices = data;
        });
    }
  }

  // function drawLine () {
  //   debugger
  //     var directive = {
  //         restrict: 'E',
  //         scope:{
  //           msId: "@",
  //           dsId: "@"
  //         },
  //         replace:true,
  //         template:'<script>$("#container").line($("#ds-"{{ds-id}}), $("#ms-"{{ms-id}}), {color:"black", stroke:5, zindex:500});</script>'
  //     };
  //
  //     return directive;
  // }


})();
