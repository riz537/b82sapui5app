sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "com/demo/b82sapui5app/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/m/Dialog",
    "sap/ui/export/Spreadsheet"
], (Controller, MessageBox, JSONModel, formatter, Filter, Sorter, Dialog, Spreadsheet) => {
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
        // onPress: function () {
        //     this.getOwnerComponent().getRouter().navTo("RouteView2");
        // },

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
            this.getOwnerComponent().getRouter().navTo("RouteView2",{
                key:empId 
            });


            //this.byId("oSFEmpDetails").bindElement("oModel>/EmployeeSet('"+empId+"')");


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
        onPressGo: function () {
            var aFilters = [];
            var aSorters = [];
            var empId = this.byId("oIpEmpId").getValue();
            var salOpr = this.byId("oSelOpr").getSelectedKey();
            var salary = this.byId("oIpSalary").getValue();

            if (empId !== "") {
                aFilters.push(new Filter("Empid", "EQ", empId));
            }
            if (salOpr !== "" && salOpr !== "") {
                aFilters.push(new Filter("Salary", salOpr, salary));
            }
            this.byId("oEmpTable").getBinding("items").filter(aFilters);


            // Grouping logic should go first 

            var groupField = this.byId("oCBGroupField").getSelectedKey();
            var groupOrderIndex = this.byId("oRbgGroupOrder").getSelectedIndex();
            var groupSecondParam = groupOrderIndex === 0 ? false : true;

            if (groupField !== "" && groupOrderIndex !== -1) {
                aSorters.push(new Sorter(groupField, groupSecondParam, function (oBindingContext) {
                    var desig = oBindingContext.getObject().Desig;
                    return {
                        key: desig,
                        text: desig
                    }
                }));
            }

            // sorting logic
            var sortField = this.byId("oCBSortField").getSelectedKey();
            var orderIndex = this.byId("oRbgSortOrder").getSelectedIndex();
            var secondParam = orderIndex === 0 ? false : true;

            if (sortField !== "" && orderIndex !== -1) {
                aSorters.push(new Sorter(sortField, secondParam));
            }
            this.byId("oEmpTable").getBinding("items").sort(aSorters);


        },
        onReset: function () {
            this.byId("oIpEmpId").setValue("");
            this.byId("oSelOpr").setSelectedKey("");
            this.byId("oIpSalary").setValue("");
            this.byId("oCBSortField").setSelectedKey("");
            this.byId("oRbgSortOrder").setSelectedIndex(-1);

            this.byId("oEmpTable").getBinding("items").filter([]);
            this.byId("oEmpTable").getBinding("items").sort([]);
        },
        onExportToExcel: function () {
            var aCols, oRowBinding, oSettings, oSheet;
            oRowBinding = this.getView().byId('oEmpTable').getBinding('items');
            // place your table columns and odata properties
            aCols = [{
                label: 'Employee ID',
                property: 'Empid'
            }, {
                label: 'Name',
                property: 'Name'
            }, {
                label: 'Designation',
                property: 'Desig'
            }, {
                label: 'Email',
                property: 'Email'
            }, {
                label: 'Phone.No',
                property: 'Phone'
            }, {
                label: 'Salary',
                property: 'Salary',
                type: 'Number',
                delimiter: true,
                scale: 2
            }];
            oSettings = {
                workbook: {
                    columns: aCols
                },
                dataSource: oRowBinding,
                fileName: 'Employees.xlsx',
                worker: true
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        }
    });
});