
var observableModule=require("data/observable");
var closeCallback;
var model;

exports.onShownModally = function(args){


    closeCallback = args.closeCallback;


};

exports.onLoaded = function(args){

    var page = args.object;

    model = new observableModule.fromObject({tamanios:["Becerros(as)","Novillos(as)","Toros/Vacas"],tamanioIndex:0});

    page.bindingContext = model;



};

exports.onTapSeleccionar = function(args){



		//console.log("MatrizGeneros: "+ model.generosIngreso);
		//console.log("IndiceSeleccionado: "+ model.generoIngresoIndex);
		//console.log("Selección: "+ model.generosIngreso[model.generoIngresoIndex]);

		closeCallback(model.tamanios[model.tamanioIndex]);

	};