package app.battleship;

import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

import java.io.IOException;

public class BattleshipController {
    private Battleship battleship;
    private final int playersGridSize = 30;
    private final int shootingGridSize = 39;
    private Label[][] pSquares;
    private Label[][] oSquares;
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
        pSquares = new Label[10][10];
        oSquares = new Label[10][10];
        fillGrid(playersGrid, pSquares, battleship.getPlayersGrid(), playersGridSize);
        fillGrid(shotGrid, oSquares, battleship.getOpponentsGrid(), shootingGridSize);
    }

    public void fillGrid(GridPane gridpane, Label[][] squares, Grid grid, int size){
        for(int i = 0; i < 10; i++){
            for(int j = 0; j < 10; j++){
                squares[i][j] = new Label();
                Label square = squares[i][j];
                char field = grid.getBattlemap()[i][j];
                if(field == 'C' || field == 'B' || field == 'R' || field == 'D' || field == 'S')
                    square.setStyle("-fx-background-color: black");
                else
                    square.setStyle("-fx-background-color: gray");
                if(gridpane.equals(shotGrid))
                    square.setOnMouseClicked(this::handleMove);
                square.setPrefSize(size, size);
                gridpane.add(square, j, i);
            }
        }
    }

    public void handleMove(MouseEvent event) {
        Label square = (Label) event.getSource();
        int x = GridPane.getRowIndex(square), y = GridPane.getColumnIndex(square);
        char shotResult = battleship.playerMove(x,y);
        if(shotResult != '2') {
            revealTheSquare(shotResult, square);
            handleEnemyMove(battleship.computerMove());
        }
    }

    public void handleEnemyMove(int [] xy){
        Grid playersGrid = battleship.getPlayersGrid();
        Label square = pSquares[xy[0]][xy[1]];
        char field = playersGrid.getBattlemap()[xy[0]][xy[1]];
        revealTheSquare(field, square);
    }


    public void revealTheSquare(char shotResult, Label square){
        if(shotResult == 'M')
            square.setStyle("-fx-background-color: lightblue");
        else if(shotResult != '2') {
            square.setStyle("-fx-background-color: red");
            handleGameOver(battleship.checkIfGameIsOver());
        }
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