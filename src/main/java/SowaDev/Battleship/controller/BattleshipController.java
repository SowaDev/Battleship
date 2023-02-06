package SowaDev.Battleship.controller;

import SowaDev.Battleship.model.Game;
import SowaDev.Battleship.model.Player;
import SowaDev.Battleship.model.Shot;
import SowaDev.Battleship.service.BattleshipService;
import SowaDev.Battleship.service.GameService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@SessionAttributes({"player", "game"})
@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BattleshipController {
    private final BattleshipService battleshipService;
    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public BattleshipController(BattleshipService battleshipService, GameService gameService,
                                SimpMessagingTemplate simpMessagingTemplate){
        this.battleshipService = battleshipService;
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @GetMapping
    public Game getGame(Model model){
        Player player = (Player) model.getAttribute("player");
        return gameService.play(player);
    }

    @PostMapping("/shoot")
    public Game shoot(@RequestBody Shot shot){
        Game game = battleshipService.playerMove(shot);
        String gameJson = battleshipService.convertToJson(game);
        simpMessagingTemplate.convertAndSend("/game/" + shot.getGameId(), gameJson);
        return game;
    }
}
