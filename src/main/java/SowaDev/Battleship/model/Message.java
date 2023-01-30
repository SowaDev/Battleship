package SowaDev.Battleship.model;

import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

@Setter
@Getter
public class Message {
    private String senderName;
    private String senderId;
    private String text;
    private String date;
    private String gameId;

    public Message(String senderName, String senderId, String text, String gameId) {
        this.senderName = senderName;
        this.text = text;
        this.gameId = gameId;
        this.senderId = senderId;
        Date d = new Date();
        this.date = new SimpleDateFormat("HH:mm").format(d);
    }
}
