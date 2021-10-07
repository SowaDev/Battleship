package app.battleship;

public class Ship {
    private String playerName;
    private String name;
    private int length;
    private int life;
    private boolean isSetSail;
    private boolean isVertical;
    public boolean isDestroyed;

    public Ship(String name, int length, String playerName) {
        this.playerName = playerName;
        this.name = name;
        this.length = length;
        this.life = length;
    }

    public boolean isSetSail() {
        return isSetSail;
    }

    public void setSail(boolean isSetSail){
        this.isSetSail = isSetSail;
    }

    public String getName() {
        return name;
    }

    public int getLength() {
        return length;
    }

    public boolean isVertical() {
        return isVertical;
    }

    public void setVertical(boolean vertical) {
        isVertical = vertical;
    }

    public void hit(){
        this.life = life - 1;
        if(this.life == 0) {
            this.isDestroyed = true;
            System.out.println(playerName + "'s " + name + " has been destroyed");
        }
    }
}
