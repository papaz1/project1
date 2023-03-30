sap.ui.define([
    "sap/ui/core/Core",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/m/Button",
    "sap/m/Dialog",
	"sap/m/Label",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/m/MessageItem",
    "sap/m/MessagePopover",
    "sap/m/TextArea",
	"../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Core, Controller, DateFormat, JSONModel, Button, Dialog, Label,Library, MessageToast, MessageItem, MessagePopover, TextArea, formatter) {
        "use strict";

        var oMessagePopover;

        return Controller.extend("project1.controller.MainView", {
            formatter: formatter,
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
                    Author: "Baran Sölen",
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

            onRejectButtonPress: function () {
                var ButtonType = Library.ButtonType;
                var DialogType = Library.DialogType;
        
                if (!this.oRejectDialog) {
                    this.oRejectDialog = new Dialog({
                        title: "Reject",
                        type: DialogType.Message,
                        content: [
                            new Label({
                                text: "Do you want to reject this order?",
                                labelFor: "rejectionNote"
                            }),
                            new TextArea("rejectionNote", {
                                width: "100%",
                                placeholder: "Add note (optional)"
                            })
                        ],
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "Reject",
                            press: function () {
                                var sText = Core.byId("rejectionNote").getValue();
                                MessageToast.show("Note is: " + sText);
                                this.oRejectDialog.close();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press: function () {
                                this.oRejectDialog.close();
                            }.bind(this)
                        })
                    });
                }
                this.oRejectDialog.open();
            },

            handleMessagePopoverPress: function (oEvent) {
                oMessagePopover.removeAllItems();
                var oMessageItem = new MessageItem({
                    type: 'Warning',
                    title: 'Warning',
                    description: 'Article 1044470 is not part of the product group Santa Maria Spices',
                    subtitle: 'Article 1044470 is not part of the product group Santa Maria Spices',
                    counter: 1
                });
                oMessagePopover.addItem(oMessageItem);
                oMessagePopover.toggle(oEvent.getSource());
            }
        });
    });
