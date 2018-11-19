/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/ 
//var createViewModel = require("./main-view-model").createViewModel;
var frames = require("tns-core-modules/ui/frame");


//function onNavigatingTo(args) {
//     /*
//     This gets a reference this page’s <Page> UI component. You can
//     view the API reference of the Page to see what’s available at
//     https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
//     */

    
      //var page = args.object;
     // closeCallback(-1);

    
//     A page’s bindingContext is an object that should be used to perform
//     data binding between XML markup and JavaScript code. Properties
//     on the bindingContext can be accessed using the {{ }} syntax in XML.
//     In this example, the {{ message }} and {{ onTap }} bindings are resolved
//     against the object returned by createViewModel().

//     You can learn more about data binding in NativeScript at
//     https://docs.nativescript.org/core-concepts/data-binding.
    

    
//     page.bindingContext = createViewModel();
//}




function onTapIngresos(args){


    var navigationEntry = {

        moduleName: "movimientospages/ingresodeganado/ingresodeganado",
        transition: {
            name: "slideLeft"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

function onTapSalidas(args){


    var navigationEntry = {

        moduleName: "movimientospages/salidasdeganado/salidasdeganado",
        transition: {
            name: "slideLeft"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

function onTapMI(args){


    var navigationEntry = {

        moduleName: "movimientospages/mideganado/mideganado",
        transition: {
            name: "slideLeft"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

function onTapInicio(args){

    var navigationEntry = {

        moduleName: "main-page",
        transition: {
            name: "slideRight"
        }

    };

     frames.topmost().navigate(navigationEntry);

}

exports.onTapInicio = onTapInicio;
exports.onTapSalidas = onTapSalidas;
exports.onTapMI = onTapMI;

//exports.onNavigatingTo = onNavigatingTo;
exports.onTapIngresos = onTapIngresos;