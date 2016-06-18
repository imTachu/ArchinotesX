// collecion mongo remota para las fuentes
// var MONGO_URL = "mongodb://mongodb.soalab.com:27017/local";
// var database = new MongoInternals.RemoteCollectionDriver(MONGO_URL); 
// Sources = new Mongo.Collection("sources", { _driver: database});
Sources = new Mongo.Collection("sources");

// permisos para la colleccion mongo --- CUANDO ESTA INSEGURO ESTO SE COMENTA!!!!!!!!!
// Sources.allow({

// 	// se permite insertar si el usuario esta registrado
// 	insert: function(userId, doc){

// 		return !!userId;
// 	},

// 	// si el usario esta registrado se permite editar
// 	update: function (userId, doc, fields, modifier){

// 		return !!userId;
// 	},

// 	// si el usuario esta registrado permite borrar registros en sources
// 	remove: function (userId, doc){

// 		return !!userId;
// 	}

// 	// si quiero que se pueda update y remove si se es el duenho del registro
// 	// en el esquema tengo que ingresar el campo 'owner' y darle autofill
// 	// (userId && doc.owner === userId)
// 	// despues del remove va: , fetch":['owner']
// });

// esquema para los campos/columnas o atributos de una fuente
FieldSchema  = new SimpleSchema({

	// nombre del campo
	name:{
		type: String,
		label: "Nombre",
		max: 50
	},

	// descripcion del campo
	description:{
		type: String,
		label: "Descripcion",
		max: 500,
		optional: true
	},

	// descripcion del campo
	type:{
		type: String,
		label: "Tipo",
		allowedValues: ["Undefined", "Number", "String", "Date", "Array", "Object"], 
		optional: true
	},

});

// esquema de datos para registros de tipo fuente dentro de la coleccion
SourceSchema = new SimpleSchema({

	// nombre del origen la fuente
	origin:{
		type: String,
		label: "Origen",
		max: 50
	},

	// tipo del microservicio, si es SQL o excel
	type:{
		type: String,
		label: "Tipo",
		allowedValues: ["sql", "excel"]
	},

	// fuente de datos para el microsercvicio
	source:{
		type: String,
		label: "Fuente",
		max: 50
	},

	// descripcion de la fuente
	description:{
		type: String,
		label: "Descripcion",
		max: 500,
		optional: true
	},

	// nombre en interfaz de la fuente
	nameui:{
		type: String,
		label: "Nombre",
		max: 50,
	},

	// campos o columnas de la fuente
	fields:{
		type: [FieldSchema],
		label: "Campos/Atributos",
		minCount: 1
	},

	// columna que funciona como id o index de la fuente
	sortby:{
		type: FieldSchema,
		label: "Campo/Atributo Principal",
		// allowedValues: fields
	}
});

// se pega el esquema a la coleccion mongo
Sources.attachSchema(SourceSchema);