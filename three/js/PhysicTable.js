function PhysicTable(table, world, initialY) {
    var cells = table.getCells()
	var bodies = []
    var self = this
    
    init()
    
    function init() {
    	for(var i = 0; i < cells.length; i++) {
    		var bodiesRow = []
    		for(var j = 0; j < cells[i].length; j++) {
    			bodiesRow.push(THREEx.Oimo.createBodyFromMesh(world, cells[i][j]))
    		}
    		bodies.push(bodiesRow)
        }	
    }
    
    this.update = function() {
    	if(mustMoveUpTable()) {
    		self.moveUp()
    	} else {
    		updatePositions()
    	}
    }
    
    this.moveDown = function() {
    	for(var i = 0; i < bodies.length; i++) {
    		for(var j = 0; j < bodies[i].length; j++) {
    	        var mesh = cells[i][j]
    	        mesh.position.y -=1
    	        bodies[i][j].resetPosition(mesh.position.x, mesh.position.y, mesh.position.z);
    		}
        }
    }
    
    function mustMoveUpTable() {
    	return cells[0][0].position.y < -initialY
    }
    
    function updatePositions() {
    	for(var i = 0; i < bodies.length; i++) {
    		for(var j = 0; j < bodies[i].length; j++) {
    			THREEx.Oimo.updateObject3dWithBody(cells[i][j], bodies[i][j])
    		}
    	}
    }
    
    this.moveUp = function() {
    	for(var i = 0; i < bodies.length; i++) {
    		for(var j = 0; j < bodies[i].length; j++) {
    	        var mesh = cells[i][j]
    	        table.updateCellPosition(mesh, i, j)
    	        mesh.position.y += initialY * 2
                bodies[i][j].resetPosition(mesh.position.x, mesh.position.y, mesh.position.z);
    		}
        }
    }
}