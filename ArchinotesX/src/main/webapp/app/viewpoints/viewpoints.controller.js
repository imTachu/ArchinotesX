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
            getDataMicroservices();
        });
    }

    function getDataMicroservices() {
        var aux = MicroservicesByDS.get({id: $scope.myDS});
        aux.$promise.then(function (data) {
            vm.sqlMDatasources = [$scope.myDS];
            vm.dataMicroservices = data;
        });
    }


    $scope.updateByDataSource = function(dsSelected) {
      vm.sqlMDatasources = []
      var aux = MicroservicesByDS.get({id: dsSelected.id});
      aux.$promise.then(function (data) {
          vm.sqlMDatasources = [dsSelected];
          vm.dataMicroservices = data;
          $('#functional-container').empty();
          $('#assigment-container').empty();
      });
    }


    $scope.updateByTags = function(dsSelected) {
         debugger
      var aux = MicroservicesTags.get({tags: dsSelected});
      aux.$promise.then(function (data) {
          vm.dataMicroservices = data;
          var tmp = [];
          angular.forEach(data, function(val) {
            var valid = true;
            $.each(tmp, function( v ) {
              debugger
              if( this.id == val.sqlDatasource.id)
              {
                valid = false;
              }
            });

            if (valid) {
              this.push(val.sqlDatasource);
            }
          }, tmp);
          vm.sqlMDatasources = tmp;
          $('#functional-container').empty();
          $('#assigment-container').empty();
      });
    }


  }



})();
