package app.battleship;

import java.util.ArrayList;
import java.util.Random;

public class Player {
    private String name;
    private Grid grid;
    private ArrayList<Ship> fleet;

    public Player(String name) {
        this.name = name;
        this.grid = new Grid();
        createFleet();
    }

    public ArrayList<Ship> getFleet(){
        return fleet;
    }

    public Grid getGrid(){
        return grid;
    }

    public void createFleet(){
        fleet = new ArrayList<>();
        fleet.add(new Ship("Carrier", 5, 'C'));
        fleet.add(new Ship("Battleship", 4, 'B'));
        fleet.add(new Ship("Cruiser", 3, 'R'));
        fleet.add(new Ship("Destroyer", 2, 'D'));
        fleet.add(new Ship("Submarine", 2, 'S'));
    }

    public boolean isFleetDestroyed(){
        int counter = 0;
        for(Ship ship : fleet){
            if(ship.isDestroyed)
                counter++;
        }
        return counter == 5;
    }

    public boolean areAllShipsSetSail(){
        int counter = 0;
        for(Ship ship : fleet){
            if(ship.isSetSail())
                counter++;
        }
        return counter == fleet.size();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public void putShipsAtRandom(){
        Random rand = new Random();
        int x, y;
        for(Ship ship : getFleet()){
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
