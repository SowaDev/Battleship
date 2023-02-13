package SowaDev.Battleship.controller;

import SowaDev.Battleship.model.Game;
import SowaDev.Battleship.model.Message;
import SowaDev.Battleship.model.Shot;
import SowaDev.Battleship.service.BattleshipService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    private final BattleshipService battleshipService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    public WebSocketController(BattleshipService battleshipService, SimpMessagingTemplate simpMessagingTemplate) {
        this.battleshipService = battleshipService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @MessageMapping("/shot")
    public void receiveShot(@Payload Shot shot){
        Game game = battleshipService.playerMove(shot);
        String gameJson = battleshipService.convertToJson(game);
        String logJson = battleshipService.addLogEntry(game, shot);
        simpMessagingTemplate.convertAndSend("/log/" + shot.getGameId(), logJson);
        simpMessagingTemplate.convertAndSend("/game/" + shot.getGameId(), gameJson);
//        return game;
    }

    @MessageMapping("/message")
    public void receiveChatMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSend("/chat/" + message.getGameId(), message);
        battleshipService.addMessage(message);
//        return message;
    }
}
