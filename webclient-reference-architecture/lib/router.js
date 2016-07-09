/*
 Routing
*/

Router.configure({
    layoutTemplate: 'navbar-layout'
});

Router.route('/', {
    template: 'index'
});

Router.route('/arZona');
Router.route('/arZonas');
Router.route('/vistaDespliegue');

// lista de fuentes de datos
Router.route('/sources', function (){
	this.render('sources');
});

// link al detalle de la fuente de datos
Router.route('/sources/:id', {

	template: 'sourceDetail',
	data: function(){
		return Sources.findOne({ _id: this.params.id});
	}
});
Router.route('/vistaAsignacion');
