impl pallet_treal::Config for Runtime {
    type Event = Event;
}

construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic
    {
        // Add the pallet to the construct_runtime macro
        System: frame_system::{Pallet, Call, Config, Storage, Event<T>},
        TrealModule: pallet_treal::{Pallet, Call, Storage, Event<T>},
    }
);
