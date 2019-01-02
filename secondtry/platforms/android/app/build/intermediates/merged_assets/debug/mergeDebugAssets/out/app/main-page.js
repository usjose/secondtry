

var Sqlite = require("nativescript-sqlite");

//var createViewModel = require("./main-view-model").createViewModel;
var createViewModel = require("~/main-view-model").createViewModel;
//var createViewModel = require("main-view-model").createViewModel;

//const frames = require("ui/frame");
var frames = require("tns-core-modules/ui/frame");

function onNavigatingTo (args) {
    
    var page = args.object;
   
    //console.log("*** Listo para crear Database ***");

    (new Sqlite("Pastos.db")).then(async function(db){

        // Pendiente: Crear el campo Contrasenia como un enmascarado de contraseñas


            await db.execSQL("CREATE TABLE IF NOT EXISTS Usuarios (IdUsuario TEXT PRIMARY KEY , NombreUsuario TEXT,TipoUsuario TEXT, Contrasenia TEXT, Nombre TEXT, Apellido TEXT, DateCreated TEXT, DateUpdated TEXT, IsSynced INTEGER)").then(id => {
            
                console.log("Tabla Usuarios Creada", id);


                    db.all("SELECT * FROM Usuarios").then(rows => {

                        for(var row in rows) {

                            usuario=rows[row][1];

                            console.log("usuario : ");
                            console.log(usuario);

                            db.execSQL("CREATE TABLE IF NOT EXISTS Permisos_"+ usuario +" (NombrePotrero TEXT, ConsultaPoblacion INTEGER, RegistroMovimientos INTEGER, ConsultaMovimientos INTEGER,  DateCreated TEXT, DateUpdated TEXT, Id_Registro TEXT PRIMARY KEY, IsSynced INTEGER)").then(id => {
                                
                                console.log("Una tabla permisos Usuario Creado", usuario, id);

                            }, error => {
                                console.log("CREATE TABLE Permisos_" + usuario + " ERROR", error);
                            }
                            );

                            console.log("RESULT", rows[row][1]);

                        }

                        
                    
                    }, error => {
                        console.log("SELECT ERROR", error);
                    });

                    console.log("Ya pasó la selección de Usuarios");
           
            }, error => {
                console.log("CREATE TABLE Usuarios ERROR", error);
            }
            );

            console.log("Ya pasó por Usuarios");
            

        }, error => {
            console.log("OPEN DB ERROR", error);
        }
    );

    console.log("*** Aquí ya debió pasar algo con la Database, o la creó o hubo error ***");

}

function onTapMovimientos(args){

    console.log("Entró a onTapMovimientos");
    var myTopMostFrame = frames.getFrameById("topmost");



    var page = args.object;

            var permisosSeleccionado = new Array();

            for(var pot = 0; pot < 15; pot++){

                permisosSeleccionado.push("Finca X","Potrero "+ pot, 0,1,(pot%2));

            }

            console.dir("permisosSeleccionado : ");
            console.dir(permisosSeleccionado);

            var navigationEntry = {

                moduleName: "frmedipermisos",
                context:permisosSeleccionado,
                transition: {
                    name: "slideLeft"
                }

            };

    console.log("Justo antes de rutear navigationEntry");
    console.dir(navigationEntry);

    console.log("Topmost: " + myTopMostFrame);
    //myTopMostFrame.navigate("error");


    frames.getFrameById("topmost").navigate(navigationEntry);
    


}

function onTapConsultas(args){

    var navigationEntry = {

        moduleName: "consultaspages/consultas-home",
        transition: {
            name: "slideLeft"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

function onTapPropietarios(args){

    var navigationEntry = {

        moduleName: "propietariospages/propietarios-home",
        transition: {
            name: "slideLeft"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

function onTapUsuarios(args){

    var navigationEntry = {

        moduleName: "usuariospages/usuarios-home",
        transition: {
            name: "slideLeft"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

function onTapPotreros(args){

    var navigationEntry = {

        moduleName: "potrerospages/potreros-home",
        transition: {
            name: "slideLeft"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

function onTapNotificaciones(args){

    var navigationEntry = {

        moduleName: "notificacionespages/notificaciones-home",
        transition: {
            name: "slideLeft"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

exports.onNavigatingTo = onNavigatingTo;
exports.onTapMovimientos = onTapMovimientos;
exports.onTapConsultas = onTapConsultas;

exports.onTapPropietarios = onTapPropietarios;
exports.onTapUsuarios = onTapUsuarios;
exports.onTapPotreros = onTapPotreros;
exports.onTapNotificaciones = onTapNotificaciones;