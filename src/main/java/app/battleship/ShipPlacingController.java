package app.battleship;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.*;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;


import java.io.IOException;

public class ShipPlacingController {
    private final int size = 39;
    private boolean dropped = false;
    private Player player;
    private Label[][] squares;
    AlertBox alertBox;

    @FXML
    private VBox shipBox;

    @FXML
    private GridPane gridPane;


    public void prepareForShipPlacing(String playerName) {
        player = new Player(playerName);
        fillGridPaneWithLabels();
        createShipButtons();
    }


    public void fillGridPaneWithLabels(){
        squares = new Label[10][10];
        for(int i = 0; i < squares.length; i++){
            for(int j = 0; j < squares.length; j++){
                squares[i][j] = new Label();
                Label square = squares[i][j];
                square.setStyle("-fx-background-color: white");
                square.setOnDragEntered(this::handleDragEntered);
                square.setOnDragOver(this::handleDragOver);
                square.setOnDragExited(this::handleDragExited);
                square.setOnDragDropped(this::handleDragDropped);
                square.setPrefSize(size,size);
                gridPane.add(square,j,i);
            }
        }
    }

    //creates ship buttons with size corresponding to their length
    public void createShipButtons(){
        for(Ship ship : player.getFleet().getShips()){
            Button shipButton = new Button();
            shipButton.setText(ship.getName());
            shipButton.setPrefSize(size * ship.getLength(), size);
            shipButton.setUserData(ship);
            shipButton.setOnDragDetected(this::handleDragDetected);
            shipButton.setOnDragDone(this::handleDragDone);
            shipBox.getChildren().add(shipButton);
        }
    }

    //Start of drag by clicking on the button and moving the mouse
    public void handleDragDetected(MouseEvent event){
        Button sourceButton = (Button) event.getSource();
        Dragboard db = sourceButton.startDragAndDrop(TransferMode.ANY);
        ClipboardContent content = new ClipboardContent();
        content.putString(sourceButton.getText());
        db.setContent(content);
        event.consume();
    }

    //Color labels when you drag the ship over tiles
    public void handleDragEntered(DragEvent event){
        Label square = (Label) event.getTarget();
        Button shipButton = (Button)event.getGestureSource();
        colorTheSquares(square, shipButton, "gray");
        event.consume();
    }

    //Determines which objects can accept the data
    public void handleDragOver(DragEvent event){
        if(event.getDragboard().hasString())
            event.acceptTransferModes(TransferMode.ANY);
        event.consume();
    }

    //Color Labels black when you drop the ship on its place
    public void handleDragDropped(DragEvent event){
        Label square = (Label) event.getTarget();
        Button shipButton = (Button)event.getGestureSource();
        Ship ship = (Ship) shipButton.getUserData();
        String result = (player.getGrid().placeShip(ship, GridPane.getRowIndex(square), GridPane.getColumnIndex(square)));
        if(result.equals("Success")){
            colorTheSquares(square, shipButton, "black");
            dropped = true;
        } else {
            AlertBox.display("Wrong placement", result);
            dropped = false;
        }
        event.setDropCompleted(dropped);
        event.consume();
    }

    //Color Labels back to their original color when moving the ship forward
    public void handleDragExited(DragEvent event){
        Label square = (Label) event.getTarget();
        Button shipButton = (Button)event.getGestureSource();
        if(!dropped)
            colorTheSquares(square, shipButton, "white");
        else
            dropped = false;
        event.consume();
    }

    //Finalize Drag action and removes the button
    public void handleDragDone(DragEvent event){
        Button sourceButton = (Button) event.getSource();
        if(event.getTransferMode() == TransferMode.MOVE){
            Dragboard db = event.getDragboard();
            //System.out.println(db.getString());
            shipBox.getChildren().remove(sourceButton);
            //sourceButton.setVisible(false);
        }
        event.consume();
    }

    //Rotates the ship
    public void handleDragToRotate(DragEvent event){
        Button shipButton = (Button)event.getGestureSource();
        ((Ship)(shipButton.getUserData())).setVertical(!((Ship) (shipButton.getUserData())).isVertical());
    }

    public void colorGridPaneAccordinglyToTheGrid(){
        for(int i = 0; i < 10; i++){
            for(int j = 0; j < 10; j++){
                Square square = player.getGrid().getBattlemap()[i][j];
                if(square.getShip() != null)
                    squares[i][j].setStyle("-fx-background-color: black");
            }
        }
    }

    //Put ships at random
    public void randomSetup(){
        player.putShipsAtRandom();
        colorGridPaneAccordinglyToTheGrid();
        shipBox.getChildren().removeAll(shipBox.getChildren());
    }


    //Colors the squares during drag event
    public void colorTheSquares(Label square, Button shipButton, String color) {
        Ship ship = ((Ship)(shipButton.getUserData()));
        int length = ship.getLength();
        int x = GridPane.getRowIndex(square), y = GridPane.getColumnIndex(square);
        for (int i = 0; i < length; i++) {
            if(ship.isVertical()) {
                if (x + i > 9)
                    break;
                square = squares[x + i][y];
            } else {
                if (y + i > 9)
                    break;
                square = squares[x][y + i];
            }
            if (!square.getStyle().equals("-fx-background-color: black"))
                square.setStyle("-fx-background-color: " + color);
        }
    }


    public void goToBattleship(ActionEvent event) throws IOException {
        if(player.getFleet().areAllShipsSetSail()) {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("battleship.fxml"));
            Parent root = loader.load();
            BattleshipController battleshipController = loader.getController();
            battleshipController.createNewGame(player);
            battleshipController.prepare();
            Stage stage = (Stage) (((Node) event.getSource()).getScene().getWindow());
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.show();
        } else
            System.out.println("You haven't placed all of your ships");
    }


}
