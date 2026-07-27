sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "com/demo/b82sapui5app/model/formatter",
    "sap/ui/model/Filter",
    "sap/m/Dialog"
], (Controller, MessageBox, JSONModel, formatter,Filter, Dialog) => {
    "use strict";

    return Controller.extend("com.demo.b82sapui5app.controller.View1", {
        f: formatter,
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

        onPressVH: function () {
            if (this.dialog === undefined) {
                this.dialog = sap.ui.xmlfragment(this.getView().getId(), "com.demo.b82sapui5app.fragments.EmpIdF4Help", this);
                this.getView().addDependent(this.dialog);
            }
            this.dialog.open();
        },
        onCloseDialog: function () {
            this.dialog.close();
        },
        onPressRow: function (oEvent) {
            var empId = oEvent.getSource().getBindingContext("oModel").getObject().Empid;
            this.dialog.close();
            this.byId("oIpEmpId").setValue(empId);
        },
        onPress: function (oEvent) {
            var empId = oEvent.getSource().getBindingContext("oModel").getObject().Empid;
        },
        onPressGetEmpId: function () {
            var aSelRows = this.byId("oEmpTable").getSelectedItems();
            var selEmpIds = "";
            if (aSelRows.length === 0) {
                MessageBox.error("Hey Mr, Please select atleast one record");
            }
            else {
                for (var i = 0; i < aSelRows.length; i++) {
                    var empId = aSelRows[i].getBindingContext("oModel").getObject().Empid;
                    selEmpIds = selEmpIds + "," + empId;
                }
                MessageBox.success(selEmpIds);
            }

        },
        onPressGo:function(){
            var aFilters = [];
            var empId = this.byId("oIpEmpId").getValue();

            if(empId !==""){
                aFilters.push(new Filter("Empid","EQ",empId));
            }
            this.byId("oEmpTable").getBinding("items").filter(aFilters);

        },
        onReset:function(){
            this.byId("oIpEmpId").setValue("");
            this.byId("oEmpTable").getBinding("items").filter([]);
        }
    });
});