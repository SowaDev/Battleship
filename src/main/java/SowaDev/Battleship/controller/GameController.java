package SowaDev.Battleship.controller;

import SowaDev.Battleship.service.BattleshipService;
import SowaDev.Battleship.service.GameService;
import SowaDev.Battleship.service.ShipPlacingService;
import SowaDev.Battleship.model.*;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@SessionAttributes({"player", "game"})
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class GameController {
    private final ShipPlacingService shipPlacingService;
    private final BattleshipService battleshipService;
    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

//    @Autowired
//    private Grid grid;

    public GameController(ShipPlacingService shipPlacingService, BattleshipService battleshipService, GameService gameService, SimpMessagingTemplate simpMessagingTemplate) {
        this.shipPlacingService = shipPlacingService;
        this.battleshipService = battleshipService;
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @ModelAttribute("player")
    public Player getPlayer(){
        return shipPlacingService.createPlayer();
    }

    @GetMapping
    public Player getAttributes(@ModelAttribute("player") Player player, HttpSession httpSession){
        return player;
    }

    @PutMapping
    public PlacementResponse placeShip(@RequestBody ShipPlacement shipPlacement,
                            @ModelAttribute("player") Player player){
        //        model.addAttribute("player", player);
        return shipPlacingService.placeShip(player, shipPlacement);
    }

    @DeleteMapping()
    public Grid removeShip(@RequestBody String shipName, @ModelAttribute("player") Player player){
        return shipPlacingService.removeShip(player, shipName);
    }

    @PutMapping("/randomPlacement")
    public Grid putShipsAtRandom(@ModelAttribute("player") Player player){
        return shipPlacingService.putShipsAtRandom(player);
    }

    @PutMapping("/removeShips")
    public Grid removeAllShips(@ModelAttribute("player") Player player){
        return shipPlacingService.removeAllShips(player);
    }

    @PostMapping("/play")
    public Game play(@ModelAttribute("player") Player player, Model model,
                     @RequestBody String name){
        Game game = gameService.play(player, name);
        model.addAttribute("game", game);
        return game;
    }

    @GetMapping("/game")
    public Game getGame(Model model) {
        Game game = (Game) model.getAttribute("game");
        String gameId = game != null ? game.getGameId() : null;
        return battleshipService.getGame(gameId);
    }


    @PostMapping("/shoot")
    public Game shoot(@RequestBody Shot shot){
        Game game = battleshipService.playerMove(shot);
        String gameJson = battleshipService.convertToJson(game);
        simpMessagingTemplate.convertAndSend("/topic/game/" + shot.getGameId(), gameJson);
        return game;
    }
}
