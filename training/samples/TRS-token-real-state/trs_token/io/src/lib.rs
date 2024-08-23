#![no_std]
use trs_token_io::*;
use gstd::{collections::HashMap, msg, prelude::*, ActorId};

#[cfg(test)]
mod tests;

const ZERO_ID: ActorId = ActorId::new([0u8; 32]);

#[derive(Debug, Clone, Default)]
struct TrsToken {
    /// Name of the token.
    name: String,
    /// Symbol of the token.
    symbol: String,
    /// Total supply of the token.
    total_supply: u128,
    /// Map to hold balances of token holders.
    balances: HashMap<ActorId, u128>,
    /// Map to hold allowance information of token holders.
    allowances: HashMap<ActorId, HashMap<ActorId, u128>>,
    /// Token's decimals.
    pub decimals: u8,
}

static mut TRS_TOKEN: Option<TrsToken> = None;

impl TrsToken {
    /// Executed on receiving `trs-token-messages::MintInput`.
    fn mint(&mut self, amount: u128) {
        let source = msg::source();
        self.balances
            .entry(source)
            .and_modify(|balance| *balance += amount)
            .or_insert(amount);
        self.total_supply += amount;
        msg::reply(
            FTEvent::Transfer {
                from: ZERO_ID,
                to: source,
                amount,
            },
            0,
        )
        .unwrap();
    }
    /// Executed on receiving `trs-token-messages::BurnInput`.
    fn burn(&mut self, amount: u128) {
        let source = msg::source();
        if self.balances.get(&source).unwrap_or(&0) < &amount {
            panic!("Amount exceeds account balance");
        }
        self.balances
            .entry(source)
            .and_modify(|balance| *balance -= amount);
        self.total_supply -= amount;

        msg::reply(
            FTEvent::Transfer {
                from: source,
                to: ZERO_ID,
                amount,
            },
            0,
        )
        .unwrap();
    }
    /// Executed on receiving `trs-token-messages::TransferInput` or `trs-token-messages::TransferFromInput`.
    /// Transfers `amount` tokens from `sender` account to `recipient` account.
    fn transfer(&mut self, from: &ActorId, to: &ActorId, amount: u128) {
        if from == &ZERO_ID || to == &ZERO_ID {
            panic!("Zero addresses");
        };
        if !self.can_transfer(from, amount) {
            panic!("Not allowed to transfer")
        }
        if self.balances.get(from).unwrap_or(&0) < &amount {
            panic!("Amount exceeds account balance");
        }
        self.balances
            .entry(*from)
            .and_modify(|balance| *balance -= amount);
        self.balances
            .entry(*to)
            .and_modify(|balance| *balance += amount)
            .or_insert(amount);
        msg::reply(
            FTEvent::Transfer {
                from: *from,
                to: *to,
                amount,
            },
            0,
        )
        .unwrap();
    }

    /// Executed on receiving `trs-token-messages::ApproveInput`.
    fn approve(&mut self, to: &ActorId, amount: u128) {
        if to == &ZERO_ID {
            panic!("Approve to zero address");
        }
        let source = msg::source();
        self.allowances
            .entry(source)
            .or_default()
            .insert(*to, amount);
        msg::reply(
            FTEvent::Approve {
                from: source,
                to: *to,
                amount,
            },
            0,
        )
        .unwrap();
    }

    fn can_transfer(&mut self, from: &ActorId, amount: u128) -> bool {
        let source = msg::source();
        if from == &source && self.balances.get(&source).unwrap_or(&0) >= &amount {
            return true;
        }
        if let Some(allowed_amount) = self.allowances.get(from).and_then(|m| m.get(&source)) {
            if allowed_amount >= &amount {
                self.allowances.entry(*from).and_modify(|m| {
                    m.entry(source).and_modify(|a| *a -= amount);
                });
                return true;
            }
        }
        false
    }
}

fn common_state() -> IoTrsToken {
    let state = static_mut_state();
    let TrsToken {
        name,
        symbol,
        total_supply,
        balances,
        allowances,
        decimals,
    } = state.clone();

    let balances = balances.iter().map(|(k, v)| (*k, *v)).collect();
    let allowances = allowances
        .iter()
        .map(|(id, allowance)| (*id, allowance.iter().map(|(k, v)| (*k, *v)).collect()))
        .collect();
    IoTrsToken {
        name,
        symbol,
        total_supply,
        balances,
        allowances,
        decimals,
    }
}

fn static_mut_state() -> &'static mut TrsToken {
    unsafe { TRS_TOKEN.get_or_insert(Default::default()) }
}

#[no_mangle]
extern fn state() {
    msg::reply(common_state(), 0)
        .expect("Failed to encode or reply with `<AppMetadata as Metadata>::State` from `state()`");
}

#[no_mangle]
extern fn handle() {
    let action: FTAction = msg::load().expect("Could not load Action");
    let ft: &mut TrsToken = unsafe { TRS_TOKEN.get_or_insert(Default::default()) };
    match action {
        FTAction::Mint(amount) => {
            ft.mint(amount);
        }
        FTAction::Burn(amount) => {
            ft.burn(amount);
        }
        FTAction::Transfer { from, to, amount } => {
            ft.transfer(&from, &to, amount);
        }
        FTAction::Approve { to, amount } => {
            ft.approve(&to, amount);
        }
        FTAction::TotalSupply => {
            msg::reply(FTEvent::TotalSupply(ft.total_supply), 0).unwrap();
        }
        FTAction::BalanceOf(account) => {
            let balance = ft.balances.get(&account).unwrap_or(&0);
            msg::reply(FTEvent::Balance(*balance), 0).unwrap();
        }
    }
}

#[no_mangle]
extern fn init() {
    let config: InitConfig = msg::load().expect("Unable to decode InitConfig");
    let ft = TrsToken {
        name: config.name,
        symbol: config.symbol,
        decimals: config.decimals,
        ..Default::default()
    };
    unsafe { TRS_TOKEN = Some(ft) };
}

#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum State {
    Name,
    Symbol,
    Decimals,
    TotalSupply,
    BalanceOf(ActorId),
}

#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum StateReply {
    Name(String),
    Symbol(String),
    Decimals(u8),
    TotalSupply(u128),
    Balance(u128),
}

/*
#![no_std]

use gmeta::{In, InOut, Metadata, Out};
use gstd::{prelude::*, ActorId};

pub struct FungibleTokenMetadata;

impl Metadata for FungibleTokenMetadata {
    type Init = In<InitConfig>;
    type Handle = InOut<FTAction, FTEvent>;
    type Others = ();
    type Reply = ();
    type Signal = ();
    type State = Out<IoFungibleToken>;
}

#[derive(Debug, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitConfig {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
}

#[derive(Debug, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum FTAction {
    Mint(u128),
    Burn(u128),
    Transfer {
        from: ActorId,
        to: ActorId,
        amount: u128,
    },
    Approve {
        to: ActorId,
        amount: u128,
    },
    TotalSupply,
    BalanceOf(ActorId),
}

#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum FTEvent {
    Transfer {
        from: ActorId,
        to: ActorId,
        amount: u128,
    },
    Approve {
        from: ActorId,
        to: ActorId,
        amount: u128,
    },
    TotalSupply(u128),
    Balance(u128),
}

#[derive(Debug, Clone, Default, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct IoFungibleToken {
    pub name: String,
    pub symbol: String,
    pub total_supply: u128,
    pub balances: Vec<(ActorId, u128)>,
    pub allowances: Vec<(ActorId, Vec<(ActorId, u128)>)>,
    pub decimals: u8,
}

*/