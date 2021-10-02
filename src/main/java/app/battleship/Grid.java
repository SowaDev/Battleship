package app.battleship;

public class Grid {
    public static final int size = 10;
    private char [][] battlemap;

    Grid(){
        battlemap = new char[size][size];
        for(int i = 0; i < size; i++){
            for(int j = 0; j < size; j++)
                battlemap[i][j] = '0';
        }
    }

    public char[][] getBattlemap() {
        return battlemap;
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
        int length = ship.getLength();
        char shipSymbol = ship.getSymbol();
        if(ship.isVertical())
            markVertical(x, y, length, shipSymbol);
        else
            markHorizontal(x, y, length, shipSymbol);
    }

    public void markVertical(int x, int y, int length, char symbol){
        for (int i = 0; i < length + 2; i++) {
            for (int j = 0; j < 3; j++)
                if(x - 1 + i >= 0 && y - 1 + j >= 0 && x - 1 + i < size && y - 1 + j < size)
                    battlemap[x - 1 + i][y - 1 + j] = 'T';
        }
        for(int i = 0; i < length; i++)
            battlemap[x + i][y] = symbol;
    }

    public void markHorizontal(int x, int y, int length, char symbol){
        for (int i = 0; i < length + 2; i++) {
            for (int j = 0; j < 3; j++)
                if(y - 1 + i >= 0 && x - 1 + j >= 0 && y - 1 + i < size && x - 1 + j < size)
                    battlemap[x - 1 + j][y - 1 + i] = 'T';
        }
        for (int i = 0; i < length; i++)
            battlemap[x][y + i] = symbol;
    }


    //Checks if you can place a ship in given place
    public String isSelectedPlaceFreeAndInBounds(Ship ship, int x, int y){
        int length = ship.getLength();
        if(ship.isVertical() && !(x + length > size)){
            for(int i = 0; i < length; i++){
                if (battlemap[x + i][y] != '0' && battlemap[x + i][y] != 'T')
                    return "You can't place ship on top of another";
                else if(battlemap[x + i][y] == 'T')
                    return "You've put a ship too close to another. There must be one square gap between ships";
            }
        } else if(!ship.isVertical() && !(y + length > size)){
            for(int i = 0; i < length; i++){
                if (battlemap[x][y + i] != '0' && battlemap[x][y + i] != 'T')
                    return "You can't place ship on top of another";
                else if(battlemap[x][y + i] == 'T')
                    return "You've put a ship too close to another. There must be one square gap between ships";
            }
        } else
            return "Out of bounds";
        return "Success";
    }


    //Returns ships symbol if hit, M when missed, 2 when already shot at that square
    public char shoot(int x, int y) {
        char field = battlemap[x][y];
        if (field == 'C' || field == 'B' || field == 'R' || field == 'D' || field == 'S') {
            battlemap[x][y] = 'H';
            return field;
        } else if (field == 'H' || field == 'M') {
            return '2';
        } else {
            battlemap[x][y] = 'M';
            return 'M';
        }
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
