package app.battleship;

public class Square {
    int x, y;
    private Ship ship;
    private boolean wasShot;
    private boolean isRestricted;

    public Square(int x, int y){
        this.ship = null;
        this.wasShot = false;
        this.x = x;
        this.y = y;
    }

    public boolean hasShip(){
        return this.ship != null;
    }

    public Ship getShip(){
        return ship;
    }

    public void setShip(Ship ship){
        this.ship = ship;
    }

    public boolean isRestricted() {
        return isRestricted;
    }

    public void setRestricted(boolean restricted) {
        isRestricted = restricted;
    }

    public boolean wasShot() {
        return wasShot;
    }

    public void setWasShot(boolean wasShot) {
        this.wasShot = wasShot;
    }

}
