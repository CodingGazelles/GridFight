'use strict';

var TdKeyboard = {
    BACK_SPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    DELETE: 46
}

angular.module('App.Services.EventFilter', [])

// filters user events
.factory('$gridEventFilter', function() {
    return {
        

        // onClick: function(event, scope, element){
        //     console.log("$eventManager: Catch event: " + event.type + " on node: " + scope.node);

        //     // select node
        //     this._stopEventPropagation(event);
        //     console.log("$eventManager: Launch select node action: " + scope.node);
        //     if($appScope.topScope().selectedNode !== scope.node){
        //         $mapManager.unselectNode();
        //         $mapManager.selectNode(scope.node);
        //     }else{
        //         console.log("$eventManager: Node already selected: " + scope.node);
        //     }
        // },

        onMouseDownFilter: function(event, scope, element){
            console.log("$eventManager: Catch event: " + event.type + " on elt: " + elt);

        },

        onMouseOverFilter: function(event, scope, element){
            console.log("$eventManager: Catch event: " + event.type + " on elt: " + elt);

        },

        onMouseUpFilter: function(event, scope, element){
            console.log("$eventManager: Catch event: " + event.type + " on elt: " + elt);

        },

        // stop event propagation
        _stopEventPropagation: function(event){
            if(event.preventDefaut) event.preventDefault();
            if(event.returnValue) event.returnValue = false;
            event.stopPropagation();
        }
    };
})

;