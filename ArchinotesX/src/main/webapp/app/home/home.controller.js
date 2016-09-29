(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
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
            console.log("Callback");
        }
    }
})();
