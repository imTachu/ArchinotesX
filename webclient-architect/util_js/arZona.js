AR = new Mongo.Collection('ar');

if (Meteor.isClient) {  
	Template.subzone.events({
		'click .aSubzone': function() {
			Session.set({ subzoneId: this.subzoneId });
		}
	});

	Template.service.events({
		'click .toggle-checked': function () {
			var solution = Session.get('solution');
			var selectedServices = solution.selectedServices;
			
			if(!selectedServices) {
				selectedServices = {};
				solution['selectedServices'] = selectedServices;
			}  

			if(selectedServices[this.id]) {
				delete selectedServices[this.id];
				var connections = solution.connections;
				if(connections) {
					delete connections[this.id];
				}
			
			} else {
				selectedServices[this.id] = this.serviceName;
			}
			
			Session.set({ 'solution': solution }); 
		}
	});

	Template.arZona.helpers({
		zones: function () {	
			var subzoneId = Session.get('subzoneId');
			var selectedServices = Session.get('solution').selectedServices;
			var zones = [];

			if(subzoneId) {	
				AR.find({'subzones.subzoneId': subzoneId }).forEach(function(item) {
					zones[0] = item;
				});
				
				var zone = zones[0];
				var subzones = zone.subzones;
				var subzone;
				for (var i = 0; i < subzones.length; i++) {
					if(subzoneId == subzones[i].subzoneId) {
						subzone = subzones[i];
						break;
					} 
				}

				if(selectedServices) {
					setCheckedServices(subzone.services, selectedServices);
				}				
				zone.subzones = [];
				zone.services = [];
				zone.subzones[0] = subzone;
				return zones;
			
			} else if(selectedServices) {
				AR.find({zoneId: Session.get('zoneId')}).forEach(function(item) {
					zones[0] = item;
				});

				var zone = zones[0];
				
				if(zone.subzones) {
					var subzones = zone.subzones;
					for (var i = 0; i < subzones.length; i++) {
						setCheckedServices(subzones[i].services, selectedServices);
					}
				} else if(zone.services) {
					setCheckedServices(zone.services, selectedServices);
				}
				
				return zones;

			} else {
				return AR.find({zoneId: Session.get('zoneId')});
			}
		},

		name: function () {
			var zoneName;
			AR.find({ zoneId: Session.get('zoneId') }, { zoneName: 1 }).forEach(function(item) {
				zoneName = item.zoneName;
			});
			return zoneName;
		}
	});
}

function setCheckedServices(services, selectedServices) {
	for (var j = 0; j < services.length; j++) {			
		if(selectedServices[services[j].id]) {
			var service = services[j];
			service['checked'] = true;
		}
	}
}
