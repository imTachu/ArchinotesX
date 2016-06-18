// codigo ejecutado dentro del servidor
if (Meteor.isServer === true) {

	// funcion al iniciar el servidor
	Meteor.startup(function() {
		
		// busqueda basica para mirar cuantos registros hay en la coleccion "sources"
		var registers = Sources.find();

		// si la coleccion no tiene datos
		if (registers.count() === 0) {

			// se carga un archivo de config json para inicializar la base de datos
			var initCollections = JSON.parse(Assets.getText('config/collections-init.json'));

			// registros de arranque para la coleccion apropiada
			var initSrc = initCollections['sources'];
			// console.log(initSrc);

			// inserto los registros del archivo init dentro la la coleccion
			for (var i = 0; i < initSrc.length; i++) {
				var tempSrc = initSrc[i];
				
				// se inserta un nuevo registro
				Sources.insert(tempSrc);
			};
		};
	});
};