/*
Model():
    Constructs a new Model object
INPUT:
    None
OUTPUT:
    A new instance of a Model object
*/
 function Model() {
    /*tileMatrix is a 2D array of Player, Sushi, and Wall objects. Helps model
      keep track of the location of the walls, players, and sushis. This matrix
      is this interpreted by the View as actual pixel coordinates of the icons
    */
    let tileMatrix = new Array(15);
    for (let i = 0; i < tileMatrix.length; i++) {
        tileMatrix[i] = new Array(15);
    }
    
    
    /*
    get():
        Gets the object in a particular spot in tileMatrix
    INPUT:
        row: row in tileMatrix being retrieved
        col: column in tileMatrix being retrieved
    OUTPUT:
        Returns the object (if any) occupying tileMatrix[row][col]
    */
    let get = function(row, col) {
        return tileMatrix[row][col];
    }

    /*
    set():
        Sets a particular spot in tileMatrix to a given object
    INPUT:   
        object: Object being added to tileMatrix
        row: row in tileMatrix that Object is being added to
        col: column in tileMatrix that Object is being added to
    OUTPUT:
        Returns the object (if any) previously occupying tileMatrix[row][col]
    */
    let set = function(object, row, col) {
        let returnObj = get(row, col);
        tileMatrix[row][col] = object;
        return returnObj;
    }
    
    /*
    getRow():
        Gets the row in tileMatrix that a given object lies in
    INPUT:
        object: Object to get the row location of in tileMatrix
    OUTPUT:
        Returns the index of the row the Object occupies. If tileMatrix does
        not contain object, return -1
    */
    let getRow = function(object) {
        let row = -1;
        for (let i = 0; i < tileMatrix[object].length; i++) {
            if (tileMatrix[object].indexOf(i) != -1) {
                row = tileMatrix[object].indexOf(i)
            }
        }
        return row;
    }
    /*
    getCol():
        Gets the column in tileMatrix that a given object lies in
    INPUT:
        object: Object to get the column location of in tileMatrix
    OUTPUT:
        Returns the index of the column the Object occupies. If tileMatrix does
        not contain object, return -1
    */
    let getCol = function(object) {
        let row = getRow(object);
        if (row == -1) {
            return -1;
        }
        return tileMatrix[row].indexOf(object);
    }

    return {tileMatrix, get, set, getRow, getCo};
}

function Main() {
    let testBoard = Model();

    let itemLocation = {type: "Powerup", row: 1, col: 4};
    testBoard.set(itemLocation.type, itemLocation.row, itemLocation.col);
    
    console.log(testBoard.get(1,4))
}

Main();













































































































































