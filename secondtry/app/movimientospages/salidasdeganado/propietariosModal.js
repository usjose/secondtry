

var createViewModel = require("~/main-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

var observableModule=require("data/observable");
var closeCallback;
var model;

exports.onShownModally = function(args){


    closeCallback = args.closeCallback;


};




exports.onLoaded = function(args){

    var page = args.object;
    MisDatos = "";
    arrayPropietarios = new Array();

    dataBase = new Sqlite("Pastos.db").then(db => {

        MisDatos = createViewModel(db);
        //MisDatos.colocaDatosDummy();
        MisDatos.traemeLosPropietariosParaCombo();

    }, error => {
        console.log("OPEN DB ERROR", error);
    });

    Promise.all([dataBase]).then(db=>{

        arrayPropietarios = MisDatos.propietariosComboBox;

        console.log("El combo Es: " + arrayPropietarios);

            modelo = new observableModule.fromObject({ propietarios:arrayPropietarios,propietarioIndex:0});

            page.bindingContext = modelo;

    });

    


    
};

exports.onTapSeleccionar = function(args){

		closeCallback(modelo.propietarios[modelo.propietarioIndex]);

	};