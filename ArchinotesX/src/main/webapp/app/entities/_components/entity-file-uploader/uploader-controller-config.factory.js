(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('EntityFileUploadControllerConfig', EntityFileUploadControllerConfig);

    EntityFileUploadControllerConfig.$inject = ['FileUploaderUtil'];

    function EntityFileUploadControllerConfig (FileUploaderUtil) {
        return UploaderControllerConfig;
        function UploaderControllerConfig(customOptions){
            var defaultOptions={
                resourceURL: '',
                uploadSuccessEventName: '',
                httpRequestMethod:'POST',
                fileParamName:'archivo',
                requestParams:{}
            };
            var options=angular.extend(defaultOptions, customOptions || {});
            

            this.getHttpURL=function(){
                if(!options.resourceURL)
                    throw 'La URL no se ha especificado';
                return options.resourceURL;
            };
            this.getUploadSuccessEventName=function(){
                if(!options.uploadSuccessEventName)
                    throw 'El succss event name no se ha especificado';
                return options.uploadSuccessEventName;
            };
            this.getHttpRequestMehod=function(){
                return options.httpRequestMethod || 'POST';
            };

            this.getHttpRequestParams=function(file){
                options.requestParams[options.fileParamName]=file;
                return options.requestParams;
            };

            this.getAllowedFileTypes=function(){
                return FileUploaderUtil.getAllowedTypesString();
            };

            this.getAllowedExtensions=function(){
                return FileUploaderUtil.getAllowedExtensions().join(',');
            };

            this.setFileParamName=function(name){
                options.fileParamName=name;
            };
        }


        
    }
})();


