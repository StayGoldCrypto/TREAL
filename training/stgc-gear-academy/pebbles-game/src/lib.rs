use pebbles_game_io::{PebblesInit, PebblesAction, PebblesEvent, GameState, Player, DifficultyLevel};

use gstd::{msg, exec, prelude::*};

static mut GAME_STATE: Option<GameState> = None;

fn get_random_u32() -> u32 {
    let salt = msg::id();
    let (hash, _num) = exec::random(salt.into()).expect("get_random_u32(): random call failed");
    u32::from_le_bytes([hash[0], hash[1], hash[2], hash[3]])
}

#[no_mangle]
extern "C" fn init() {
    let init_data: PebblesInit = msg::load().expect("Unable to load init data");
    assert!(init_data.pebbles_count > 0, "Pebbles counting must be greater than zero");
    assert!(init_data.max_pebbles_per_turn > 0, "Max pebbles per turn must be greater than zero");
    
    let first_player = if get_random_u32() % 2 == 0 { Player::User } else { Player::Program };
    
    let mut game_state = GameState {
        pebbles_count: init_data.pebbles_count,
        max_pebbles_per_turn: init_data.max_pebbles_per_turn,
        pebbles_remaining: init_data.pebbles_count,
        difficulty: init_data.difficulty,
        first_player: first_player.clone(),
        winner: None,
    };

    if let Player::Program = first_player {
        let pebbles_to_remove = if game_state.difficulty == DifficultyLevel::Easy {
            (get_random_u32() % game_state.max_pebbles_per_turn + 1)
        } else {
            1 
        };
        game_state.pebbles_remaining -= pebbles_to_remove;
        msg::reply(PebblesEvent::CounterTurn(pebbles_to_remove), 0).expect("Unable to reply");
    }

    unsafe {
        GAME_STATE = Some(game_state);
    }
}

#[no_mangle]
extern "C" fn handle() {
    let action: PebblesAction = msg::load().expect("Unable to load action");
    let mut game_state = unsafe { GAME_STATE.as_mut().expect("Game not initialized") };

    match action {
        PebblesAction::Turn(pebbles) => {
            assert!(pebbles > 0 && pebbles <= game_state.max_pebbles_per_turn, "Invalid number of pebbles");

            game_state.pebbles_remaining -= pebbles;

            if game_state.pebbles_remaining == 0 {
                game_state.winner = Some(Player::User);
                msg::reply(PebblesEvent::Won(Player::User), 0).expect("Unable to reply");
                return;
            }

            let pebbles_to_remove = if game_state.difficulty == DifficultyLevel::Easy {
                (get_random_u32() % game_state.max_pebbles_per_turn + 1)
            } else {
                1 
            };

            game_state.pebbles_remaining -= pebbles_to_remove;

            if game_state.pebbles_remaining == 0 {
                game_state.winner = Some(Player::Program);
                msg::reply(PebblesEvent::Won(Player::Program), 0).expect("Unable to reply");
            } else {
                msg::reply(PebblesEvent::CounterTurn(pebbles_to_remove), 0).expect("Unable to reply");
            }
        },
        PebblesAction::GiveUp => {
            game_state.winner = Some(Player::Program);
            msg::reply(PebblesEvent::Won(Player::Program), 0).expect("Unable to reply");
        },
        PebblesAction::Restart { difficulty, pebbles_count, max_pebbles_per_turn } => {
            game_state.difficulty = difficulty;
            game_state.pebbles_count = pebbles_count;
            game_state.max_pebbles_per_turn = max_pebbles_per_turn;
            game_state.pebbles_remaining = pebbles_count;
            game_state.first_player = if get_random_u32() % 2 == 0 { Player::User } else { Player::Program };
            game_state.winner = None;

            if let Player::Program = game_state.first_player {
                let pebbles_to_remove = if game_state.difficulty == DifficultyLevel::Easy {
                    (get_random_u32() % game_state.max_pebbles_per_turn + 1)
                } else {
                    1 
                };
                game_state.pebbles_remaining -= pebbles_to_remove;
                msg::reply(PebblesEvent::CounterTurn(pebbles_to_remove), 0).expect("Unable to reply");
            }
        },
    }
}

#[no_mangle]
extern "C" fn state() {
    let game_state = unsafe { GAME_STATE.clone().expect("Game not initialized") };
    msg::reply(game_state, 0).expect("Unable to reply");
}
