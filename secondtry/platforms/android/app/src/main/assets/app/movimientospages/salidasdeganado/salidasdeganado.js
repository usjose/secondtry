var createViewModel = require("~/main-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");



var frames = require("ui/frame");
var observable = require("data/observable");
var page;

function paginaFomrmularioSalida(){

    var model = new observable.Observable();

    model.fechaSalida = "";
    model.cantidadSalen = "";
    model.generoSalida = "";
    model.tamanio = "";
    model.potreroSalida = "";
    model.propietarioSalida = "";
    model.observaciones = "";

    return model;



};


function onLoaded(args){

    page = args.object;
    //var paginaFormularioIngreso = page.navigationContext.model;

    var paginaFormularioSalida = new paginaFomrmularioSalida();

    page.bindingContext = paginaFormularioSalida;

};


function onTapFechaSalida(args){


    var modalPageModule = "movimientospages/salidasdeganado/fechaSalidaModal";
    var context = {fechaSalida: page.bindingContext.fechaSalida};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(fechaSalida){
        page.bindingContext.set("fechaSalida", fechaSalida);
    },
    fullscreen
    );


};

function onTapGeneroSalida(args){


    var modalPageModule = "movimientospages/salidasdeganado/generoSalidaModal";
    var context = {generoSalida: page.bindingContext.generoSalida};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(generoSalida){
        page.bindingContext.set("generoSalida", generoSalida);
    },
    fullscreen
    );


};

function onTapTamanio(args){


    var modalPageModule = "movimientospages/salidasdeganado/tamanioModal";
    var context = {tamanio: page.bindingContext.tamanio};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(tamanio){
        page.bindingContext.set("tamanio", tamanio);
    },
    fullscreen
    );


};

function onTapPotreroSalida(args){


    var modalPageModule = "movimientospages/salidasdeganado/potreroSalidaModal";
    var context = {potreroSalida: page.bindingContext.potreroSalida};
    var fullscreen = true;

    //console.log("Me fui para potrerosModal");

    page.showModal(modalPageModule, context, function closeCallback(potreroSalida){
        page.bindingContext.set("potreroSalida", potreroSalida);
    },
    fullscreen
    );


};

function onTapPropietario(args){


    var modalPageModule = "movimientospages/salidasdeganado/propietariosModal";
    var context = {propietarios: page.bindingContext.propietarioSalida};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(propietario){
        page.bindingContext.set("propietarioSalida", propietario);
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
        console.log("Fecha de Salida:", page.bindingContext.fechaSalida);
        // Acá mapeo los datos ingresados por el usuario
        var FechaEscritura = new Date().toString();
        //Pendiente: Colocar un ID de registro que sea UUID
        MisDatos.IdRegistroMovimiento = FechaEscritura;
        MisDatos.TipoRegistroMovimiento = 'Salida';

        // Pendiente: Colocar un LoGenera con el nombre del usuario logeado.
        MisDatos.LoGeneraMovimiento = 'Dummy User';

        MisDatos.FechaMovimiento = page.bindingContext.fechaSalida;
        // Pendiente: Validar que esta descripción que coloqué en la siguiente línea sea compatible con la aplicación Web de Pastos
        MisDatos.DescripcionMovimiento = "Salida de ganado";
        MisDatos.IngresanMovimiento = 0;
        MisDatos.SalenMovimiento = page.bindingContext.cantidadSalen;
        MisDatos.GeneroMovimiento = page.bindingContext.generoSalida;
        MisDatos.TamanioMovimiento =  page.bindingContext.tamanio;
        MisDatos.PotreroOrigenMovimiento = page.bindingContext.potreroSalida;
        
        MisDatos.PotreroDestinoMovimiento ="MundoExterior";
        MisDatos.HierroMovimiento =  page.bindingContext.propietarioSalida;
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

                    nvoIngresoVisible: false,
                    nvaSalidaVisible : true,
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
exports.onTapFechaSalida = onTapFechaSalida;
exports.onLoaded = onLoaded;
exports.onTapRegistrar=onTapRegistrar;
exports.onTapAtras=onTapAtras;
exports.onTapGeneroSalida=onTapGeneroSalida;
exports.onTapTamanio=onTapTamanio;
exports.onTapPotreroSalida = onTapPotreroSalida;
exports.onTapPropietario = onTapPropietario;