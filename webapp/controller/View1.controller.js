sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "com/demo/b82sapui5app/model/formatter"
], (Controller, MessageBox, JSONModel, formatter) => {
    "use strict";

    return Controller.extend("com.demo.b82sapui5app.controller.View1", {
        f:formatter,
        onInit() {
            var oModel = this.getOwnerComponent().getModel("oModel");
            var empModel = new JSONModel();
            this.getView().setModel(empModel, "empModel");

            //var empModel = this.getOwnerComponent().getModel("empModel");
            oModel.read("/EmployeeSet", {
                success: function (data) {
                    // if i have to process the data before setting it to empModel, i can do it here
                    for (var i = 0; i < data.results.length; i++) {
                        var jobLevel = "";
                        if (data.results[i].Desig === "DEVELOPER") {
                            jobLevel = "JL1";
                        } else if (data.results[i].Desig === "SENIOR DEVELOPER") {
                            jobLevel = "JL2";
                        } else if (data.results[i].Desig === "TEAM LEAD") {
                            jobLevel = "JL3";
                        } else if (data.results[i].Desig === "MANAGER") {
                            jobLevel = "JL4";
                        }
                        data.results[i].Desig = data.results[i].Desig + " (" + jobLevel + ")";
                    }
                    empModel.setData(data);
                }.bind(this)
            });
        },
        onPress: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        onSubmit: function () {
            // code to read data from multi value UI elements
            var selValue = this.getView().byId("oSel").getSelectedKey();
            var cbValue = this.getView().byId("oCB").getSelectedKey();
            var mcbValue = this.getView().byId("oMCB").getSelectedKeys();
            var rbgValue = this.getView().byId("oRBG").getSelectedIndex();    
        },
        onSelectChange:function(){
             var selValue = this.getView().byId("oSel").getSelectedKey();
             if(selValue === "JAGADEESH"){
               this.getView().byId("oCB").setEnabled(false);
             }
        },
        onSelFromCB:function(){
             var cbValue = this.getView().byId("oCB").getSelectedKey();
        },
        onSelFromMCB:function(){
             var mcbValue = this.getView().byId("oMCB").getSelectedKeys();
        },
        onSelectFromRBG:function(){
             var rbgValue = this.getView().byId("oRBG").getSelectedIndex();
        }
    });
});