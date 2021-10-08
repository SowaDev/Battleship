package app.battleship;

public class Grid {
    public static final int size = 10;
    private Square [][] battlemap;

    Grid(){
        this.battlemap = new Square[size][size];
        for(int i = 0; i < size; i++){
            for(int j = 0; j < size; j++)
                this.battlemap[i][j] = new Square(i, j);
        }
    }

    public Square[][] getBattlemap() {
        return battlemap;
    }

    public Square getSquare(int x, int y) {
        return battlemap[x][y];
    }


    //Puts the ship on the grid, but checks if you can before
    public String placeShip(Ship ship, int x, int y){
        String result = isSelectedPlaceFreeAndInBounds(ship, x, y);
        if(result.equals("Success")) {
            markSquaresAndAdjacentSquares(ship, x, y);
            ship.setSail(true);
        }
        return result;
    }

    //Marks where the ship is placed and
    // adjacent squares to the ship, so you won't be able to put a ship just next to another
    public void markSquaresAndAdjacentSquares(Ship ship, int x, int y){
        if(ship.isVertical())
            markVertical(x, y, ship);
        else
            markHorizontal(x, y, ship);
    }

    public void markVertical(int x, int y, Ship ship){
        int length = ship.getLength();
        for (int i = 0; i < length + 2; i++) {
            for (int j = 0; j < 3; j++)
                if(x - 1 + i >= 0 && y - 1 + j >= 0 && x - 1 + i < size && y - 1 + j < size)
                    battlemap[x - 1 + i][y - 1 + j].setRestricted(true);
        }
        for(int i = 0; i < length; i++)
            battlemap[x + i][y].setShip(ship);
    }

    public void markHorizontal(int x, int y, Ship ship){
        int length = ship.getLength();
        for (int i = 0; i < length + 2; i++) {
            for (int j = 0; j < 3; j++)
                if(y - 1 + i >= 0 && x - 1 + j >= 0 && y - 1 + i < size && x - 1 + j < size)
                    battlemap[x - 1 + j][y - 1 + i].setRestricted(true);
        }
        for (int i = 0; i < length; i++)
            battlemap[x][y + i].setShip(ship);
    }

    //Checks if you can place a ship in given place
    public String isSelectedPlaceFreeAndInBounds(Ship ship, int x, int y){
        int length = ship.getLength();
        if(ship.isVertical() && !(x + length > size)){
            for(int i = 0; i < length; i++){
                if(battlemap[x + i][y].getShip() != null)
                    return "You can't place ship on top of another";
                else if(battlemap[x + i][y].isRestricted())
                    return "You've put a ship too close to another. There must be one square gap between ships";
            }
        } else if(!ship.isVertical() && !(y + length > size)){
            for(int i = 0; i < length; i++){
                if (battlemap[x][y + i].getShip() != null)
                    return "You can't place ship on top of another";
                else if(battlemap[x][y + i].isRestricted())
                    return "You've put a ship too close to another. There must be one square gap between ships";
            }
        } else
            return "Out of bounds";
        return "Success";
    }

    public void shoot(int x, int y) {
        Square square = battlemap[x][y];
        square.setWasShot(true);
        if(square.getShip() != null)
            square.getShip().hit();
    }

    public void printTheGrid(){
        for(int i = 0; i < size; i++){
            for(int j = 0; j < size; j++){
                System.out.print(battlemap[i][j] + " ");
            }
            System.out.println();
        }
    }

}
