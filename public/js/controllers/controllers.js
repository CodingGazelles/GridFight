'use strict';

/* Controllers */

angular.module('App.Controllers', [])

.run(function() {})

.controller('AppCtrl', function() {})

.controller('GridViewCtrl', function(){
	console.log("GridViewCtrl: Start controler");
})

.controller('GridCtrl', function($scope){
	console.log("GridCtrl: Start controler");

	// grid of items
	var rowNb = 6;
	var colNb = 6;
	var rows = [];
	var cols = [];
	var grid = [];

	for (var i = 0; i < rowNb; i++) {
		rows[i] = i;
	};

	for (var i = 0; i < colNb; i++) {
		cols[i] = i;
	};

	for (var i = 0; i <= rowNb * colNb; i++) {
		grid[i] = String.fromCharCode( Math.round( Math.random() * 5 + 65));
	};

	grid.item = function(position){
		if(!Array.isArray(position)) throw new Error("Position must be an array.");
		return grid[position[0] * colNb + position[1]];
	};

	// array of selected items (cell position)
	var path = [];
	var pathInProgress = false;
	var pathType = null;

	// copy local variables in the scope
	$scope.rowNb = rowNb;
	$scope.colNb = colNb;
	$scope.rows = rows;
	$scope.cols = cols;
	$scope.grid = grid;
	$scope.path = path;
	$scope.pathInProgress = pathInProgress;
	$scope.pathType = pathType;

	// start a new path
	$scope.startPath = function(position){
		console.log("CellCtrl: Start path: " + grid.item(position) + "/" + position);

		pathInProgress = true;
		pathType = grid.item(position);

		path = [];
		path.toString = function(){
			var a = path.map(function(position){
				return grid.item(position) + "(" + position + ")";
			});
			return a.join(',');
		};

		path.push(position);

		// copy local variables in the scope
		$scope.path = path;
		$scope.pathInProgress = pathInProgress;
		$scope.pathType = pathType;

		$scope.$digest();
	};

	// add a cell to the path
	$scope.addItemToPath = function(position){
		if(!pathInProgress) throw new Error("CellCtrl: No path in progress. Action aborted.");

		// test si l'élément n'est pas déjà dans le path
		var i = path.indexOf(position);
		if( i === -1){
			// tester si le nouvel element touche le dernier element du path
			var lastPosition = path.last;
			if( Math.abs( lastPosition[0] - position[0]) <= 1 && Math.abs( lastPosition[1] - position[1]) <= 1){
				
				// tester si l'élément peut entrer dans le path
				var item = grid.item(position);
				if(pathType === item){
					path.push(position);
					console.log("CellCtrl: New item added: " + path.toString());
				}else{
					console.log("CellCtrl: New item is not compatible. Action aborted.");
				}
			}else{
				console.log("CellCtrl: New item is not in contact. Action aborted.");	
			}
		} else {
			path.splice(i + 1, path.length - i -1);
			console.log("CellCtrl: New item already in path. Shrink path: " + path.toString());
		}

		// copy local variables in th scope
		$scope.pathInProgress = pathInProgress;
		$scope.path = path;

		$scope.$digest();
	};

	// close a path
	$scope.closePath = function(){
		console.log("CellCtrl: Close path: " + path.toString());
		$scope.pathInProgress = pathInProgress = false;
		$scope.path = path = path.splice(0, path.length);

		$scope.$digest();

		// declencher l'action en fonction des items dans le path
	};
})
;