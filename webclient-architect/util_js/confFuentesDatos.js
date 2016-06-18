var data_sources = [
	{ name: "Costos", type: "costs", keys: [ 
    { name: "CAMPO" }, { name: "POZO" }, { name: "BOPD" }, { name: "OPEX VARIABLE POZO" }, 
    { name: "OPEX FIJO POZO" } ] },
	{ name: "Energia", type: "energy", keys: [
    { name: "Pozo" }, { name: "Fecha" }, { name: "BOPD" }, { name: "Consumo" } ] },
  	{ name: "Producción", type: "production", keys: [
    { name: "POZO" }, {name: "FECHA" }, { name: "BFPD" }, { name: "BOPD" }, { name: "BWPD" }, { name: "BSW" } ] },
  	{ name: "Bombas", type: "pumps", keys: [
    { name: "POZO" }, { name: "Campo" }, { name: "Proveedor" }, { name: "FechaRun" }, { name: "FechaPull" }, 
    { name: "Causa" }, { name: "RunLife"} ] },
	{ name: "Pozos", type: "wells", keys: [
    { name: "UWI" }, { name: "ESTADO" }, { name: "TIPO_BOMBA" }, { name: "LATITUD" }, { name: "LONGITUD" }, 
    { name: "CLUSTER" } ] },
  	{ name: "Mediciones Pozo", type: "well-measurements", keys: [
    { name: "UWI" }, { name: "FECHA" }, { name: "THP" }, { name: "PIP" }, { name: "FRECUENCIA (RPM)" }, 
    { name: "POTENCIA"} ] },
  { name: "Pruebas Pozo", type: "well-tests", keys: [
    { name: "POZO" }, { name: "FECHA_INICIO" }, { name: "FECHA_FIN" }, { name: "DURACION" }, { name: "BFPD" }, 
    { name: "BOPD" }, { name: "BWPD" }, { name: "BSW" }, { name: "ESTADO" } ] },
	{ name: "Potencial Pozo", type: "well-potencial", keys: [
    { name: "POZO" }, { name: "FECHA" }, { name: "BFPD" }, { name: "BOPD" }, { name: "BWPD" }, { name: "BSW" } ] }
];

var source;
var clone;

if (Meteor.isClient) {
	// This code only runs on the client

	Template.confFuentesDatos.helpers({
		fuentes: function () {
      clone = null;
      clone = fnClone(data_sources);

      var selected_dataSources = Session.get('solution').selected_dataSources;
      if(selected_dataSources) {
        var keys = Object.keys(selected_dataSources);
        for(var i = 0; i < keys.length; i++) {
          
          selected_keys = selected_dataSources[keys[i]];
          for (var j = 0; j < selected_keys.length; j++) {
            setChecked(keys[i], selected_keys[j], true);
          }
        }
      }  
      
			return clone;
		}
	});		

	Template.campo.events({
    "click .toggle-checked": function () {
      var solution = Session.get('solution');
    	var selected_dataSources = solution.selected_dataSources;

      if(!selected_dataSources) {
        selected_dataSources = {};
        solution['selected_dataSources'] = selected_dataSources;
      }

      var data = selected_dataSources[source];
    	if(data) {
    		var insert = true;
    		for(var i = 0; i < data.length; i++) {
    			if(data[i] == this.name) {
    				data.splice(i, 1);
    				insert = false;

            //setChecked(source, this.name, false);
    				break;
    			}
    		}

    		if(insert) { 
    			data.push(this.name);
    		}

    	} else {
    		selected_dataSources[source] = [this.name];
    	}

      Session.set({ 'solution': solution });
    }
  });

  Template.fuente.events({
  	"click .collapsed": function () {
  		source = this.type;
  	}
  });

  Template.confFuentesDatos.events({
  	"click .enviar": function () {
      Session.set({ 'updateSolution': true }); 
      console.log(Session.get('solution'));   
      //swal("Configuración guardada con exito!", "", "success");
      /*
			var confJson = {};
			confJson["persist"] = "sol_01";
			confJson["extract"] = "coll_sol_01";
			confJson["sources"] = [selected_dataSources];
      sendConfData(confJson);
      */
      
      //swal("Configuración exitosa!", "", "success");
  	}
  });
}

function sendConfData(confJson) {

  /*
  var urlStr = "http://157.253.220.150:9000/service/init";

  $.ajax({
    url: urlStr,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ 
      settings: confJson, 
    }), success: function(response) {
      swal("Configuración exitosa!", "", "success");
    }, failure: function(errMsg) {
      sweetAlert("Oops...", "Algo salió mal! " + errMsg, "error");
    } 
  });
  */
}

function setChecked(type, keyName, checked) {
  for (var i = 0; i < clone.length; i++) {
    if(clone[i].type == type) {

      var keys = clone[i].keys;
      for (var j = 0; j < keys.length; j++) {
        
        key = keys[j];
        if(key.name == keyName) {
          key['checked'] = checked;
          return;
        }
      }  
    } 
  }  
}

function fnClone (obj) {
  return JSON.parse(JSON.stringify(obj));
}
