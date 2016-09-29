(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('EntityFileUploadController', EntityFileUploadController);

    EntityFileUploadController.$inject = ['$scope', '$uibModalInstance', 'Upload', 'controllerConfig'];

    function EntityFileUploadController ($scope, $uibModalInstance, Upload, controllerConfig) {
        var vm = this;
        

        vm.file = null;
        vm.errFile = null;
        vm.uploadFiles = uploadFiles;
        vm.fileSize = null;
        vm.uploading=false;
        var currentUpload=null;

        vm.allowedFileTypes=controllerConfig.getAllowedFileTypes();
        vm.allowedFileExtensions=controllerConfig.getAllowedExtensions();
        
        function uploadFiles (file, errFiles) {
            vm.uploadProgress=0;
            vm.uploadErrorMsg="";
            vm.uploading=true;
            vm.uploadCompleted=false;
            vm.uploadCanceled=false;
            vm.invalidFile=false;
            vm.mexFilesError=false;

            vm.file = file;
            vm.errFile = errFiles && errFiles[0];

            if(errFiles.length){
                vm.uploadErrorMsg="Error en la selección de archivos";

                for(var i in errFiles){
                    var errFile=errFiles[i];
                    if(errFile && errFile.$error && errFile.$error==='pattern'){
                        vm.invalidFile=true;
                    }
                    else if(errFile && errFile.$error && errFile.$error==='maxFiles'){
                        vm.mexFilesError=true;
                    }
                }
                vm.uploading=false;
            }
            if (file) {
                //console.log(file);
                currentUpload = Upload.upload({
                    url: controllerConfig.getHttpURL(),
                    data: controllerConfig.getHttpRequestParams(file),
                    method:controllerConfig.getHttpRequestMehod()
                });
                currentUpload.then(function (response) {
                    uploadSuccess(response.data);
                    vm.uploadCompleted=true;
                    vm.uploading=false;
                }, function (response) {
                    vm.uploadErrorMsg="Error en la subida de archivos";
                    /*if (response.status > 0)
                         vm.uploadErrorMsg +="(" + response.status + ': ' + response.data+")";*/
                    vm.uploading=false;
                }, function (evt) {
                    vm.uploadProgress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                        ////console.log(currentUpload, currentUpload.abort, vm.uploadProgress);
                });
                currentUpload.catch(function(){
                    vm.uploadErrorMsg="Error en la subida de archivos";
                    vm.uploading=false;
                });
            }
            else{
                vm.uploading=false;
            }
        }

        /*vm.cancelUpload=function(){
            if(currentUpload){
                currentUpload.abort();
                vm.uploading=false;
                vm.uploadCanceled=true;    
                currentUpload=null;
            }
        };*/
    

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };


        function uploadSuccess (result) {
            $scope.$emit(controllerConfig.getUploadSuccessEventName(), result);
        }

    }
})();
