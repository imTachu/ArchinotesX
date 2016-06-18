/*
 Routing
*/

Router.configure({
    layoutTemplate: 'principal'
});

Router.route('/', {
    template: 'soluciones'
});

Router.route('/arZonas');
Router.route('/arZona');
Router.route('/arSubzonaVolum');
Router.route('/confDespliegue');
Router.route('/confFuentesDatos');