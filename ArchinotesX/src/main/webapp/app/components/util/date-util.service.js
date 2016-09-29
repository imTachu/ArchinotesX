(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .factory('DateUtils', DateUtils);

    DateUtils.$inject = ['$filter'];

    function DateUtils ($filter) {

        var service = {
            convertDateTimeFromServer : convertDateTimeFromServer,
            convertLocalDateFromServer : convertLocalDateFromServer,
            convertLocalDateToServer : convertLocalDateToServer,
            dateformat : dateformat,
            extractDateWithoutTime:extractDateWithoutTime,
            isValidDate:isValidDate,
            dateDaysDiff:dateDaysDiff
        };

        return service;

        function convertDateTimeFromServer (date) {
            if (date) {
                return new Date(date);
            } else {
                return null;
            }
        }

        function convertLocalDateFromServer (date) {
            if (date) {
                var dateString = date.split('-');
                return new Date(dateString[0], dateString[1] - 1, dateString[2]);
            }
            return null;
        }

        function convertLocalDateToServer (date) {
            if (date) {
                return $filter('date')(date, 'yyyy-MM-dd');
            } else {
                return null;
            }
        }

        function dateformat () {
            return 'yyyy-MM-dd';
        }

        function extractDateWithoutTime(date){
            if(date && date instanceof Date){
                var extractedDate=new Date(date);
                extractedDate.setMilliseconds(0);
                extractedDate.setSeconds(0);
                extractedDate.setMinutes(0);
                extractedDate.setHours(0);
                return extractedDate;
            }
            return null;
        }

        function isValidDate(date){
            return date!==null && date instanceof Date;
        }

        function dateDaysDiff(firstDate, secondDate){
            var dateFormat = 'yyyy-MM-dd HH:mm:ss';
            if(angular.isString(firstDate)){
                firstDate = new Date($filter('date')(firstDate, dateFormat));
            }
            if(angular.isString(secondDate)){
                secondDate = new Date($filter('date')(secondDate, dateFormat));
            }
            if(angular.isDate(firstDate) && angular.isDate(secondDate)){
                secondDate=extractDateWithoutTime(secondDate);
                firstDate=extractDateWithoutTime(firstDate);
                return parseInt(Math.round((firstDate.getTime() - secondDate.getTime()) / (1000 * 60 * 60 * 24)));
            }
        }
    }

})();
