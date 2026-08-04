sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.b82sapui5app.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched,this);
        },
        onPatternMatched:function(oEvent){
            var empId =  oEvent.getParameter("arguments").key;
            this.getView().bindElement("oModel>/EmployeeSet('"+empId+"')");
           
        },
        onBackPress:function(){
           // this.getOwnerComponent().getRouter().navTo("RouteView1");
              history.go(-1);
        }
        
    });
});
