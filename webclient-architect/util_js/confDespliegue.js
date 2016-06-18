Machines = new Mongo.Collection('machines');

// Tab type: service or microservice
var types = [	'ms', 's' ];

// jsPlumb properties for services
var jsProperties = {
  isSource: true,
  isTarget: false,
	anchor: 'RightMiddle',
	connectorStyle: { strokeStyle: '#666' }
};

// jsPlumb properties for machines
var jsPropertiesMachine = {
  isSource: false,
  isTarget: true,
  maxConnections: 20,
	anchor: 'LeftMiddle',
	connectorStyle: { strokeStyle: '#666' }
};

if (Meteor.isClient) {  
	
	Template.confDespliegue.onRendered(function() {
		jsPlumb.ready(function() {
			jsplumb = jsPlumb.getInstance({
		    Connector: [ 'Bezier', { curviness: 80 } ],
		    Anchors: [ 'RightMiddle', 'LeftMiddle' ],
		    Endpoint: [ 'Dot', { radius: 4 } ],
		    Container: document.getElementById("container")
		  });

			jsplumb.registerConnectionTypes({
        "foo": { paintStyle: { strokeStyle: "black", lineWidth: 0.5 } }
      });

		  jsplumb.bind("connection", newConnection);
		  jsplumb.bind("beforeDetach", detachConnection);
		});

		// Add Endpoints
		var selectedServices = Session.get('solution').selectedServices;
		if(selectedServices) {
			addEndpointServices(selectedServices);
		}
		addEndpointMachines();

		// Load Connections
		var connections = Session.get('solution').connections;
		if(connections) {
			loadConnections(connections);
		}
	});


	Template.confDespliegue.helpers({
		services: function () {	
			var selectedServices = Session.get('solution').selectedServices;
			var services = [];

			if(selectedServices) {
				var keys = Object.keys(selectedServices);
		    for(var i = 0; i < keys.length; i++) {
		    	var service = {};
		    	service['id'] = keys[i];
		    	service['name'] = selectedServices[keys[i]];
		    	services.push(service);
		    }
		 	}

	    return services;
		},

		machines: function () {
			return Machines.find({ type: types[1] });
		}	
	});

	Template.selectedService.events({
		"click .removeService": function () {
			var solution = Session.get('solution');
			var selectedServices = solution.selectedServices;

			delete selectedServices[this.id];
			var uuid = 'JP-' + this.id;
			jsplumb.deleteEndpoint(jsplumb.getEndpoint(uuid));

			Session.set({ 'solution': solution }); 
		}			
	});
}

function addEndpointServices(services) {
	var keys = Object.keys(services);
	for(var i = 0; i < keys.length; i++) {
		addEndpoint(keys[i], jsProperties);
	}
}

function addEndpointMachines() {
	Machines.find({ type: types[1] }).forEach(function(item) {
		addEndpoint(item.machineId, jsPropertiesMachine);
	});	
}

function addEndpoint(id, properties) {
	jsplumb.addEndpoint(id, {uuid: 'JP-' + id}, properties);
}

function newConnection(info) {
	var solution = Session.get('solution');
	var connections = solution.connections;

	if(!connections) {
		connections = {};
		solution['connections'] = connections;
	} 

	if(!connections[info.sourceId]) {
		connections[info.sourceId] = info.targetId;
		Session.set({ 'solution': solution }); 
	}
}

function detachConnection(info) {
	var solution = Session.get('solution');
	var connections = solution.connections;
	delete connections[info.sourceId];	
	Session.set({ 'solution': solution }); 

	return true;
}

function loadConnections(connections) {
	// Remove event connection listener
  jsplumb.unbind("connection");
  
  var keys = Object.keys(connections);
  for(var i = 0; i < keys.length; i++) {     
    jsplumb.connect({
      source: keys[i],
      target: connections[keys[i]],
      type: "foo"
    });
  } 
  // Add event connection listener
  jsplumb.bind("connection", newConnection); 
}