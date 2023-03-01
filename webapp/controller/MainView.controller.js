sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, DateFormat, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("project1.controller.MainView", {
            onInit: function () {
                var sPath = sap.ui.require.toUrl("project1/localService/mockdata/Messages.json");
                var oModel = new JSONModel(sPath);
                this.getView().setModel(oModel);

                //for (var i = 0; i < oData.ProductCollection.length; i++) {
                //    var oProduct = oData.ProductCollection[i];
                //}
            },

            onFeedPost: function (oEvent) {
                var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
                var oDate = new Date();
                var sDate = oFormat.format(oDate);
                var sValue = oEvent.getParameter("value");
                var oEntry = {
                    Author: "Author",
                    Type: "Comment",
                    Date: "" + sDate,
                    Text: sValue
                };

                var oModel = this.getView().getModel();
                var aEntries = oModel.getData().EntryCollection;
                aEntries.unshift(oEntry);
                oModel.setData({
                    EntryCollection : aEntries
                });
            },

            onFooterToolbarPress: function (oEvent) {
                MessageToast.show(oEvent.getSource().getText());
            }
        });
    });
