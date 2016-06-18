if (Meteor.isClient) {  

	Template.arZonas.onRendered(function() {
		Session.set({ zoneId: null });
		Session.set({ subzoneId: null });
	});

	Template.arZonas.events({
		// Zona Presentación
		'click .znPresentacion': function() {
			Session.set({ zoneId: 'znPresentacion' });
		},
		'click .subznPortal': function() {
			Session.set({ zoneId: 'znPresentacion' });
			Session.set({ subzoneId: 'subznPortal' });
		},
		'click .subznMovilidad': function() {
			Session.set({ zoneId: 'znPresentacion' });
			Session.set({ subzoneId: 'subznMovilidad' });
		},
		// Zona Apolo
		'click .znApolo': function() {
			Session.set({ zoneId: 'znApolo' });
		},
		'click .subznVolumetricos': function() {
			Session.set({ zoneId: 'znApolo' });
			Session.set({ subzoneId: 'subznVolumetricos' });
		},
		'click .subznOperacionales': function() {
			Session.set({ zoneId: 'znApolo' });
			Session.set({ subzoneId: 'subznOperacionales' });
		},
		'click .subznFacilidades': function() {
			Session.set({ zoneId: 'znApolo' });
			Session.set({ subzoneId: 'subznFacilidades' });
		},
		'click .subznMantenimiento': function() {
			Session.set({ zoneId: 'znApolo' });
			Session.set({ subzoneId: 'subznMantenimiento' });
		},
		'click .subznOptimizacion': function() {
			Session.set({ zoneId: 'znApolo' });
			Session.set({ subzoneId: 'subznOptimizacion' });
		},
		'click .subznDiseño': function() {
			Session.set({ zoneId: 'znApolo' });
			Session.set({ subzoneId: 'subznDiseño' });
		},
		// Zona Geociencias
		'click .znGeociencias': function() {
			Session.set({ zoneId: 'znGeociencias' });
		},
		'click .subznPerforacion': function() {
			Session.set({ zoneId: 'znGeociencias' });
			Session.set({ subzoneId: 'subznPerforacion' });
		},
		'click .subznGenerales': function() {
			Session.set({ zoneId: 'znGeociencias' });
			Session.set({ subzoneId: 'subznGenerales' });
		},
		// Zona Laboratorio
		'click .znLaboratorio': function() {
			Session.set({ zoneId: 'znLaboratorio' });
		},
		// Zona GAIA
		'click .znGAIA': function() {
			Session.set({ zoneId: 'znGAIA' });
		},
		// Zona Logistica
		'click .znLogistica': function() {
			Session.set({ zoneId: 'znLogistica' });
		},
		// Zona Calidad
		'click .znCalidad': function() {
			Session.set({ zoneId: 'znCalidad' });
		},
		// Zona Ingeniería
		'click .znIngenieria': function() {
			Session.set({ zoneId: 'znIngenieria' });
		},
		// Zona Tiempo
		'click .znTiempo': function() {
			Session.set({ zoneId: 'znTiempo' });
		},
		// Zona Transporte
		'click .znTransporte': function() {
			Session.set({ zoneId: 'znTransporte' });
		},
		// Zona Procesos
		'click .znAutProcesos': function() {
			Session.set({ zoneId: 'znAutProcesos' });
		},
		'click .subznDocumental': function() {
			Session.set({ zoneId: 'znAutProcesos' });
			Session.set({ subzoneId: 'subznDocumental' });
		},
		'click .subznProyectos': function() {
			Session.set({ zoneId: 'znAutProcesos' });
			Session.set({ subzoneId: 'subznProyectos' });
		},
		'click .subznBPM': function() {
			Session.set({ zoneId: 'znAutProcesos' });
			Session.set({ subzoneId: 'subznBPM' });
		},
		// Zona Soporte
		'click .znSoporte': function() {
			Session.set({ zoneId: 'znSoporte' });
		},
		'click .subznFinancieros': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznFinancieros' });
		},
		'click .subznReportes': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznReportes' });
		},
		'click .subznRRHH': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznRRHH' });
		},
		'click .subznJuridicos': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznJuridicos' });
		},
		'click .subznRiesgo': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznRiesgo' });
		},
		'click .subznMensajeria': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznMensajeria' });
		},
		'click .subznClienteSocios': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznClienteSocios' });
		},
		'click .subznArchivoFisico': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznArchivoFisico' });
		},
		'click .subznAmbientales': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznAmbientales' });
		},
		'click .subznHSEQ': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznHSEQ' });
		},
		'click .subznSeguridad': function() {
			Session.set({ zoneId: 'znSoporte' });
			Session.set({ subzoneId: 'subznSeguridad' });
		},
		// Zona Datos
		'click .znDatos': function() {
			Session.set({ zoneId: 'znDatos' });
		}
	});
}
