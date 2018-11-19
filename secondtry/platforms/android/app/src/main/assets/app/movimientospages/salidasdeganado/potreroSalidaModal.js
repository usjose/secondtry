
var createViewModel = require("~/main-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

var observableModule = require("data/observable");
var closeCallback;
var model;



exports.onShownModally = function(args){


    closeCallback = args.closeCallback;


};

exports.onLoaded = function(args){

    var page = args.object;
    MisDatos = "";
    arrayPotreros = new Array();

    dataBase = new Sqlite("Pastos.db").then(db => {

        MisDatos = createViewModel(db);
        MisDatos.traemeLosPotrerosDeSalidaParaCombo();


    }, error => {
        console.log("OPEN DB ERROR", error);
    });

    Promise.all([dataBase]).then(db=>{

        arrayPotreros = MisDatos.potrerosSalidaComboBox;

        console.log("El combo Es: " + arrayPotreros);

            modelo = new observableModule.fromObject({potreroSalida:arrayPotreros,potrerosIndex:0});

            page.bindingContext = modelo;

    });






};

exports.onTapSeleccionar = function(args){

		closeCallback(modelo.potreroSalida[modelo.potrerosIndex]);

	};