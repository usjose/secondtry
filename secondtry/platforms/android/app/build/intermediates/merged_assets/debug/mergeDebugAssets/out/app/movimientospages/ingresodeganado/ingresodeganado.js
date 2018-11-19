var createViewModel = require("~/main-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

var frames = require("ui/frame");
var observable = require("data/observable");
var page;



function paginaFomrmularioIngreso(){

    var model = new observable.Observable();

        model.fechaIngreso = "";
        model.cantidadIngresan = "";
        model.generoIngreso = "";
        model.tamanio = "";
        model.potreroIngreso = "";
        model.propietarioIngreso = "";
        model.observaciones = "";

    return model;

};


function onLoaded(args){

    page = args.object;
    //var paginaFormularioIngreso = page.navigationContext.model;

    var paginaFormularioIngreso = new paginaFomrmularioIngreso();

    page.bindingContext = paginaFormularioIngreso;

};


function onTapFechaIngreso(args){


    var modalPageModule = "movimientospages/ingresodeganado/fechaIngresoModal";
    var context = {fechaIngreso: page.bindingContext.fechaIngreso};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(fechaIngreso){
        page.bindingContext.set("fechaIngreso", fechaIngreso);
    },
    fullscreen
    );


};

function onTapGeneroIngreso(args){


    var modalPageModule = "movimientospages/ingresodeganado/generoIngresoModal";
    var context = {generoIngreso: page.bindingContext.generoIngreso};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(generoIngreso){
        page.bindingContext.set("generoIngreso", generoIngreso);
    },
    fullscreen
    );


};

function onTapTamanio(args){


    var modalPageModule = "movimientospages/ingresodeganado/tamanioModal";
    var context = {tamanio: page.bindingContext.tamanio};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(tamanio){
        page.bindingContext.set("tamanio", tamanio);
    },
    fullscreen
    );


};

function onTapPotreroIngreso(args){


    var modalPageModule = "movimientospages/ingresodeganado/potreroIngresoModal";
    var context = {potreroIngreso: page.bindingContext.potreroIngreso};
    var fullscreen = true;

    //console.log("Me fui para potrerosModal");

    page.showModal(modalPageModule, context, function closeCallback(potreroIngreso){
        page.bindingContext.set("potreroIngreso", potreroIngreso);
    },
    fullscreen
    );


};

function onTapPropietario(args){


    var modalPageModule = "movimientospages/ingresodeganado/propietariosModal";
    var context = {propietarioIngreso: page.bindingContext.propietarioIngreso};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(propietarioSel){
        page.bindingContext.set("propietarioIngreso", propietarioSel);
    },
    fullscreen
    );


};

async function onTapRegistrar(args){

        console.log("Entré para ver si registro el movimiento");

        MisDatos = "";

    dataBase = await new Sqlite("Pastos.db").then(db => {
        
        MisDatos = createViewModel(db);


    }, error => {
        console.log("OPEN DB ERROR", error);
    });

    Promise.all([dataBase]).then(async function(db){

        console.log("Entré acá porque la promesa de dataBase se cumplió");
        console.log("Fecha de Ingreso:", page.bindingContext.fechaIngreso);
        // Acá mapeo los datos ingresados por el usuario
        var FechaEscritura = new Date().toString();
        //Pendiente: Colocar un ID de registro que sea UUID
        MisDatos.IdRegistroMovimiento = FechaEscritura;
        MisDatos.TipoRegistroMovimiento = 'Ingreso';

        // Pendiente: Colocar un LoGenera con el nombre del usuario logeado.
        MisDatos.LoGeneraMovimiento = 'Dummy User';

        console.log("La fecha que se va a guardar es: ");
        console.log(page.bindingContext.fechaIngreso);
        MisDatos.FechaMovimiento = page.bindingContext.fechaIngreso;

        // Pendiente: Validar que esta descripción que coloqué en la siguiente línea sea compatible con la aplicación Web de Pastos
        MisDatos.DescripcionMovimiento = "Ingreso de ganado";
        MisDatos.IngresanMovimiento = page.bindingContext.cantidadIngresan;

        MisDatos.SalenMovimiento = 0;
        MisDatos.GeneroMovimiento = page.bindingContext.generoIngreso;
        MisDatos.TamanioMovimiento =  page.bindingContext.tamanio;

        MisDatos.PotreroOrigenMovimiento = "MundoExterior";
        MisDatos.PotreroDestinoMovimiento = page.bindingContext.potreroIngreso;
        MisDatos.HierroMovimiento =  page.bindingContext.propietarioIngreso;
        MisDatos.ObservaCampoMovimiento =  page.bindingContext.observaciones;


        MisDatos.DateCreatedMovimiento =  FechaEscritura;
        MisDatos.DateUpdatedMovimiento =  FechaEscritura;
        MisDatos.IsSyncedMovimiento =  0;


        console.log("Al parecer ya se mapearon los datos, pero aún no los he \
            insertado. En estos momentos voy a invocar la función para insertarlos");

        promesa = await MisDatos.insertaMovimiento();

        MisDatos.IdRegistroMovimiento = "";
        MisDatos.TipoRegistroMovimiento = "";

        // Pendiente: Colocar un LoGenera con el nombre del usuario logeado.
        MisDatos.LoGeneraMovimiento = "";

        MisDatos.FechaMovimiento = "";
        // Pendiente: Validar que esta descripción que coloqué en la siguiente línea sea compatible con la aplicación Web de Pastos
        MisDatos.DescripcionMovimiento = "";
        MisDatos.SalenMovimiento = "";
        MisDatos.EntranMovimiento = "";

        MisDatos.GeneroMovimiento = "";
        MisDatos.TamanioMovimiento =  "";
        MisDatos.PotreroOrigenMovimiento = "";
        MisDatos.HierroMovimiento =  "";
        MisDatos.ObservaCampoMovimiento =  "";


        MisDatos.DateCreatedMovimiento =  "";
        MisDatos.DateUpdatedMovimiento =  "";
        MisDatos.IsSyncedMovimiento =  "";

        Promise.all([promesa]).then(id=>{

            console.log("Ya terminó la promesa de escritura del movimiento");

            MisDatos.HasInsertedMovement =true;

            console.log("Voy a ejecutar la redirección");
        
            if(MisDatos.HasInsertedMovement){

                console.log("Acá te debería mandar a Éxito");

                botonesExito = {

                    nvoIngresoVisible: true,
                    nvaSalidaVisible : false,
                    nvoMovInternoVisible : false,
                    nvaConsultaVisible : true,
                    nvoMovimientoVisible : true,
                    inicioVisible : true


                };

                var navigationEntry = {

                    moduleName: "exito",
                    context: botonesExito,
                    transition: {
                        name: "slideLeft"
                    }

                };

                    frames.topmost().navigate(navigationEntry);

            }else{

                console.log("Acá te debería mandar a Error");


                var navigationEntry = {

                    moduleName: "error",
                    transition: {
                        name: "slideRight"
                    }

                };

             frames.topmost().navigate(navigationEntry);

            }


        });


    });


    

}

function onTapAtras(args){

    var navigationEntry = {

        moduleName: "movimientospages/movimientos-home",
        transition: {
            name: "slideRight"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
//exports.onNavigatingTo = onNavigatingTo;
exports.onTapFechaIngreso = onTapFechaIngreso;
exports.onLoaded = onLoaded;
exports.onTapRegistrar=onTapRegistrar;
exports.onTapAtras=onTapAtras;
exports.onTapGeneroIngreso=onTapGeneroIngreso;
exports.onTapTamanio=onTapTamanio;
exports.onTapPotreroIngreso = onTapPotreroIngreso;
exports.onTapPropietario = onTapPropietario;