  function GameOfLife(files, rows) {
    this.files = files
    this.rows = rows
    this.table = []
    
    var self = this
    
    initialize()
    
    this.calculateNextState = function() {
        var nextTable = []
        for(var i = 0; i < this.files; i++) {
            var nextTableRow = []
            for(var j = 0; j < this.rows; j++) {
                var neighbors = calculateNumOfNeighbors(i, j)
                if(neighbors > 3 || neighbors < 2) {
                    nextTableRow.push(false)
                } else if(neighbors == 3) {
                    nextTableRow.push(true)
                } else {
                    nextTableRow.push(this.table[i][j])
                }
            }
            nextTable.push(nextTableRow)
        }
        this.table = nextTable
        return this.table
    }

    function initialize() {
        for(var i = 0; i < self.files; i++) {
            var row = []
            for(var j = 0; j < self.rows; j++) {
                row.push(Math.round(Math.random()) === 0 )
            }
            self.table.push(row)
        }
    }
    
    function calculateNumOfNeighbors(file, row) {
        var neighbors = 0
        for(var i = file-1; i <= file + 1; i++) {
            for(var j = row-1 ; j <= row + 1; j++) {
                if(!(i == file && j == row)) {
                    neighbors += self.table[calculateToroidalValue(i,files)][calculateToroidalValue(j,rows)] ? 1 : 0
                }
            }   
        }  
        
        return neighbors
    }
    
    function calculateToroidalValue(value, maxValue) {
        return (value + maxValue) % maxValue
    }
}