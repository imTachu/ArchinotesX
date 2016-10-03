(function (){
    'use strict';
    
    angular
        .module('archinotesxApp')
        .directive('userInfoHeader', userInfoHeader);

    function userInfoHeader() {
        var directive = {
            restrict: 'E',
            scope: {
                'user': '='
            },
            replace: true,
            link: linkFunc,
            templateUrl: 'app/entities/_components/directives/user-header-info/user-header-info.html'
        };

        return directive;

        function linkFunc(scope, element) {
            scope.$watch('user', function(){
                if(scope.user){
                    scope.Name = scope.user.firstName +' '+scope.user.lastName;
                    scope.Rol = scope.user.authorities[0].substring(5).replace("_", " ");
                    scope.logo = 'content' + scope.user.companyLogo.substring(2);
                    scope.companyName = scope.user.companyName;
                    return;
                }
            });
        }
    }
})();