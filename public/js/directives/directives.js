'use strict';



/* Directives */
angular.module('App.Directives', [])

.directive('sfGrid', function(){
    return {
        link: function(scope, iElement, iAttrs){
            console.log("sfGrid: Link.");

            // iElement.css("width", scope.)
            // todo: revoir implementation du mouseleave
            // iElement.bind('mouseleave', function($event){
            //     console.log("sfGrid: Detected mouseleave");
            //     scope.closePath();
            //     // todo: stoper la propagation de l'event
            // });
        }
    }
})

.directive('sfCell', function() {
    return {
        scope: true,
        link: function (scope, iElement, iAttrs) {
            console.log("sfCell: Link.");

            scope.position = [scope.row,scope.col];
            scope.item = scope.grid.item(scope.position);
            console.log("sfCell: layout: " + scope.item + "/" + scope.position);

            iElement.bind('mousedown', function($event){
                console.log("sfCell: Detected mousedown on: " + scope.item + "/" + scope.position);
                scope.startPath(scope.position);
                // todo: stoper la propagation de l'event
            });

            iElement.bind('mouseover', function($event){
                console.log("sfCell: Detected mouseover on: " + scope.item + "/" + scope.position);
                if(scope.pathInProgress){
                    console.log("sfCell: Launch action to add item.");
                    scope.addItemToPath(scope.position);
                    // todo: stoper la propagation de l'event
                }else{
                    console.log("sfCell: No path in progress, event rejected.");
                }
            });

            iElement.bind('mouseup', function($event){
                console.log("sfCell: Detected mouseup.");
                scope.closePath();
                // todo: stoper la propagation de l'event
            });
        }
    };
})

.directive('sfPathCanvas', function(){
    return {
        link: function(scope, iElement, iAttrs){
            console.log("sfPathCanvas: Link.");

            var x, y;
            var ctx = iElement[0].getContext('2d');
            ctx.strokeStyle = "orange";

            var layout = function(){
                console.log("sfPathCanvas: Layout.");

                if( scope.path.length > 1){
                    var m = 50;

                    ctx.beginPath();
                    x = scope.path[0][1] * m + 25;
                    y = scope.path[0][0] * m + 25;
                    console.log("move to x: " + x + ", y: " + y);
                    ctx.moveTo(x,y);
                    for (var i = 1; i < scope.path.length; i++) {
                        x = scope.path[i][1] * m + 25;
                        y = scope.path[i][0] * m + 25;
                        console.log("line to x: " + x + ", y: " + y);
                        ctx.lineTo(x, y);
                    };
                    // ctx.closePath();
                    ctx.stroke();
                }
            };

            // redraw path when changed
            scope.$watch(
                function() {
                    return scope.path;
                },
                function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        console.log("sfPathCanvas: Watch path changed");
                        layout();
                    }
                },
                true
            );
        }
    }
})

;



