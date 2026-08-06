sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.b82sapui5app.controller.View4", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView4").attachPatternMatched(this.onPatternMatched,this);
        },
        onPatternMatched:function(oEvent){
            var empId =  oEvent.getParameter("arguments").key;
            this.getView().bindElement("oModel>/EmployeeSet('"+empId+"')");
        },
        onBackPress:function(){
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
                Rating: parseInt(rating)
            };

            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.update("/EmployeeSet('"+empId+"')", payload, {
                success: function (req, res) {
                    MessageBox.success("Employee Updated Successfully");
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            });
        }
        
    });
});
