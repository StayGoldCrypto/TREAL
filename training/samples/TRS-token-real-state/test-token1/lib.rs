#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
    decl_module, decl_storage, decl_event, decl_error, ensure,
    dispatch::{DispatchResult, Vec},
};
use frame_system::ensure_signed;
use sp_runtime::traits::StaticLookup;

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
    trait Store for Module<T: Config> as TrealModule {
        TotalSupply get(fn total_supply): u128 = 1_000_000_000; // 1 billion TREAL tokens
        BalanceOf get(fn balance_of): map hasher(blake2_128_concat) T::AccountId => u128;
    }
}

decl_event!(
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        Transfer(AccountId, AccountId, u128),
    }
);

decl_error! {
    pub enum Error for Module<T: Config> {
        InsufficientBalance,
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        #[weight = 10_000]
        fn transfer(origin, to: T::Lookup::Source, value: u128) -> DispatchResult {
            let from = ensure_signed(origin)?;
            let to = T::Lookup::lookup(to)?;

            let from_balance = Self::balance_of(&from);
            let to_balance = Self::balance_of(&to);

            ensure!(from_balance >= value, Error::<T>::InsufficientBalance);

            <BalanceOf<T>>::insert(&from, from_balance - value);
            <BalanceOf<T>>::insert(&to, to_balance + value);

            Self::deposit_event(RawEvent::Transfer(from, to, value));

            Ok(())
        }
    }
}
