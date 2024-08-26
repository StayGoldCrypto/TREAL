#![no_std]
include!(concat!(env!("OUT_DIR"), "/trs_vft_client.rs"));
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));

#[cfg(target_arch = "wasm32")]
pub use trs_vft_app::wasm::*;
