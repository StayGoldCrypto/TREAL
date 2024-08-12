
use gtest::{System, Program};

use pebbles_game_io::{PebblesInit, PebblesAction, PebblesEvent, DifficultyLevel, GameState, Player};

#[test]
fn test_game_initialization() {
    let system = System::new();
    let program = Program::current(&system);

    let init = PebblesInit {
        difficulty: DifficultyLevel::Easy,
        pebbles_count: 15,
        max_pebbles_per_turn: 2,
    };

    let result: Result<(), String> = program.send(1, init);
    
  assert!(result.is_ok());

    let game_state: GameState = program.send(1, "state").expect("Unable to get state");
    assert_eq!(game_state.pebbles_count, 15);
    assert_eq!(game_state.max_pebbles_per_turn, 2);
    assert_eq!(game_state.pebbles_remaining, 15);
    assert!(game_state.first_player == Player::User || game_state.first_player == Player::Program);
}
