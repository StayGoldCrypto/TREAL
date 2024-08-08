#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{decl_module, decl_storage, decl_event, decl_error, ensure, dispatch::DispatchResult};
use frame_system::ensure_signed;
use sp_std::vec::Vec;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Default)]
pub struct Property {
    owner: Vec<u8>,
    location: Vec<u8>,
    value: u128,
}

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
    trait Store for Module<T: Config> as PropertyModule {
        Properties get(fn properties): map hasher(blake2_128_concat) u32 => Option<Property>;
        PropertyCount get(fn property_count): u32;
    }
}

decl_event!(
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        PropertyListed(AccountId, u32),
    }
);

decl_error! {
    pub enum Error for Module<T: Config> {
        PropertyAlreadyExists,
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        #[weight = 10_000]
        fn list_property(origin, location: Vec<u8>, value: u128) -> DispatchResult {
            let sender = ensure_signed(origin)?;

            let property = Property {
                owner: sender.clone().into(),
                location: location.clone(),
                value,
            };

            let property_id = Self::property_count();
            Properties::<T>::insert(property_id, property);
            PropertyCount::put(property_id + 1);

            Self::deposit_event(RawEvent::PropertyListed(sender, property_id));
            Ok(())
        }
    }
}
