(function () {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'DataMicroservice', '$interval', '$http'];

    function HomeController($scope, Principal, LoginService, $state, DataMicroservice, $interval, $http) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        getAccount();
        getDataMicroservices();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register() {
            $state.go('register');
        }

        function getDataMicroservices() {
            var aux = DataMicroservice.query({});

            aux.$promise.then(function (data) {
                vm.dataMicroservices = data;
                checkServiceState();
            });
        }

        function checkServiceState() {
            angular.forEach(vm.dataMicroservices, function (item, index) {
                $http.get(item.endpoint).then(function (response) {
                    item.ok = true;
                }, function (response) {
                    item.ok = false;
                    vm.notifyFallenMicroservice(item.name);
                });
            })
        }

        // $interval(checkServiceState, 30000);

        vm.notifyFallenMicroservice = function(name){
            $http({
                url: "/api/notify",
                dataType: "json",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    notifyTo: [573166537244],
                    microserviceName: name
                }
            }).then(function(result){

            }, function(err){
                console.log(err);
            });
        }

        angular.element(function () {
            angular.element("#typed").typed({
                stringsElement: angular.element('#typed-string'),
                typeSpeed: 70,
                backDelay: 800,
                loop: true,
                contentType: 'html',
                loopCount: false,
                callback: function () {
                    foo();
                },
                resetCallback: function () {
                    newTyped();
                }
            });
            angular.element(".reset").click(function () {
                angular.element("#typed").typed('reset');
            });
        });

        function newTyped() {
        }

        function foo() {
            // console.log("Callback");
        }
    }
})();
