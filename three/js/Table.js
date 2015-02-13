function Table(files, rows, scenario) {
    var cells = []
    var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 )
    //var material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
    var material = new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );
    
    var self = this

    init()
    
    this.updateCells = function(table) {
        for(var i = 0; i < files; i++) {
            for(var j = 0; j < rows; j++) {
                cells[i][j].visible = table[i][j]
            }
         }
    }
    
    function init() {
         for(var i = 0; i < files; i++) {
            var tableRow = []
            for(var j = 0; j < rows; j++) {
                var cell = buildCell(i,j)
                tableRow.push(cell)
                scenario.add(cell)
            }
            cells.push(tableRow)
         }
    }

    function buildCell(file, row) {
        var cell = new THREE.Mesh( cubeGeometry, material ) 
        cell.position.x = calculateCenterCoords(file, files)
        cell.position.y = calculateCenterCoords(row, rows) 
        return cell
    }
    
    function calculateCenterCoords(value, maxValue) {
    	return value - maxValue/2
    }
}