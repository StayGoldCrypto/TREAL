use trs_token_io::TrsTokenMetadata;

fn main() {
    gear_wasm_builder::build_with_metadata::<TrsTokenMetadata>();
}