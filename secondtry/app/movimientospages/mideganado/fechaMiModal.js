
var observableModule=require("data/observable");
var closeCallback;
var model;
//var fechaQueViene;


exports.onShownModally = function(args){


    closeCallback = args.closeCallback;
    //fechaQueViene = args.context.fechaQueViene;
    

};

exports.onLoaded = function(args){



    var page = args.object;

    
    //var fechaQueViene = page.bindingContext.fechaMovimiento;
    //var fechaQueViene = page.getViewById("miDatePicker").text;
    //fechaQueViene = args.context['fechaQueViene'];
    //fechaQueViene = args.context.fechaQueViene
    //fechaQueViene = onLoaded().fechaQueViene;
    //console.log("FechaQueViene : ");
    //console.log(fechaQueViene);

    //console.log("contexto : ");
    //console.log(args.context);
    /*
    if(fechaQueViene==""){

    	model = new observableModule.fromObject({fechaMovimiento:new Date(Date.now())});


    }else{

        //temp = new Date(Date.parse(fechaQueViene.replace('-','/','g')));

		model = new observableModule.fromObject({fechaMovimiento:fechaQueViene});

	}
    */
    
	

	   model = new observableModule.fromObject({fechaMovimiento:new Date(Date.now())});

    
    page.bindingContext = model;

    

};

exports.onTapSeleccionar = function(args){

		closeCallback(model.fechaMovimiento);

};

