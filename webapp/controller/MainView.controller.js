sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageItem",
    "sap/m/MessagePopover",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, DateFormat, JSONModel, MessageToast, MessageItem, MessagePopover) {
        "use strict";

        var oMessagePopover;

        return Controller.extend("project1.controller.MainView", {
            onInit: function () {            
                oMessagePopover = new MessagePopover();

                //var articles = this.getOwnerComponent().getModel("article").getData("Articles");
                var sPath = sap.ui.require.toUrl("project1/localService/mockdata/Messages.json");
                
                var oModel = new JSONModel(sPath);
                this.getView().setModel(oModel);
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
                var aEntries = oModel.getData("sPath").EntryCollection;
                aEntries.unshift(oEntry);
                oModel.setData({
                    EntryCollection : aEntries
                }, "sPath");
            },

            onFooterToolbarPress: function (oEvent) {
                MessageToast.show(oEvent.getSource().getText());
            },

            handleMessagePopoverPress: function (oEvent) {
                oMessagePopover.removeAllItems();
                var oMessageItem = new MessageItem({
                    type: 'Warning',
                    title: 'Warning message ',
                    description: 'Product XYZ needs to be added to product group before quotation can be approved',
                    subtitle: 'Product XYZ not in product group',
                    counter: 1
                });
                oMessagePopover.addItem(oMessageItem);
                oMessagePopover.toggle(oEvent.getSource());
            }
        });
    });
