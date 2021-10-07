package app.battleship;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.io.IOException;

public class MainController {

    String playerName;
    @FXML
    private TextField nameInput;

    @FXML
    protected void onLetsGoButtonClick(ActionEvent event) throws IOException{
        if(nameInput.getText().isEmpty())
            playerName = nameInput.getPromptText();
        else
            playerName = nameInput.getText();
        Player player = new Player(playerName);
        goToShipPlacingScene(event);
    }

    public void goToShipPlacingScene(ActionEvent event) throws IOException{
        FXMLLoader loader = new FXMLLoader(getClass().getResource("shipPlacing.fxml"));
        Parent root = loader.load();
        ShipPlacingController shipPlacingController = loader.getController();
        shipPlacingController.prepareForShipPlacing(playerName);
        Stage stage = (Stage) (((Node) event.getSource()).getScene().getWindow());
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }

}