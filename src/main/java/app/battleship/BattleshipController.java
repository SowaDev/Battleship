package app.battleship;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

import java.io.IOException;

public class BattleshipController {
    private Battleship battleship;
    private Player player;
    private Player opponent;
    private Label[][] pFields;
    @FXML
    private GridPane shotGrid;
    @FXML
    private GridPane playersGrid;
    private final int playersGridSize = 30;
    private final int shootingGridSize = 39;

    public void createNewGame(Player player){
        this.player = player;
        this.opponent = new Player("Computer");
        this.battleship = new Battleship(player, this.opponent);
        battleship.prepareTheGameWithComputer();
    }

    public void prepare(){
        pFields = new Label[10][10];
        Label[][] oSquares = new Label[10][10];
        fillGrid(playersGrid, pFields, player.getGrid(), playersGridSize);
        fillGrid(shotGrid, oSquares, opponent.getGrid(), shootingGridSize);
    }

    public void fillGrid(GridPane gridpane, Label[][] fields, Grid grid, int size){
        for(int i = 0; i < 10; i++){
            for(int j = 0; j < 10; j++){
                fields[i][j] = new Label();
                Label field = fields[i][j];
                Square square = grid.getSquare(i, j);
                if((square.hasShip() && gridpane.equals(playersGrid)))
                //if((square.hasShip()))
                    field.setStyle("-fx-background-color: black");
                else
                    field.setStyle("-fx-background-color: gray");
                if(gridpane.equals(shotGrid))
                    field.setOnMouseClicked(this::handleMove);
                field.setPrefSize(size, size);
                gridpane.add(field, j, i);
            }
        }
    }

    public void handleMove(MouseEvent event) {
        Label field = (Label) event.getSource();
        int x = GridPane.getRowIndex(field), y = GridPane.getColumnIndex(field);
        Square square = opponent.getGrid().getSquare(x, y);
        System.out.println(x + " " + y);
        if(!square.wasShot()) {
            battleship.playerMove(x, y);
            revealTheSquare(field, square);
            handleEnemyMove(battleship.computerMove());
        }
    }

    public void handleEnemyMove(int [] xy){
        Grid playersGrid = player.getGrid();
        Label field = pFields[xy[0]][xy[1]];
        Square square = playersGrid.getSquare(xy[0], xy[1]);
        revealTheSquare(field, square);
    }


    public void revealTheSquare(Label field, Square square){
        if(square.hasShip())
            field.setStyle("-fx-background-color: red");
        else
            field.setStyle("-fx-background-color: lightblue");
        handleGameOver(battleship.checkIfGameIsOver());
    }

    public void handleGameOver(String whoWins){
        if(!whoWins.equals("No over")) {
            AlertBox prompt = new AlertBox();
            Stage stage = (Stage) playersGrid.getScene().getWindow();
            try {
                prompt.playAgainOrExit(whoWins, stage);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}