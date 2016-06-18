// jsPlumb properties for microservices
var jsPropertiesMicroservice = {
  isSource: true,
  isTarget: false,
	anchor: 'RightMiddle',
	connectorStyle: { strokeStyle: '#666' }
};

// jsPlumb properties for services
var jsPropertiesService = {
  isSource: false,
  isTarget: true,
  maxConnections: 20,
	anchor: 'LeftMiddle',
	connectorStyle: { strokeStyle: '#666' }
};


// Tab type: service or microservice
var types = [	'ms', 's' ];

if (Meteor.isClient) {	
	/*++++++++++++++++++++++++++++
	++ Template vistaAsignacion ++
	++++++++++++++++++++++++++++*/
	Template.vistaAsignacion.onRendered(function() {
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

		  jsplumb.bind('connection', newAssignment);
		  //jsplumb.bind('beforeDetach', detachConnection);
		});

		// Add Endpoints
		addEndpointsServices();
		addEndpointsMicroservices();
		// Load status
		loadMicroservicesStatus();
		loadServicesStatus();
	});

	Template.vistaAsignacion.helpers({
		services: function () {	
			return RealServices.find({ status: /.*Up.*/ });
		}, 
		microservices: function () {
			return Microservices.find({ status: /.*Up.*/ });
		}
	});

	/*++++++++++++++++++++++++++++
	++ Template deployedService ++
	++++++++++++++++++++++++++++*/
	Template.deployedService.helpers({
		_id: function () {
			return this._id.valueOf();
		}
	});


	/*+++++++++++++++++++++++++++++++++
	++ Template deployedMicroservice ++
	+++++++++++++++++++++++++++++++++*/
	Template.deployedMicroservice.events({
		'mouseover .microservice-panel': function () {
			getConnectionForMicroservice(this._id);
			loadMicroservicesStatus();
		}
	});

}


/*++++++++++++++++++
++  UI functions  ++
++++++++++++++++++*/

function loadServicesStatus() {
  getConnections(function(connections) {    
  	RealServices.find({ status: /.*Up.*/ }).forEach(function(item) {
  		if(item.containerId) {
  			var connectionCache = connections[item.containerId];
  			loadStatus(item._id, connectionCache, types[1]);
  		}
  	});	
  });
}

function loadMicroservicesStatus() {
  getConnections(function(connections) {    
  	Microservices.find({ status: /.*Up.*/ }).forEach(function(item) {
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
++  UI jsPlumb functions  ++
++++++++++++++++++++++++++*/

function addEndpointsServices() {
	RealServices.find({ status: /.*Up.*/ }).forEach(function(item) {
		var id = item.serviceId + '-' + item._id.valueOf();
		addEndpoint(id, jsPropertiesService);
	});
}

function addEndpointsMicroservices() {
	Microservices.find({ status: /.*Up.*/ }).forEach(function(item) {
		var id = item.type + '-' + item._id;
		addEndpoint(id, jsPropertiesMicroservice);
	});
}

function addEndpoint(id, properties) {
	jsplumb.addEndpoint(id, {uuid: 'JP-' + id}, properties);
}

function getConnectionForMicroservice(microserviceId) {
  // Delete all connections
  deleteConnections(function(result) {
    // Get connections
    Microservices.find({_id: microserviceId}).forEach(function(item) {
    	if(item.assignedService) {
    		var idMicroservice;
    		idMicroservice = item.type + '-' + item._id;

    		var idService;
    		RealServices.find({ _id: new Meteor.Collection.ObjectID(item.assignedService) }).forEach(function(item) {
		  		idService = item.serviceId + '-' + item._id.valueOf();	
		  	});	

	    	jsplumb.unbind('connection');
				
	    	jsplumb.connect({
	        source: idMicroservice,
	        target: idService,
	        type: 'foo'
	      });

	      jsplumb.bind('connection', newAssignment); 
	  	}
    }); 
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

function newAssignment(info) {
  swal({ 
    title: "Hola!", 
    text: "Desea asignar e iniciar el micro-servicio?", 
    type: "warning",   
    showCancelButton: true,
    cancelButtonText: 'Cancelar',  
    confirmButtonColor: "#DD6B55",   
    confirmButtonText: "Si, Asignar!",   
    closeOnConfirm: false 
  }, function() {
  	var ms_containerId;
  	var s_containerId;

  	var splitMs = info.sourceId.split('-');
  	Microservices.find({ _id: splitMs[1] }).forEach(function(item) {
  		ms_containerId = item.containerId;
  	});	

  	var splitS = info.targetId.split('-');
  	RealServices.find({ _id: new Meteor.Collection.ObjectID(splitS[1]) }).forEach(function(item) {
  		s_containerId = item.containerId;
  	});	

    var urlStr = "http://" + confServiceManager.ip + ":" + confServiceManager.port + "/service/assignMicroservice";

    $.ajax({
      url: urlStr,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ 
        ms_containerId: ms_containerId, 
        s_containerId: s_containerId
      }), success: function(response) {
        swal("Asignación exitosa!", 
          "", "success");
        // Paint assignment status
        //addAssignmentStatus(info.sourceId, true);

        // Update service
      	RealServices.update(new Meteor.Collection.ObjectID(splitS[1]), {
          $set: {
            assignedMicroservices: [ splitMs[1] ] 
          }
        });
        // Update microservice
      	Microservices.update(splitMs[1], {
          $set: {
            assignedService: splitS[1] 
          }
        });
      }, failure: function(errMsg) {
        sweetAlert("Oops...", "Algo salió mal! " + errMsg, "error");
      } 
    }); 
  });
  
  return true;  
}