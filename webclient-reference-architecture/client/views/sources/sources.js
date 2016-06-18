// suscripcion general a la colleccion de mongo, no es optimo!!!
// Meteor.subscribe('sources');

// para suscribirse de manera optima a la base de datos --- CUANDO ESTO ESTA INSEGURO SE COMENTA!!!!
// Template.sources.onCreated(function(){

// 	var self = this;
// 	self.autorun(function(){
// 		self.subscribe('sources');
// 	});	
// });

// para hacer la lista de las fuentes de datos en el template html
Template.sources.helpers({

	// lista de registros mongo que son de tipo excel
	xlsxsources: function(){

		var answer = Sources.find({type:'excel'});
		return answer;
	},

	// lista de registros mongo que son de tipo sql
	sqlsources: function(){

		var answer = Sources.find({type:'sql'});
		return answer;
	}
});