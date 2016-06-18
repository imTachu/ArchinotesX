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

// Tab type: service or microservice
var types = [	'ms', 's' ];

// Source type: excel or sql
var sourceTypes = [	'excel', 'sql' ];

// Add microservices endpoints 
var addEnpoints = true;

// Time out for render jsPlumb endpoints
var timeout = 200;

if (Meteor.isClient) {
	Template.vistaDespliegue.onCreated(function() {
		Session.set({ 'type': sourceTypes[0] });
	});


	/*++++++++++++++++++++++++++++
	++ Template vistaDespliegue ++
	++++++++++++++++++++++++++++*/
	Template.vistaDespliegue.onRendered(function() {
		// Load new jsplumb instance
		jsPlumb.ready(function() {
			jsplumb = jsPlumb.getInstance({
		    Connector: [ 'Bezier', { curviness: 80 } ],
		    Anchors: [ 'RightMiddle', 'LeftMiddle' ],
		    Endpoint: [ 'Dot', { radius: 4 } ],
		    Container: document.getElementById('container')
		  });

			jsplumb.registerConnectionTypes({
        'foo': { paintStyle: { strokeStyle: 'black', lineWidth: 0.7 } }
      });

		  jsplumb.bind('connection', newConnection);
		  //jsplumb.bind('beforeDetach', detachConnection);
		});

		// Add Endpoints
		addEndpointsMicroservices();
		addEndpointsMachines(types[0]);
		// Load status
		loadMicroservicesStatus();
		loadServicesStatus();

	});

	Template.vistaDespliegue.helpers({
		services: function () {	
			return RealServices.find({});
		}, 
		microservices: function () {
			return Microservices.find({});
		},
		microservicesMachines: function () {
			return Machines.find({ type: types[0] });
		},
		servicesMachines: function () {
			return Machines.find({ type: types[1] });
		},
		sources: function () {
			return Sources.find({ type: Session.get('type') });
		}
	});

	Template.vistaDespliegue.events({
		'click .new-microservice': function () {
			$('#newMicroservicePopUp').modal('hide');
			var selectedSource = Session.get('selected_source');
			var microserviceId = 'MS-' + selectedSource.nameui.toUpperCase();
			
			// Create a new microservice
      var id = Microservices.insert({
      	microserviceId: microserviceId,
        name: selectedSource.nameui,
        type: selectedSource.type,
        createDate: new Date(),
        status: 'Undeployed'
      });
			
      addEndpoint(selectedSource.type + '-' + id, jsProperties);
		},

		'click .microservices-tab': function () {
			document.getElementById('add-ms').disabled = false;
			
			Meteor.setTimeout(function() {
				showEndpoints(types[0]);
			}, timeout);
		},

		'click .services-tab': function () {
			document.getElementById('add-ms').disabled = true;			
			
			// Add microservices endpoints for the first time
			if(addEnpoints) {

				Meteor.setTimeout(function() {
					addEndpointsMachines(types[1]);
				}, timeout);
				
				Meteor.setTimeout(function() {
					addEndpointsServices();
				}, timeout);

				loadServicesStatus();
				addEnpoints = false;
			}
			
			Meteor.setTimeout(function() {
				showEndpoints(types[1]);
			}, timeout);		
		},

		'change .select-sources': function (event) {
			if(document.getElementById('sources').value == 'Archivo Excel') {
				Session.set({ 'type': sourceTypes[0] });
			} else {
				Session.set({ 'type': sourceTypes[1] });
			}

			document.getElementById('newMicroserviceButton').disabled = true;
		}
	});


	/*+++++++++++++++++++++++++
	++ Template microservice ++
	+++++++++++++++++++++++++*/
	Template.microservice.helpers({
		excel: function () {
			if(this.type == sourceTypes[0]) {
				return true;
			} else {
				return false;
			}
		}
	});

	Template.microservice.events({
		'mouseover .microservice-panel': function () {
			getConnectionForMicroservice(this._id);
			loadMicroservicesStatus();
		},	
		
		'click .removeMicroservice': function () {
      Microservices.remove(this._id);
    }
	});


	/*++++++++++++++++++++++++
	++ Template realService ++
	++++++++++++++++++++++++*/
	Template.realService.helpers({
		_id: function () {
			return this._id.valueOf();
		}
	});

	Template.realService.events({
		'mouseover .service-panel': function () {
			getConnectionForService(this._id);
			loadServicesStatus();
		}	
	});


	/*+++++++++++++++++++
	++ Template source ++
	+++++++++++++++++++*/
	Template.source.events({
  	'click .toggle-checked': function () {
    	var checkboxId = 'CH-' + this.source + '-' + this.type;
    	Sources.find({ type: Session.get('type') }).forEach(function(item) {
    		
    		var checkboxIdAux = 'CH-' + item.source + '-' + item.type;
    		if(checkboxId != checkboxIdAux) {
    			
    			var checkbox = document.getElementById(checkboxIdAux);
    			checkbox.disabled = !checkbox.disabled;
    		}
    	});

    	var button = document.getElementById('newMicroserviceButton');
    	if(document.getElementById(checkboxId).checked) {
    		button.disabled = false;
    		Session.set({ 'selected_source': this });
    	} else {
    		button.disabled = true;
    	}	
    }
  });
}


/*++++++++++++++++++++++++++
++  UI jsPlumb functions  ++
++++++++++++++++++++++++++*/

// Add endpoints
function addEndpointsServices() {
	RealServices.find({}).forEach(function(item) {
		var id = item.serviceId + '-' + item._id.valueOf();
		addEndpoint(id, jsProperties);
	});
}

function addEndpointsMicroservices() {
	Microservices.find({}).forEach(function(item) {
		var id = item.type + '-' + item._id;
		addEndpoint(id, jsProperties);
	});
}

function addEndpointsMachines(type) {
	Machines.find({ type: type }).forEach(function(item) {
		addEndpoint(item.machineId, jsPropertiesMachine);
	});	
}

function addEndpoint(id, properties) {
	jsplumb.addEndpoint(id, {uuid: 'JP-' + id}, properties);
}

// Show and hide endpoints
function showEndpoints(type) {
	if(type == types[1]) {
		showEndpointsServices(true);
		showEndpointsMachines(true, types[1]);

		showEndpointsMicroservices(false);
		showEndpointsMachines(false, types[0]); 
	} else {
		showEndpointsMicroservices(true);
		showEndpointsMachines(true, types[0]); 

		showEndpointsServices(false);
		showEndpointsMachines(false, types[1]);
	}
}

function showEndpointsServices(show) {
	RealServices.find({}).forEach(function(item) {
		var id = item.serviceId + '-' + item._id.valueOf();
		jsplumb.selectEndpoints({ 
			element: document.getElementById(id)
		}).setVisible(show);
	});
}

function showEndpointsMicroservices(show) {
	Microservices.find({}).forEach(function(item) {
		var id = item.type + '-' + item._id;
		console.log(id);
		console.log(document.getElementById(id));
		jsplumb.selectEndpoints({ 
			element: document.getElementById(id) 
		}).setVisible(show); 
	});
}

function showEndpointsMachines(show, type) {
	Machines.find({ type: type }).forEach(function(item) {
		jsplumb.selectEndpoints({ 
			element: document.getElementById(item.machineId) 
		}).setVisible(show); 
	});
}

function deleteConnections(callback) {
  // Remove event beforeDetach listener
  //jsplumb.unbind('beforeDetach');
  // Delete all connections
  jsplumb.detachEveryConnection();
  // Add event beforeDetach listener
  //jsplumb.bind('beforeDetach', detachConnection);

  callback(true);
}

function getConnectionForMicroservice(microserviceId) {
  // Delete all connections
  deleteConnections(function(result) {
    // Get connections
    Microservices.find({_id: microserviceId}).forEach(function(item) {
    	if(item.nodeId) {
	    	jsplumb.unbind('connection');
				
				var id = item.type + '-' + item._id;	
	    	jsplumb.connect({
	        source: id,
	        target: item.nodeId,
	        type: 'foo'
	      });

	      jsplumb.bind('connection', newConnection); 
	  	}
    }); 
  });  
}

function getConnectionForService(serviceId) {
  // Delete all connections
  deleteConnections(function(result) {
    // Get connections
    RealServices.find({ _id: serviceId }).forEach(function(item) {
    	if(item.nodeId) {
	    	jsplumb.unbind('connection');
				
				var id = item.serviceId + '-' + item._id;	
	    	jsplumb.connect({
	        source: id,
	        target: item.nodeId,
	        type: 'foo'
	      });

	      jsplumb.bind('connection', newConnection); 
	  	}
    }); 
  });  
}


/*++++++++++++++++++
++  UI functions  ++
++++++++++++++++++*/

function loadServicesStatus() {
  getConnections(function(connections) {    
  	RealServices.find({}).forEach(function(item) {
  		if(item.containerId) {
  			var connectionCache = connections[item.containerId];
  			loadStatus(item._id, connectionCache, types[1]);
  		}
  	});	
  });
}

function loadMicroservicesStatus() {
  getConnections(function(connections) {    
  	Microservices.find({}).forEach(function(item) {
  		if(item.containerId) {
  			var connectionCache = connections[item.containerId];
  			loadStatus(item._id, connectionCache, types[0]);
  		}
  	});	
  });
}

function loadStatus(id, connectionCache, type) {
  var status = connectionCache.status;
  var res = status.split(' ');
  var time = '';
  
  if(res[0] == 'Up') {
    for(var j = 1; j < res.length; j++) {
      time += res[j] + ' ';
    }
    showIconStatus(id, true);

  } else if(res[0] == 'Exited') {
    for(var k = 2; k < res.length; k++) {
      time += res[k] + ' ';
    }      
    showIconStatus(id, false);
  }

  if(type == types[0]) {
	  Microservices.update(id, {
	    $set: {
	      status: res[0] + ' ' + time
	    }
	  });
	} else {
		RealServices.update(id, {
	    $set: {
	      status: res[0] + ' ' + time
	    }
	  });
	}
}

function showIconStatus(id, up) {
	if(up) {
 		document.getElementById('AI-' + id).hidden = false;
 	 	document.getElementById('I-' + id).hidden = true;
 	} else {
 		document.getElementById('AI-' + id).hidden = true;
    document.getElementById('I-' + id).hidden = false;
 	}
}

/*++++++++++++++++++++++++++
++  Connection functions  ++
++++++++++++++++++++++++++*/

var confServiceManager = {
  //'ip': '192.168.33.10',
  // 'ip' : '54.84.166.197',
  'ip':'arqctrl.soalab.com',
  'port': 9000
};

function getConnections(callback) {
  var urlStr = 'http://' + confServiceManager.ip + ':' + confServiceManager.port + '/service/getDeployments';

  $.ajax({
    url: urlStr,
    type: 'POST',
    contentType: 'application/json',
    success: function(response) {
      callback(response.resultServiceManager);
    }, failure: function(errMsg) {
      return console.error(errMsg);
    } 
  });
}

// Manage new jsPlumb connection for services and microservices
function newConnection(info) {
  var split = info.sourceId.split('-');
  var microservice = false;

  if(split[0] == sourceTypes[0] || split[0] == sourceTypes[1]) {
  	microservice = true;
  }

  swal({ 
    title: 'Hola!', 
    text: 'Desea desplegar el servicio/microservicio en la máquina?', 
    type: 'warning',   
    showCancelButton: true,
    cancelButtonText: 'Cancelar',  
    confirmButtonColor: '#DD6B55',   
    confirmButtonText: 'Si, Desplegar!',   
    closeOnConfirm: false 
  }, function() {
    var urlStr = 'http://' + confServiceManager.ip + ':' + confServiceManager.port + '/service/create';

    $.ajax({
      url: urlStr,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ 
        serviceId: split[0], 
        nodeId: info.targetId
      }), success: function(response) {
        swal('Despliegue exitoso!', 
          'Container ID: ' + response.resultServiceManager.resultInitControl, 'success');

        	if(microservice) {
        		// Update microservice status
	        	Microservices.update(split[1], {
		          $set: {
		            containerId: response.resultServiceManager.resultInitControl, 
		            nodeId: info.targetId,
		            status: 'Up'
		          }
		        });
	        	// Paint microservice icon status
		       	showIconStatus(split[1], true);
	        
	        } else {
	        	// Update service status
	        	RealServices.update(new Meteor.Collection.ObjectID(split[1]), {
		          $set: {
		            containerId: response.resultServiceManager.resultInitControl, 
		            nodeId: info.targetId,
		            status: 'Up'
		          }
		        });
		        // Paint service icon status
		      	showIconStatus(split[1], true);
	        }

      }, failure: function(errMsg) {
        sweetAlert('Oops...', 'Algo salió mal! ' + errMsg, 'error');
      } 
    });
  });     
	
  return true; 
}
