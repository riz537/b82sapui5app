sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.b82sapui5app.controller.View1", {
        onInit() {
        },
        onPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        onSubmit:function(){
            var name = this.getView().byId("oIpName").getValue();
            var newWelcomeText = name +", Welcome to SAP UI5";
            this.getView().byId("oTxtWelcome").setText(newWelcomeText); 
            var alignment = this.getView().byId("oIpAlignment").getValue();
            this.getView().byId("oTxtWelcome").setTextAlign(alignment);
            var signal = this.getView().byId("oIpSignal").getValue();

            this.getView().byId("oBtnRed").setType("Default");
            this.getView().byId("oBtnBlue").setType("Default");
            this.getView().byId("oBtnGreen").setType("Default");
            
            if(signal === "red"){
                this.getView().byId("oBtnRed").setType("Reject");
            } 
            else if(signal === "blue"){
                this.getView().byId("oBtnBlue").setType("Emphasized");
            }
            else if(signal === "green"){
                this.getView().byId("oBtnGreen").setType("Accept");
            }   
        }
    });
});