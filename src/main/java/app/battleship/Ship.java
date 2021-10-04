package app.battleship;

public class Ship {
    private String name;
    private int length;
    private int life;
    private char symbol;
    private boolean isSetSail;
    private boolean isVertical;
    public boolean isDestroyed;
    public boolean opponent;

    public Ship(String name, int length, char symbol) {
        this.name = name;
        this.length = length;
        this.life = length;
        this.symbol = symbol;
    }

    public Ship(String name, int length, char symbol, boolean opponent) {
        this.name = name;
        this.length = length;
        this.life = length;
        this.symbol = symbol;
        this.opponent = opponent;
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

    public void setName(String name) {
        this.name = name;
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

    public char getSymbol() {
        return symbol;
    }


    public void hit(){
        this.life = life - 1;
        if(this.life == 0) {
            this.isDestroyed = true;
            if(opponent)
                System.out.println("Enemy " + this.name + " has been sunk");
            else
                System.out.println("Your " + this.name + " has been sunk");
        }
    }
}
