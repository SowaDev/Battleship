package app.battleship;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.ClipboardContent;
import javafx.scene.input.Dragboard;
import javafx.scene.input.MouseEvent;
import javafx.scene.input.TransferMode;
import javafx.scene.layout.GridPane;

public class Notes {

    public class ShipPlacingController {
        @FXML
        GridPane grid;

        @FXML
        Button fillButton;

        @FXML
        private Button sourceButton;

        @FXML
        public void fillGridPaneWithLabels(){
            //Label[][] squares = new Label [10][10];
            for(int i = 0; i < grid.getColumnCount(); i++){
                for(int j = 0; j <grid.getRowCount(); j++){
                    Label square = new Label();
//                squares[i][j] = new Label();
//                Label square = squares[i][j];
                    square.setStyle("-fx-background-color: white");
                square.setOnDragEntered(event -> {
                    square.setStyle("-fx-background-color: gray");
                    event.consume();
                });
                square.setOnDragOver(event -> {
                    event.acceptTransferModes(TransferMode.COPY_OR_MOVE);
                    event.consume();
                });
                square.setOnDragExited(event -> {
                    square.setStyle("-fx-background-color: white");
                    event.consume();
                });
                square.setOnDragDropped(event -> {
                    square.setStyle("-fx-background-color: black");
                    event.consume();
                });
                    square.setStyle("-fx-background-color: black");
                    square.setPrefSize(40,40);
                    grid.add(square,i,j);
                }
            }
        }

        //Start of drag by clicking on the button and moving the mouse
        public void handleDragDetected(MouseEvent event){
            Dragboard db = sourceButton.startDragAndDrop(TransferMode.ANY);
            //////////////////////////////////////////////////////////
            ////// is that necessary???????? /////////////////////////
            ClipboardContent content = new ClipboardContent();
            content.putString(sourceButton.getText());
            db.setContent(content);
            event.consume();
}        }


}
