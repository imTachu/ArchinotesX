Solutions = new Mongo.Collection('solutions');

var solutions = [
  { name: 'Vista 360 Pozo', description: 'Solución para ver información grafica de pozos petroleros como bombas, producción, consumo de energia y costos de producción.', 
    createdAt: '23/12/88', state: 'Por definir', stateDate: '25/11/15', defined: false, deployed: false }
];

var states = [   
  'Solución en construcción', 
  'Solución lista para despliegue', 
  'Solución desplegada en desarrollo'
];

var confServiceManager = {
  //'ip': '192.168.33.10',
  'ip' : '54.84.166.197',
  'port': 9000
};


if (Meteor.isClient) {  
  Template.soluciones.onRendered(function() {
    if(Session.get('updateSolution')) {
      var solution = Session.get('solution');
      getCurrentDate(function(date) {
        Solutions.update(solution._id, {
          $set: {
            state: states[1], 
            stateDate: date,
            defined: true,
            selectedServices: solution.selectedServices,
            connections: solution.connections,
            selected_dataSources: solution.selected_dataSources 
          }
        });
      });

      swal("Configuración guardada con exito!", "", "success");
      Session.set({ 'updateSolution': false });
    }
  });

  Template.soluciones.helpers({
    solutions: function () {
      return Solutions.find({}, {sort: {createdAt: -1}});
    }
  });   
  
  Template.soluciones.events({
    'click .new-solution': function () {
      $('#newSolutionPopUp').modal('hide');
      var name = $('#solutionName').val();
      $('#solutionName').val('');
      var description = $('#solutionDescription').val();
      $('#solutionDescription').val('');
      
      // Create a new solution
      getCurrentDate(function(date) {
        Solutions.insert({
          name: name,
          description: description,
          createdAt: new Date(),
          state: states[0],
          stateDate: date
        });
      });
    }
  });

  Template.solution_card.helpers({
    services: function () {
      var selectedServices = this.selectedServices;
      var keys = Object.keys(selectedServices);
      
      var services = [];
      for (var i = 0; i < keys.length; i++) {
        var service = {};
        service['id'] = keys[i];
        service['name'] = selectedServices[keys[i]];
        services.push(service);
      };
      return services;
    }
  });

  Template.solution_card.events({
    'click .delete-solution': function () {
      Solutions.remove(this._id);
    },

    'click .edit-solution': function () {
      Solutions.find({_id: this._id}).forEach(function(item) {
        Session.set({ 'solution': item });
      });
    },
    'click .deploy-solution': function () {
      Solutions.find({_id: this._id}).forEach(function(item) {
        Session.set({ 'solution': item });
      });

      deploySolution();
    }
  });
}

function getCurrentDate(callback) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd
  } 
  if(mm<10){
    mm='0'+mm
  }

  var today = dd+'/'+mm+'/'+yyyy;
  callback(today);
}

function deploySolution() {
  swal({ 
    title: 'Hola!', 
    text: 'Desea desplegar la solución en desarrollo?', 
    type: 'warning',   
    showCancelButton: true,
    cancelButtonText: 'Cancelar',  
    confirmButtonColor: '#DD6B55',   
    confirmButtonText: 'Si, Desplegar!',   
    closeOnConfirm: false 
  
  }, function() {
    var urlStr = 'http://' + confServiceManager.ip + ':' + confServiceManager.port + '/service/create';
    var solution = Session.get('solution');

    var connections = solution.connections;
    if(connections) {
      var keys = Object.keys(solution.connections);
      for(var i = 0; i < keys.length; i++) {
        var split = keys[i].split('-');
        var serviceId = split[0] + split[1];
        var nodeId = connections[keys[i]];

        $.ajax({
          url: urlStr,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ 
            serviceId: serviceId, 
            nodeId: nodeId
          }), success: function(response) {  
            console.log(response.resultServiceManager.resultInitControl);
          }, failure: function(errMsg) {
            sweetAlert('Oops...', 'Algo salió mal! ' + errMsg, 'error');
          } 
        });
      }
    }

   getCurrentDate(function(date) {
      Solutions.update(solution._id, {
        $set: {
          state: states[2], 
          stateDate: date,
          deployed: true 
        }
      });
    });

    swal('Despliegue exitoso!', '', 'success');
  });    

}