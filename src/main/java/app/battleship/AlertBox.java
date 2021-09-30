package app.battleship;

import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;

import java.io.IOException;

public class AlertBox {
    public static void display(String title, String message) {
        Stage window = new Stage();
        //Block events to other windows
        window.initModality(Modality.APPLICATION_MODAL);
        window.setTitle(title);
        window.setMinWidth(400);
        window.setMinHeight(100);
        Label label = new Label();
        label.setText(message);
        Button closeButton = new Button("Ok");
        closeButton.setOnAction(e -> window.close());
        VBox layout = new VBox(10);
        layout.getChildren().addAll(label, closeButton);
        layout.setAlignment(Pos.CENTER);
        //Display window and wait for it to be closed before returning
        Scene scene = new Scene(layout);
        window.setScene(scene);
        window.showAndWait();
    }

    public void playAgainOrExit(String whoWon, Stage stage) throws IOException{
        Stage window = new Stage();
        //Block events to other windows
        window.initModality(Modality.APPLICATION_MODAL);
        window.setTitle("Game Over");
        window.setMinWidth(400);
        window.setMinHeight(100);

        Label label = new Label();
        label.setText(whoWon);
        Button closeButton = new Button("Exit");
        closeButton.setOnAction(e -> System.exit(0));

        Button playAgain = new Button("Play again");
        playAgain.setOnAction(event -> {
            try {
                goToShipPlacing(event, stage);
            } catch (IOException e) {
                e.printStackTrace();
            }
            window.close();
        });
        VBox layout = new VBox(10);
        layout.getChildren().addAll(label, closeButton, playAgain);
        layout.setAlignment(Pos.CENTER);
        //Display window and wait for it to be closed before returning
        Scene scene = new Scene(layout);
        window.setScene(scene);
        window.showAndWait();
    }

    public void goToShipPlacing(ActionEvent event, Stage stage) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("shipPlacing.fxml"));
        Parent root = loader.load();
        ShipPlacingController shipPlacingController = loader.getController();
        shipPlacingController.prepareForShipPlacing();
        //Stage stage = (Stage) (((Node) event.getSource()).getScene().getWindow());
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }
}
