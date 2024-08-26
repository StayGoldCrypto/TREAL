use gstd::msg;
use sails_rs::{collections::HashSet, gstd::service, prelude::*};
mod funcs;
use crate::services;
use vft_service::{Service as VftService, Storage};

#[derive(Default)]
pub struct TrsStorage {
    minters: HashSet<ActorId>,
    burners: HashSet<ActorId>,
    admins: HashSet<ActorId>,
}

static mut EXTENDED_STORAGE: Option<TrsStorage> = None;

#[derive(Encode, Decode, TypeInfo)]
pub enum Event {
    Minted { to: ActorId, value: U256 },
    Burned { from: ActorId, value: U256 },
}
#[derive(Clone)]
pub struct TrsService {
    vft: VftService,
}

impl TrsService {
    pub fn seed(name: String, symbol: String, decimals: u8) -> Self {
        let admin = msg::source();
        unsafe {
            EXTENDED_STORAGE = Some(TrsStorage {
                admins: [admin].into(),
                minters: [admin].into(),
                burners: [admin].into(),
            });
        };
        TrsService {
            vft: <VftService>::seed(name, symbol, decimals),
        }
    }

    pub fn get_mut(&mut self) -> &'static mut TrsStorage {
        unsafe {
            EXTENDED_STORAGE
                .as_mut()
                .expect("Trs vft is not initialized")
        }
    }
    pub fn get(&self) -> &'static TrsStorage {
        unsafe {
            EXTENDED_STORAGE
                .as_ref()
                .expect("Trs vft is not initialized")
        }
    }
}

#[service(extends = VftService, events = Event)]
impl TrsService {
    pub fn new() -> Self {
        Self {
            vft: VftService::new(),
        }
    }
    pub fn mint(&mut self, to: ActorId, value: U256) -> bool {
        if !self.get().minters.contains(&msg::source()) {
            panic!("Not allowed to mint")
        };

        let mutated = services::utils::panicking(|| {
            funcs::mint(Storage::balances(), Storage::total_supply(), to, value)
        });
        if mutated {
            let _ = self.notify_on(Event::Minted { to, value });
        }
        mutated
    }

    pub fn burn(&mut self, from: ActorId, value: U256) -> bool {
        if !self.get().burners.contains(&msg::source()) {
            panic!("Not allowed to burn")
        };

        let mutated = services::utils::panicking(|| {
            funcs::burn(Storage::balances(), Storage::total_supply(), from, value)
        });
        if mutated {
            let _ = self.notify_on(Event::Burned { from, value });
        }
        mutated
    }

    pub fn grant_admin_role(&mut self, to: ActorId) {
        self.ensure_is_admin();
        self.get_mut().admins.insert(to);
    }
    pub fn grant_minter_role(&mut self, to: ActorId) {
        self.ensure_is_admin();
        self.get_mut().minters.insert(to);
    }
    pub fn grant_burner_role(&mut self, to: ActorId) {
        self.ensure_is_admin();
        self.get_mut().burners.insert(to);
    }

    pub fn revoke_admin_role(&mut self, from: ActorId) {
        self.ensure_is_admin();
        self.get_mut().admins.remove(&from);
    }
    pub fn revoke_minter_role(&mut self, from: ActorId) {
        self.ensure_is_admin();
        self.get_mut().minters.remove(&from);
    }
    pub fn revoke_burner_role(&mut self, from: ActorId) {
        self.ensure_is_admin();
        self.get_mut().burners.remove(&from);
    }
    pub fn minters(&self) -> Vec<ActorId> {
        self.get().minters.clone().into_iter().collect()
    }

    pub fn burners(&self) -> Vec<ActorId> {
        self.get().burners.clone().into_iter().collect()
    }

    pub fn admins(&self) -> Vec<ActorId> {
        self.get().admins.clone().into_iter().collect()
    }
}

impl TrsService {
    fn ensure_is_admin(&self) {
        if !self.get().admins.contains(&msg::source()) {
            panic!("Not admin")
        };
    }
}
impl AsRef<VftService> for TrsService {
    fn as_ref(&self) -> &VftService {
        &self.vft
    }
}
