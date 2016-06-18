if (Meteor.isClient) {  
	Template.subzone.events({
		'click .aSubzone': function() {
			Session.set({ subzoneId: this.subzoneId });
		}
	});

	Template.arZona.helpers({
		zones: function () {	
			var subzoneId = Session.get('subzoneId');
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
				
				zone.subzones = [];
				zone.services = [];
				zone.subzones[0] = subzone;
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