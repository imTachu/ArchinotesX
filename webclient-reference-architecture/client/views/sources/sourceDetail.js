// suscripcion general a la colleccion de mongo, no es optimo!!!
// Meteor.subscribe('sources');

// para suscribirse de manera optima a la base de datos
Template.sourceDetail.onCreated(function(){

	var self = this;
	self.autorun(function(){
		self.subscribe('sources');
	});	
});

// para hacer la lista de las fuentes de datos en el template html
Template.sourceDetail.helpers({

	// lista de registros mongo que son de tipo excel
	sourceDetail: function(){
		var id = this.params.id;
		var answer = sourceDetail.findOne({_id:id});
		return answer;
	},
});