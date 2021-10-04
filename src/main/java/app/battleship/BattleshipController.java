package app.battleship;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

import java.io.IOException;

public class BattleshipController {
    private Battleship battleship;
    private final int playersGridSize = 30;
    private final int shootingGridSize = 39;
    private Label[][] pfields;
    @FXML
    private GridPane shotGrid;
    @FXML
    private GridPane playersGrid;
    @FXML
    public Label whoseTurnIsIt;


    public void setBattleship(Battleship battleship){
        this.battleship = battleship;
    }

    public void setWhoseTurnIsIt(boolean isPlayerTurn){
        if(isPlayerTurn)
            whoseTurnIsIt.setText("Your turn");
        else
            whoseTurnIsIt.setText("Computer turn");
    }

    public void prepare(){
        pfields = new Label[10][10];
        Label[][] oSquares = new Label[10][10];
        fillGrid(playersGrid, pfields, battleship.getPlayersGrid(), playersGridSize);
        fillGrid(shotGrid, oSquares, battleship.getOpponentsGrid(), shootingGridSize);
    }

    public void fillGrid(GridPane gridpane, Label[][] fields, Grid grid, int size){
        for(int i = 0; i < 10; i++){
            for(int j = 0; j < 10; j++){
                fields[i][j] = new Label();
                Label field = fields[i][j];
                Square square = grid.getSquare(i, j);
                if((square.hasShip() && gridpane.equals(playersGrid)))
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
        Square square = battleship.getOpponentsGrid().getSquare(x, y);
        System.out.println(x + " " + y);
        if(!square.wasShot()) {
            battleship.playerMove(x, y);
            revealTheSquare(field, square);
            handleEnemyMove(battleship.computerMove());
        }
    }

    public void handleEnemyMove(int [] xy){
        Grid playersGrid = battleship.getPlayersGrid();
        Label field = pfields[xy[0]][xy[1]];
        Square square = playersGrid.getSquare(xy[0], xy[1]);
        //char field = playersGrid.getBattlemap()[xy[0]][xy[1]];
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