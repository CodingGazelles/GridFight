

/*
 * GET the grid.
 */

exports.grid = function(req, res){
  res.render('views/grid/index', { title: 'Grid' });
};