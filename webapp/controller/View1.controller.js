sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.b82sapui5app.controller.View1", {
        onInit() {
        },
        onPress: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        onSubmit: function () {
            var allIsWell = true;
            var empId = this.byId("oIpEmpId").getValue();
            var email = this.byId("oIpEmail").getValue();

            if (empId === "") {
                allIsWell = false;
                this.byId("oIpEmpId").setValueState("Error");
                this.byId("oIpEmpId").setValueStateText("Employee ID is required");
            } else {
                this.byId("oIpEmpId").setValueState("None");
                // here u need to wrtie data format validation code for empId
                var empIdRegExp = /^\d{6}$/;
                if (!empId.match(empIdRegExp)) {
                    allIsWell = false;
                    this.byId("oIpEmpId").setValueState("Error");
                    this.byId("oIpEmpId").setValueStateText("Invalid Employee ID format");
                }
            }
            if (email === "") {
                allIsWell = false;
                this.byId("oIpEmail").setValueState("Error");
                this.byId("oIpEmail").setValueStateText("Email ID is required");
            } else {
                this.byId("oIpEmail").setValueState("None");
                // here u need to wrtie data format validation code for email
                var emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                if (!email.match(emailRegExp)) {
                    allIsWell = false;
                    this.byId("oIpEmail").setValueState("Error");
                    this.byId("oIpEmail").setValueStateText("Invalid Email ID format");
                }
            }

            // send this data to backend using oData service 
            if (allIsWell === true) {
                MessageBox.success("Data submitted successfully");

                // code to send data to backend using oData service
            }


        }
    });
});