(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('KMAbscisaHelper', KMAbscisaHelper);

    function KMAbscisaHelper () {
        var KMAbsRegExp=new RegExp("^\\d{1,3}\\+\\d{1,3}$");
        var KILOMETRO_MAX=200;
        function isValidPattern(input){
            return KMAbsRegExp.test(input);
        }

        function getKmAbscisaObject(input){
            if(isValidPattern(input)){
                var values=input.split('+');
                var km=parseInt(values[0]);
                var abscisa=parseInt(values[1]);
                return {km:km, abscisa:abscisa};
            }
        }

        function convertKmAbscisaStringToMetters(input){
            var kmAb=getKmAbscisaObject(input);
            if(angular.isDefined(kmAb) && kmAb.km>=0 && kmAb.abscisa>=0){
                return kmAb.km*1000+kmAb.abscisa;
            }
        }
        return {
            KILOMETRO_MAX:KILOMETRO_MAX,
            pattern:KMAbsRegExp,
            isValidPattern:isValidPattern,
            getKmAbscisaObject:getKmAbscisaObject,
            convertKmAbscisaStringToMetters:convertKmAbscisaStringToMetters
        };
    }
})();
