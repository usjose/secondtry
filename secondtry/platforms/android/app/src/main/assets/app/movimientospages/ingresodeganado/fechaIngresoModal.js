
var observableModule=require("data/observable");
var closeCallback;
var model;

exports.onShownModally = function(args){


    closeCallback = args.closeCallback;


};

exports.onLoaded = function(args){

    var page = args.object;

    model = new observableModule.fromObject({fechaIngreso:new Date(Date.now())});

    page.bindingContext = model;



};

exports.onTapSeleccionar = function(args){

		closeCallback(model.fechaIngreso);

	};