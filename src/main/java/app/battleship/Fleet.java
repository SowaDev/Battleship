package app.battleship;

import java.util.ArrayList;

public class Fleet {
    private ArrayList<Ship> ships;
    String playerName;

    public Fleet(String playerName){
        this.playerName = playerName;
        ships = new ArrayList<>();
        ships.add(new Ship("Carrier", 5, playerName));
        ships.add(new Ship("Battleship", 4, playerName));
        ships.add(new Ship("Cruiser", 3, playerName));
        ships.add(new Ship("Destroyer", 2, playerName));
        ships.add(new Ship("Submarine", 2, playerName));
    }

    public ArrayList<Ship> getShips(){
        return ships;
    }

    public boolean areAllShipsSetSail(){
        int counter = 0;
        for(Ship ship : getShips()){
            if(ship.isSetSail())
                counter++;
        }
        return counter == getShips().size();
    }

    public boolean isFleetDestroyed(){
        int counter = 0;
        for(Ship ship : getShips()){
            if(ship.isDestroyed)
                counter++;
        }
        return counter == 5;
    }
}
