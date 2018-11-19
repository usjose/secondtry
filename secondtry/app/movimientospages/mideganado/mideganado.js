
var createViewModel = require("~/main-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");


var frames = require("ui/frame");
var observable = require("data/observable");
var page;

function paginaFomrmularioMovimientoInterno(){

    var model = new observable.Observable();

    model.fechaMovimiento = "";
    model.cantidadMovimiento = "";
    model.generoMovimiento = "";
    model.tamanio = "";
    model.potreroIngreso = "";
    model.potreroSalida = "";
    model.propietarioMovimiento = "";
    model.observaciones = "";

    return model;



};


function onLoaded(args){

    page = args.object;
    //var paginaFormularioIngreso = page.navigationContext.model;

    var paginaFormularioMovimientoInterno = new paginaFomrmularioMovimientoInterno();

    page.bindingContext = paginaFormularioMovimientoInterno;

};


function onTapFechaMovimiento(args){


    var modalPageModule = "movimientospages/mideganado/fechaMiModal";
    var context = {fechaMovimiento: page.bindingContext.fechaMovimiento};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(fechaMovimiento){
        page.bindingContext.set("fechaMovimiento", fechaMovimiento);
    },
    fullscreen
    );
};

function onTapGeneroMovimiento(args){


    var modalPageModule = "movimientospages/mideganado/generoMiModal";
    var context = {generoMovimiento: page.bindingContext.generoMovimiento};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(generoMovimiento){
        page.bindingContext.set("generoMovimiento", generoMovimiento);
    },
    fullscreen
    );
};

function onTapTamanio(args){


    var modalPageModule = "movimientospages/mideganado/tamanioModal";
    var context = {tamanio: page.bindingContext.tamanio};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(tamanio){
        page.bindingContext.set("tamanio", tamanio);
    },
    fullscreen
    );
};

function onTapPotreroSalida(args){


    var modalPageModule = "movimientospages/mideganado/potreroSalidaModal";
    var context = {potreroSalida: page.bindingContext.potreroSalida};
    var fullscreen = true;

    //console.log("Me fui para potrerosModal");

    page.showModal(modalPageModule, context, function closeCallback(potreroSalida){
        page.bindingContext.set("potreroSalida", potreroSalida);
    },
    fullscreen
    );
};

function onTapPotreroIngreso(args){


    var modalPageModule = "movimientospages/mideganado/potreroIngresoModal";
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


    var modalPageModule = "movimientospages/mideganado/propietariosModal";
    var context = {propietarios: page.bindingContext.propietarioMovimiento};
    var fullscreen = true;

    page.showModal(modalPageModule, context, function closeCallback(propietario){
        page.bindingContext.set("propietarioMovimiento", propietario);
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
        console.log("Fecha de Movimiento:", page.bindingContext.fechaMovimiento);
        // Acá mapeo los datos ingresados por el usuario
        var FechaEscritura = new Date().toString();
        //Pendiente: Colocar un ID de registro que sea UUID
        MisDatos.IdRegistroMovimiento = FechaEscritura;
        MisDatos.TipoRegistroMovimiento = 'M.I.';

        // Pendiente: Colocar un LoGenera con el nombre del usuario logueado.
        MisDatos.LoGeneraMovimiento = 'Dummy User';

        MisDatos.FechaMovimiento = page.bindingContext.fechaMovimiento;
        // Pendiente: Validar que esta descripción que coloqué en la siguiente línea sea compatible con la aplicación Web de Pastos
        MisDatos.DescripcionMovimiento = "Movimiento Interno de ganado";
        MisDatos.SalenMovimiento = page.bindingContext.cantidadMovimiento;
        MisDatos.IngresanMovimiento = 0;

        MisDatos.GeneroMovimiento = page.bindingContext.generoMovimiento;
        MisDatos.TamanioMovimiento =  page.bindingContext.tamanio;
        MisDatos.PotreroOrigenMovimiento = page.bindingContext.potreroSalida;
        MisDatos.PotreroDestinoMovimiento = page.bindingContext.potreroIngreso;
        MisDatos.HierroMovimiento =  page.bindingContext.propietarioMovimiento;
        MisDatos.ObservaCampoMovimiento =  page.bindingContext.observaciones;


        MisDatos.DateCreatedMovimiento =  FechaEscritura;
        MisDatos.DateUpdatedMovimiento =  FechaEscritura;
        MisDatos.IsSyncedMovimiento =  0;


        console.log("Al parecer ya se mapearon los datos, pero aún no los he \
            insertado. En estos momentos voy a invocar la función para insertarlos");

        promesaSalida = await MisDatos.insertaMovimiento();

        MisDatos.IdRegistroMovimiento = "";
        MisDatos.TipoRegistroMovimiento = "";

        // Pendiente: Colocar un LoGenera con el nombre del usuario logeado.
        MisDatos.LoGeneraMovimiento = "";

        MisDatos.FechaMovimiento = "";
        // Pendiente: Validar que esta descripción que coloqué en la siguiente línea sea compatible con la aplicación Web de Pastos
        MisDatos.DescripcionMovimiento = "";
        MisDatos.SalenMovimiento = "";
        MisDatos.IngresanMovimiento = "";

        MisDatos.GeneroMovimiento = "";
        MisDatos.TamanioMovimiento =  "";
        MisDatos.PotreroOrigenMovimiento = "";
        MisDatos.HierroMovimiento =  "";
        MisDatos.ObservaCampoMovimiento =  "";


        MisDatos.DateCreatedMovimiento =  "";
        MisDatos.DateUpdatedMovimiento =  "";
        MisDatos.IsSyncedMovimiento =  "";






        console.log("Fecha de Movimiento:", page.bindingContext.fechaMovimiento);

        // Acá mapeo los datos ingresados por el usuario
        var FechaEscritura = new Date().toString();
        //Pendiente: Colocar un ID de registro que sea UUID
        MisDatos.IdRegistroMovimiento = FechaEscritura + "Ingreso";
        MisDatos.TipoRegistroMovimiento = 'M.I.';

        // Pendiente: Colocar un LoGenera con el nombre del usuario logeado.
        MisDatos.LoGeneraMovimiento = 'Dummy User';

        MisDatos.FechaMovimiento = page.bindingContext.fechaMovimiento;
        // Pendiente: Validar que esta descripción que coloqué en la siguiente línea sea compatible con la aplicación Web de Pastos
        MisDatos.DescripcionMovimiento = "Movimiento Interno de ganado";
        
        MisDatos.SalenMovimiento = 0;

        MisDatos.IngresanMovimiento = page.bindingContext.cantidadMovimiento;

        MisDatos.GeneroMovimiento = page.bindingContext.generoMovimiento;
        MisDatos.TamanioMovimiento =  page.bindingContext.tamanio;
        MisDatos.PotreroOrigenMovimiento = page.bindingContext.potreroSalida;
        MisDatos.PotreroDestinoMovimiento = page.bindingContext.potreroIngreso;
        MisDatos.HierroMovimiento =  page.bindingContext.propietarioMovimiento;
        MisDatos.ObservaCampoMovimiento =  page.bindingContext.observaciones;


        MisDatos.DateCreatedMovimiento =  FechaEscritura;
        MisDatos.DateUpdatedMovimiento =  FechaEscritura;
        MisDatos.IsSyncedMovimiento =  0;


        console.log("Al parecer ya se mapearon los datos, pero aún no los he \
            insertado. En estos momentos voy a invocar la función para insertarlos");

        promesaIngreso = await MisDatos.insertaMovimiento();

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



        Promise.all([promesaSalida, promesaIngreso]).then(id=>{

            console.log("Ya terminó la promesa de escritura del movimiento");

            MisDatos.HasInsertedMovement =true;

            console.log("Voy a ejecutar la redirección");
        
            if(MisDatos.HasInsertedMovement){

                console.log("Acá te debería mandar a Éxito");

                botonesExito = {

                    nvoIngresoVisible: false,
                    nvaSalidaVisible : false,
                    nvoMovInternoVisible : true,
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
exports.onTapFechaMovimiento = onTapFechaMovimiento;
exports.onLoaded = onLoaded;
exports.onTapRegistrar=onTapRegistrar;
exports.onTapAtras=onTapAtras;
exports.onTapGeneroMovimiento=onTapGeneroMovimiento;
exports.onTapTamanio=onTapTamanio;
exports.onTapPotreroIngreso = onTapPotreroIngreso;
exports.onTapPotreroSalida = onTapPotreroSalida;
exports.onTapPropietario = onTapPropietario;