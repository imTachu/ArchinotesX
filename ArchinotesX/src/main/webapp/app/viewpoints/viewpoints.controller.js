(function () {
  'use strict';

  angular
    .module('archinotesxApp')
    .controller('ViewpointsController', ViewpointsController);

  ViewpointsController.$inject = ['$scope', 'Principal', 'DataMicroservice', 'MicroservicesByDS', 'MicroservicesTags', '$state', 'SQLDatasource', '$interval', '$http'];

  function ViewpointsController($scope, Principal, DataMicroservice, MicroservicesByDS, MicroservicesTags, $state, SQLDatasource, $interval, $http) {
    var vm = this;

    getTags();
    function getTags() {
        var aux = MicroservicesTags.query({});
        aux.$promise.then(function (data) {
            $scope.msTags = data;
        });
    }

    getDataSources();
    // getDataSourceMicroservices();
    // vm.getDataSources = getDataSources;
    $scope.myDS = 1;

    function getDataSources() {
        var aux = SQLDatasource.query({});
        aux.$promise.then(function (data) {
            vm.sqldatasources = data;
            $scope.myDS = data[0];
        });
    }


    getDataMicroservices();
    function getDataMicroservices() {
        var aux = MicroservicesByDS.get({id: $scope.myDS});
        aux.$promise.then(function (data) {
            vm.sqlMDatasources = [$scope.myDS];
            vm.dataMicroservices = data;
        });
    }

    $scope.updateByDataSource = function(dsSelected) {
      var aux = MicroservicesByDS.get({id: dsSelected.id});
      aux.$promise.then(function (data) {
          vm.sqlMDatasources = [dsSelected];
          vm.dataMicroservices = data;
      });
    }


    $scope.updateByTags = function(dsSelected) {
      var aux = MicroservicesTags.get({tags: dsSelected});
      aux.$promise.then(function (data) {
          vm.dataMicroservices = data;
          vm.sqlMDatasources = [];
          angular.forEach(data, function(val) {
            if (this.indexOf(val.sqlDatasource) == -1) {
                this.push(val.sqlDatasource);
            }
          }, vm.sqlMDatasources);
      });
    }


  }



})();
