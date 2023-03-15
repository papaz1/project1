sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function () {
	"use strict";
    
    return {
        titleText: function(){
            var numberOfArticles = this.getOwnerComponent().getModel("article").getData("Articles").Articles.length;
            var articleListTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("articleListTitle");
            var articleListTitleWithCount = articleListTitle.concat("(",numberOfArticles,")");
            return articleListTitleWithCount;
        }
    };
});