(function() {
    "use strict";
    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE
    angular.module("archinotesxApp")

    .constant("ENTITY_STATES", {
        FINISH_STATE: 'Finalizado',
        IN_PROGRESS: 'En Proceso',
        IN_VERIFICATION: 'A Revisar'
    })
    .constant("PERIOD", {
        WEEK: 'Semana',
        MONTH: 'Mes',
        SEMESTER: 'Semestre',
        YEAR: 'Año'
    })
    .constant("PERIOD_AUX", {
        YEAR: 'ANHO'
    })
    .constant("INSPECTION_STATES_STATUSES", {
        INSPECTION: {
            label:'Inspección'
        },
        VERIFICATION: {
            label:'Verificación'
        }
    })
    .constant("TIPOS_ESTRUCTURAS_HIDRAULICAS", {
        ALCANTARILLA: {
            label:'Alcantarilla',
            tieneMargen:false
        },
        BOX: {
            label:'Box',
            tieneMargen:false
        },
        CUNETA_CIRCULAR: {
            label:'Cuneta circular',
            tieneMargen:true
        },
        CUNETA_TRIANGULAR: {
            label:'Cuneta triangular',
            tieneMargen:true
        },
        CUNETA_TRAPEZOIDAL: {
            label:'Cuneta trapezoidal',
            tieneMargen:true
        }
    });
})();
