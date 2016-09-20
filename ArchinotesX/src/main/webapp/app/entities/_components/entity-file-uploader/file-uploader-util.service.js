(function () {
    'use strict';

    angular
        .module('siccApp')
        .factory('FileUploaderUtil', FileUploaderUtil);

    
    
    function FileUploaderUtil () {

        var service = {
            getAllowedMimeTypes:getAllowedMimeTypes,
            getAllowedExtensions:getAllowedExtensions,
            getAllowedTypesString:getAllowedTypesString,
            getAllowedExtensionsString:getAllowedExtensionsString
        };

        return service;
    }


    var ALLOWED_MIME_TYPES=[
        {
            type:'image/png',
            extensions:['.png']
        },
        {
            type:'image/jpeg',
            extensions:['.jpg','jpeg']
        },
        {
            type:'image/jpg', //Doesn't exist
            extensions:['.jpg']
        },
        {
            type:'image/gif',
            extensions:['.gif']
        },
        {
            type:'text/plain',
            extensions:['.txt']
        },
        {
            type:'text/csv',
            extensions:['.csv']
        },
        {
            type:'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            extensions:['.pptx']
        },
        {
            type:'application/vnd.ms-powerpoint',
            extensions:['.ppt']
        },
        {
            type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            extensions:['.docx']
        },
        {
            type:'application/msword',
            extensions:['.doc']
        },
        {
            type:'application/pdf',
            extensions:['.pdf']
        },
        {
            type:'application/vnd.ms-excel',
            extensions:['.xls']
        },
        {
            type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            extensions:['.xlsx']
        }
    ];

    var allowedMimeTypes;
    var allowedExtensions;
    function getAllowedMimeTypes(){
        if(!allowedMimeTypes){
            allowedMimeTypes = ALLOWED_MIME_TYPES.map(function(item){return item.type;});
            /*angular.forEach(ALLOWED_MIME_TYPES, function(value, key) {
                
              this.push(value.type);
            }, allowedMimeTypes);*/
        }
        return allowedMimeTypes;
    }

    function getAllowedExtensions(){
        if(!allowedExtensions){
            allowedExtensions = ALLOWED_MIME_TYPES.map(function(item){return item.extensions.join(',');});            
        }
        return allowedExtensions;
    }

    function getAllowedTypesString(){
        return getAllowedMimeTypes().join(',').concat(getAllowedExtensions().join(','));
    }

    function getAllowedExtensionsString(){
        return getAllowedExtensions().join(', ');
    }
})();
