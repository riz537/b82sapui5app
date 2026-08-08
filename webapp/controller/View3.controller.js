sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageBox, JSONModel) => {
    "use strict";

    return Controller.extend("com.demo.b82sapui5app.controller.View3", {
        onInit() {
            this.certModel = new JSONModel({
                aCerts: []
            });
            this.getView().setModel(this.certModel, "certModel");
        },
        onAddRow: function () {
            this.certModel.getData().aCerts.push({
                Empid: "",
                Code: "",
                Descr: "",
                Skill: ""
            });
            this.certModel.refresh(true);
        },
        onDeleteRow:function(oEvent){
            var index = oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
            this.certModel.getData().aCerts.splice(index,1);
             this.certModel.refresh(true);
        },
        onBackPress: function () {
            // this.getOwnerComponent().getRouter().navTo("RouteView1");
            history.go(-1);
        },
        onPressSave: function () {
            //read al values from the screen
            var empId = this.getView().byId("oIpEmpId").getValue();
            var name = this.getView().byId("oIpName").getValue();
            var desig = this.getView().byId("oIpDesig").getValue();
            var email = this.getView().byId("oIpEmail").getValue();
            var phone = this.getView().byId("oIpPhone").getValue();
            var salary = this.getView().byId("oIpSalary").getValue();
            var status = this.getView().byId("oIpStatus").getValue();
            var rating = this.getView().byId("oIpRating").getValue();

            // write the mandatory field validation + data format validation

            var payload = {
                Empid: empId,
                Name: name,
                Desig: desig,
                Email: email,
                Phone: phone,
                Salary: salary,
                Status: status,
                Rating: parseInt(rating),
                toCertifications: this.certModel.getData().aCerts
            };

            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.create("/EmployeeSet", payload, {
                success: function (req, res) {
                    MessageBox.success("Employee Created Successfully");
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            });
        }
    });
});
