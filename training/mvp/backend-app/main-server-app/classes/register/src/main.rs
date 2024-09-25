use substrate_api_client::Api;
use substrate_api_client::rpc::WsRpcClient;
use substrate_api_client::sp_runtime::app_crypto::sp_core::Pair;
use substrate_api_client::sp_runtime::MultiSigner;
use substrate_api_client::AccountId;
use std::str::FromStr;

#[tokio::main]
async fn main() {
    // Connect to the Vara node
    let client = WsRpcClient::new("ws://127.0.0.1:9944");
    let api = Api::new(client).unwrap();

    // User Registration Example
    let alice: Pair = Pair::from_string("//Alice", None).unwrap();
    let alice_signer = MultiSigner::from(alice.public());

    // Assume user data is gathered and processed here
    let new_user_account: AccountId = AccountId::from_str("5GrwvaEF...").unwrap();
    
    // Call a custom smart contract or extrinsic to register user
    // This is a simplified example, your implementation may vary
    let result = api.call(
        "register_user",
        new_user_account.encode(),
        Some(alice.clone()),
    );

    match result {
        Ok(_) => println!("User registered successfully!"),
        Err(e) => println!("Failed to register user: {:?}", e),
    }

    // Property Listing Example
    // Assuming a custom extrinsic 'add_property' exists
    let property_data = serde_json::json!({
        "owner": new_user_account,
        "location": "123 Main St",
        "value": 250000,
    });

    let result = api.call(
        "add_property",
        property_data.to_string().encode(),
        Some(alice.clone()),
    );

    match result {
        Ok(_) => println!("Property added successfully!"),
        Err(e) => println!("Failed to add property: {:?}", e),
    }
}
11
