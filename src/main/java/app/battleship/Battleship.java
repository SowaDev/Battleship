package app.battleship;

import java.util.*;

public class Battleship {
    private Player player;
    private Player opponent;
    private boolean huntMode;
    ArrayList<int []> lastHits;
    ArrayList<int []> possibleShots;

    Battleship(Player player, Player opponent) {
        this.player = player;
        this.opponent = opponent;
    }

    public boolean isHuntMode() {
        return huntMode;
    }

    public void setHuntMode(boolean huntMode) {
        this.huntMode = huntMode;
    }

    public void prepareTheGameWithComputer(){
        opponent.putShipsAtRandom();
        lastHits = new ArrayList<>();
        possibleShots = new ArrayList<>();
    }

    private void randomShot(Grid grid){
        Random rand = new Random();
        int x = rand.nextInt(10), y = rand.nextInt(10);
        grid.shoot(x, y);
    }

    public void playerMove(int x, int y) {
        opponent.getGrid().shoot(x, y);
    }

    public int[] computerMove(){
        Random rand = new Random();
        int x, y;
        int[] huntResult;
        if(isHuntMode()) {
            huntResult = hunt();
            x = huntResult[0];
            y = huntResult[1];
        }
        else {
            do {
                x = rand.nextInt(10);
                y = rand.nextInt(10);
            } while (player.getGrid().getSquare(x, y).wasShot());
        }
        player.getGrid().shoot(x, y);
        Square square = player.getGrid().getSquare(x, y);
        if (square.hasShip()) {
            setHuntMode(true);
            lastHits.add(new int[]{x, y});
            if(square.getShip().isDestroyed){
                lastHits.clear();
                setHuntMode(false);
            }
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
            Square square = player.getGrid().getBattlemap()[x][y];
            if(!square.wasShot())
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
        if(player.getFleet().isFleetDestroyed())
            return "Computer wins";
        if(opponent.getFleet().isFleetDestroyed())
            return "You win";
        return "No over";
    }

}
