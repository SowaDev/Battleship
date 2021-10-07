package app.battleship;

import java.util.Random;

public class Player {
    private String playerName;
    private Grid grid;
    private Fleet fleet;

    public Player(String name) {
        this.playerName = name;
        this.grid = new Grid();
        fleet = new Fleet(playerName);
    }

    public Fleet getFleet(){
        return fleet;
    }

    public Grid getGrid(){
        return grid;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }


    public void putShipsAtRandom(){
        Random rand = new Random();
        int x, y;
        for(Ship ship : getFleet().getShips()){
            while(!ship.isSetSail()) {
                boolean direction = rand.nextBoolean();
                ship.setVertical(direction);
                if(ship.isVertical()) {
                    x = rand.nextInt(10 - ship.getLength());
                    y = rand.nextInt(10);
                } else {
                    x = rand.nextInt(10);
                    y = rand.nextInt(10 - ship.getLength());
                }
                getGrid().placeShip(ship, x, y);
            }
        }
    }
}
