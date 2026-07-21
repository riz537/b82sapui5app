sap.ui.define([
   
], () => {
    "use strict";

    return  {
        formatDesig:function(Desig){
            var jobLevel = "";
            if (Desig === "DEVELOPER") {
                jobLevel = "JL1";
            } else if (Desig === "SENIOR DEVELOPER") {
                jobLevel = "JL2";
            } else if (Desig === "TEAM LEAD") {
                jobLevel = "JL3";
            } else if (Desig === "MANAGER") {
                jobLevel = "JL4";
            }
            return Desig + " (" + jobLevel + ")";
        },
        formatStatus:function(Status){
            if(Status === "PERMANENT"){
                return "Success";
            }else if(Status === "CONTRACT"){
                return "Error";
            }
        },
        formatIcon:function(Status){
            if(Status === "PERMANENT"){
                return "sap-icon://message-success";
            }else if(Status === "CONTRACT"){
                return "sap-icon://message-error";
            }
        }
    };
});