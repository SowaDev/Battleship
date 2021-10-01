package app.battleship;

import java.util.*;

public class Battleship {
    private ArrayList<Ship> playersFleet;
    private ArrayList<Ship> opponentsFleet;
    private Grid playersGrid;
    private Grid opponentsGrid;
    private boolean isPlayersTurn = true;
    private boolean isGameOver;
    private boolean huntMode;
    ArrayList<int []> lastHits;
    ArrayList<int []> possibleShots;

    Battleship() {
        playersFleet = new ArrayList<Ship>();
        addShipsToTheFleet(playersFleet);
        playersGrid = new Grid();
    }

    public boolean isHuntMode() {
        return huntMode;
    }

    public void setHuntMode(boolean huntMode) {
        this.huntMode = huntMode;
    }

    public ArrayList<Ship> getPlayersFleet(){
        return playersFleet;
    }

    public Grid getPlayersGrid() {
        return playersGrid;
    }

    public Grid getOpponentsGrid() {
        return opponentsGrid;
    }

    public boolean isPlayersTurn() {
        return isPlayersTurn;
    }

    public void setPlayersTurn(boolean playersTurn) {
        isPlayersTurn = playersTurn;
    }

    public void prepareTheGameWithComputer(){
        opponentsFleet = new ArrayList<Ship>();
        opponentsGrid = new Grid();
        addShipsToTheFleet(opponentsFleet);
        putShipsAtRandom(opponentsFleet, opponentsGrid);
        lastHits = new ArrayList<>();
        possibleShots = new ArrayList<>();
    }

    public void addShipsToTheFleet(ArrayList<Ship> fleet){
        fleet.add(new Ship("Carrier", 5, 'C'));
        fleet.add(new Ship("Battleship", 4, 'B'));
        fleet.add(new Ship("Cruiser", 3, 'R'));
        fleet.add(new Ship("Destroyer", 2, 'D'));
        fleet.add(new Ship("Submarine", 2, 'S'));
    }

    public boolean areAllShipsSetSail(){
        int counter = 0;
        for(Ship ship : playersFleet){
            if(ship.isSetSail())
                counter++;
        }
        return counter == playersFleet.size();
    }

    public void putShipsAtRandom(ArrayList<Ship> fleet, Grid grid){
        Random rand = new Random();
        int x, y;
        for(Ship ship : fleet){
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
                grid.placeShip(ship, x, y);
            }
        }
    }

    private void randomShot(Grid grid){
        Random rand = new Random();
        int x = rand.nextInt(10), y = rand.nextInt(10);
        grid.shoot(x, y);
    }

    public char playerMove(int x, int y) {
        char shotResult = opponentsGrid.shoot(x, y);
        if(shotResult == 'C' || shotResult == 'B' || shotResult == 'R' || shotResult == 'D' || shotResult == 'S')
            hitTheShip(shotResult, opponentsFleet);
        return shotResult;
    }

    public int[] computerMove(){
        Random rand = new Random();
        int x, y;
        int[] huntResult;
        char shotResult;
        if(isHuntMode()) {
            huntResult = hunt();
            x = huntResult[0];
            y = huntResult[1];
            shotResult = playersGrid.shoot(x, y);
        }
        else {
            do {
                x = rand.nextInt(10);
                y = rand.nextInt(10);
                shotResult = playersGrid.shoot(x, y);
            } while (shotResult == '2');
        }
        if (shotResult == 'C' || shotResult == 'B' || shotResult == 'R' || shotResult == 'D' || shotResult == 'S') {
            setHuntMode(true);
            lastHits.add(new int[]{x, y});
            hitTheShip(shotResult, playersFleet);
        }
        return new int[]{x, y};
    }

    //Makes computer sink the ship after it makes a first hit
    private int[] hunt() {
        Random rand = new Random();
        int [] result;
        if(lastHits.size() == 1)
            shotAround();
        else
            shotOnTheSides();
        int random = rand.nextInt(possibleShots.size());
        result = possibleShots.get(random);
        possibleShots.clear();
        return result;
    }

    //check whether x,y are inside the grid and
    //if x,y has already been shot at
    public void addIfViable(int x, int y){
        if(x > -1 && x < 10 && y > -1 && y < 10){
            char mark = playersGrid.getBattlemap()[x][y];
            if(mark != 'M')
                possibleShots.add(new int[]{x,y});
        }
    }

    //Shot around the square to find 2nd hit
    public void shotAround(){
        int x = lastHits.get(0)[0], y = lastHits.get(0)[1];
        addIfViable(x - 1, y);
        addIfViable(x + 1, y);
        addIfViable(x, y - 1);
        addIfViable(x, y + 1);
    }

    //Shot on the sides until ship sinks
    public void shotOnTheSides(){
        int x = lastHits.get(0)[0], y = lastHits.get(0)[1];
        boolean isVertical = lastHits.get(0)[1] == lastHits.get(1)[1];
        if(isVertical){
            int min = verticalMinMax(x)[0], max = verticalMinMax(x)[1];
            addIfViable(min - 1, y);
            addIfViable(max + 1, y);
        } else {
            int min = horizontalMinMax(y)[0], max = horizontalMinMax(y)[1];
            addIfViable(x, min - 1);
            addIfViable(x, max + 1);
        }
    }


    public int[] verticalMinMax(int x){
        int min = x, max = x;
        for(int[] hit : lastHits){
            if(min > hit[0])
                min = hit[0];
            if(max < hit[0])
                max = hit[0];
        }
        return new int[]{min, max};
    }

    public int[] horizontalMinMax(int y){
        int min = y, max = y;
        for(int[] hit : lastHits){
            if(min > hit[1])
                min = hit[1];
            if(max < hit[1])
                max = hit[1];
        }
        return new int[]{min, max};
    }


    public String checkIfGameIsOver(){
        if(isFleetDestroyed(playersFleet))
            return "Computer wins";
        if(isFleetDestroyed(opponentsFleet))
            return "You win";
        return "No over";
    }

    public boolean isFleetDestroyed(ArrayList<Ship> fleet){
        int counter = 0;
        for(Ship ship : fleet){
            if(ship.isDestroyed)
                counter++;
        }
        return counter == 5;
    }

    public void hitTheShip(char shotResult, ArrayList<Ship> fleet) {
        for(Ship ship : fleet){
            if (ship.getSymbol() == shotResult) {
                ship.hit();
                if (ship.isDestroyed && fleet.equals(opponentsFleet))
                    System.out.println("Enemy " + ship.getName() + " has been sunk");
                else if (ship.isDestroyed && fleet.equals(playersFleet)) {
                    System.out.println("Your " + ship.getName() + " has been sunk");
                    lastHits.clear();
                    huntMode = false;
                }
            }
        }
    }

}
