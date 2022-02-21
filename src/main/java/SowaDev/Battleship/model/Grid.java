package SowaDev.Battleship.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class Grid {
    public static final int SIZE = 10;
    private Square [][] battleMap;

    public Grid(){
        this.battleMap = new Square[SIZE][SIZE];
        for(int i = 0; i < SIZE; i++){
            for(int j = 0; j < SIZE; j++)
                this.battleMap[i][j] = new Square(j, i);
        }
    }

    public Square[][] getBattleMap() {
        return battleMap;
    }

    @Override
    public String toString(){
        StringBuilder builder = new StringBuilder();
        for(int i = 0; i < this.getBattleMap().length; i++){
            for(int j = 0; j < this.getBattleMap().length; j++){
                if(this.getBattleMap()[i][j].getShip() != null)
                    builder.append("1 ");
                else if(this.getBattleMap()[i][j].isRestricted())
                    builder.append("R ");
                else
                    builder.append("0 ");
            }
            builder.append("\n");
        }
        return builder.toString();
    }
}
