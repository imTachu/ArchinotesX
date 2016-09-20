(function() {
    'use strict';

    angular
        .module('siccApp')
        .directive('hasActiveStateChildLink', hasActiveStateChildLink);
    hasActiveStateChildLink.$inject=['$state', '$interpolate'];
    function hasActiveStateChildLink($state, $interpolate) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc($scope, $element, $attrs) {
            var activeClass = $interpolate($attrs.hasActiveStateChildLink || 'active', false)($scope);
            function updateActiveStatus(){
                var links=$element.find('[ui-sref]');
                var childStatesIncluded=false;
                for(var i=0; i< links.length;i++){
                    var link=links[i];
                    var stateString=angular.element(link).attr('ui-sref').replace(/[\(]+(.*)/,'');
                    var isIncludedState=$state.includes(stateString);
                    if(isIncludedState){
                        childStatesIncluded=true;
                        break;
                    }
                }
                if(childStatesIncluded){
                    if(!$element.hasClass(activeClass))
                        $element.addClass(activeClass);
                }
                else{
                    $element.removeClass(activeClass);
                }
            }
            updateActiveStatus();
            var onStateChangeListener=$scope.$on('$stateChangeSuccess', updateActiveStatus);
            $scope.$on('$destroy', function(){
                onStateChangeListener();
            });
        }
    }
})();
