

var createViewModel = require("~/main-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frames = require("ui/frame");

const switchModule = require("tns-core-modules/ui/switch");
const layout = require("ui/layouts/grid-layout");
const [GridLayout, GridUnitType, ItemSpec] = [layout.GridLayout, layout.GridUnitType, layout.ItemSpec];
const Label = require("ui/label").Label;

var observable = require("data/observable");
var page;

function paginaFormularioUpdatePermissions(){

    var model = new observable.Observable();

    model.usuarioSeleccionado = "";
    model.fincasYPotreros = new Array();

    model.elementoFca = new Array();
    model.elementoPot = new Array();
    model.elementoCCP = new Array();
    model.elementoCRM = new Array();
    model.elementoCCM = new Array();
    
    
    return model;

}


async function onLoaded(args){

    console.log("Entré a onLoaded de formularioedicionpermisosusuario");
    page = args.object;

    var myForm = new paginaFormularioUpdatePermissions();
    var permisosDelUsuario = new Array();

    var matrizCompleta = new Array();

    myForm.permisosSeleccionado = page.navigationContext;




    // *** Obtenga el ID del registro particular ***


    // *** Fin de Obtenga el ID del registro particular ***

    // *** consulte la base de datos por el registro particular y poble los controles con la información ***


    matrizCompleta = myForm.permisosSeleccionado;

    myForm.fincasYPotreros = matrizCompleta;
    myForm.usuarioSeleccionado = "Prueba";


    pobleSwitchesPermisos(myForm);
    

    // *** Fin de consulte la base de datos por el registro particular y poble los controles con la información ***

    page.bindingContext = myForm;


};



function pobleSwitchesPermisos(miContext){

    var fincaAnterior = "";
    var rows = new Array();

    var elementoFca = new Array();
    var elementoPot = new Array();
    var elementoCCP = new Array();
    var elementoCRM = new Array();
    var elementoCCM = new Array();

    var stackCCP = new Array();
    var stackCRM = new Array();
    var stackCCM = new Array();

    var fila=0;
    var p=0;

    console.log("Estoy en la función pobleSwitchesPermisos");

    console.dir(miContext.fincasYPotreros);

    
    var fincasYPotreros = miContext.fincasYPotreros;
    
    var Container = page.getViewById("SwitchesPermisosContainer");

    //console.dir(Container);

        const myTitleFinca = new Label();
        myTitleFinca.text = "Finca";
        myTitleFinca.className = "encabezadoTabla";

        const myTitlePotrero = new Label();
        myTitlePotrero.text = "Potrero";
        myTitlePotrero.className = "encabezadoTabla";

        const myTitleCP = new Label();
        myTitleCP.text = "Consultar Población";
        myTitleCP.className = "encabezadoTabla";
        myTitleCP.textWrap = "true";

        const myTitleRM = new Label();
        myTitleRM.text = "Registrar Movimientos";
        myTitleRM.className = "encabezadoTabla";
        myTitleRM.textWrap = "true";

        const myTitleCM = new Label();
        myTitleCM.text = "Consultar Movimientos";
        myTitleCM.className = "encabezadoTabla";
        myTitleCM.textWrap = "true";

        const myGridSwitch = new GridLayout();


        myGridSwitch.addChild(myTitleFinca);
        myGridSwitch.addChild(myTitlePotrero);
        myGridSwitch.addChild(myTitleCP);
        myGridSwitch.addChild(myTitleRM);
        myGridSwitch.addChild(myTitleCM);

        /*
        myGridSwitch.addColumn(new ItemSpec(150, GridUnitType.PIXEL));
        myGridSwitch.addColumn(new ItemSpec(180, GridUnitType.PIXEL));
        myGridSwitch.addColumn(new ItemSpec(80, GridUnitType.PIXEL));
        myGridSwitch.addColumn(new ItemSpec(80, GridUnitType.PIXEL));
        myGridSwitch.addColumn(new ItemSpec(80, GridUnitType.PIXEL));
        */

        const firstColumn = new ItemSpec(130, GridUnitType.PIXEL);
        const secondColumn = new ItemSpec(100, GridUnitType.PIXEL);
        const thirdColumn = new ItemSpec(100, GridUnitType.PIXEL);
        const fourthColumn = new ItemSpec(100, GridUnitType.PIXEL);
        const fifthColumn = new ItemSpec(100, GridUnitType.PIXEL);

        myGridSwitch.addColumn(firstColumn);
        myGridSwitch.addColumn(secondColumn);
        myGridSwitch.addColumn(thirdColumn);
        myGridSwitch.addColumn(fourthColumn);
        myGridSwitch.addColumn(fifthColumn);

    
        rows[0] = new ItemSpec(1, GridUnitType.AUTO);
        myGridSwitch.addRow(rows[0]);

        GridLayout.setRow(myTitleFinca, 0);
        GridLayout.setRow(myTitlePotrero, 0); 
        GridLayout.setRow(myTitleCP, 0); 
        GridLayout.setRow(myTitleRM, 0); 
        GridLayout.setRow(myTitleCM, 0);  

        GridLayout.setColumn(myTitleFinca, 0);
        GridLayout.setColumn(myTitlePotrero, 1); 
        GridLayout.setColumn(myTitleCP, 2); 
        GridLayout.setColumn(myTitleRM, 3); 
        GridLayout.setColumn(myTitleCM, 4); 



        for (p=0; p<fincasYPotreros.length;p++){

        

            if(fincaAnterior == fincasYPotreros[p][0]){

                elementoFca[p] = new Label();
                elementoFca[p].text = "";
                elementoFca[p].className = "itemTabla";
                console.log("Esta finca: ");
                console.log(fincasYPotreros[p][0]);

            }else{

                elementoFca[p] = new Label();
                elementoFca[p].text = fincasYPotreros[p][0];
                elementoFca[p].className = "itemTabla";
                console.log("Esta finca: ");
                console.log(fincasYPotreros[p][0]);
            }

        
            elementoPot[p] = new Label();
            elementoPot[p].text = fincasYPotreros[p][1];
            elementoPot[p].className = "itemTabla";
            console.log("Este potrero: ");
            console.log(fincasYPotreros[p][1]);

            
            
            elementoCCP[p] = new switchModule.Switch();
            elementoCCP[p].className = "switches";
            elementoCCP[p].checked = fincasYPotreros[p][2];

            elementoCRM[p] = new switchModule.Switch();
            elementoCRM[p].className = "switches";
            elementoCRM[p].checked = fincasYPotreros[p][3];

            elementoCCM[p] = new switchModule.Switch();
            elementoCCM[p].className = "switches";
            elementoCCM[p].checked = fincasYPotreros[p][4];
            

            /*
            elementoCCP[p] = new Label();
            elementoCCP[p].className = "switches";
            elementoCCP[p].text = fincasYPotreros[p][2];

            elementoCRM[p] = new Label();
            elementoCRM[p].className = "switches";
            elementoCRM[p].text = fincasYPotreros[p][3];

            elementoCCM[p] = new Label();
            elementoCCM[p].className = "switches";
            elementoCCM[p].text = fincasYPotreros[p][4];

            
            
            stackCCP[p].addChild(elementoCCP[p]);
            stackCRM[p].addChild(elementoCRM[p]);
            stackCCM[p].addChild(elementoCCM[p]);
            */

            myGridSwitch.addChild(elementoFca[p]);
            myGridSwitch.addChild(elementoPot[p]);
            myGridSwitch.addChild(elementoCCP[p]);
            myGridSwitch.addChild(elementoCRM[p]);
            myGridSwitch.addChild(elementoCCM[p]);


            rows[p] = new ItemSpec(1, GridUnitType.AUTO);

            myGridSwitch.addRow(rows[p]);

            GridLayout.setColumn(elementoFca[p],0);
            GridLayout.setColumn(elementoPot[p],1); 
            GridLayout.setColumn(elementoCCP[p],2); 
            GridLayout.setColumn(elementoCRM[p],3); 
            GridLayout.setColumn(elementoCCM[p],4); 

            GridLayout.setRow(elementoFca[p], fila+1);
            GridLayout.setRow(elementoPot[p], fila+1); 
            GridLayout.setRow(elementoCCP[p], fila+1); 
            GridLayout.setRow(elementoCRM[p], fila+1); 
            GridLayout.setRow(elementoCCM[p], fila+1); 


            fincaAnterior = fincasYPotreros[p][0];
            fila++;
            
        }

        
        Container.addChild(myGridSwitch);


}




function onTapAtras(args){

    var navigationEntry = {

        moduleName: "main-page",
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
exports.onLoaded = onLoaded;
//exports.onTapRegistrar=onTapRegistrar;
exports.onTapAtras=onTapAtras;
