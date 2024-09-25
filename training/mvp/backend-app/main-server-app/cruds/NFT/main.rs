use substrate_api_client::{Api, rpc::WsRpcClient, XtStatus};
use substrate_api_client::sp_core::sr25519;
use substrate_api_client::sp_keyring::AccountKeyring;
use substrate_api_client::sp_runtime::MultiSignature;
use serde_json::json;

#[tokio::main]
async fn main() {
    // Conectar al nodo de Vara
    let client = WsRpcClient::new("ws://127.0.0.1:9944");
    let api = Api::<sr25519::Pair, _>::new(client).unwrap();

    // Firmar la transacción con la cuenta de Alice
    let signer = AccountKeyring::Alice.pair();
    let from = MultiSignature::from(signer.clone());

    // Datos del NFT
    let metadata = json!({
        "name": "Mi Primer NFT",
        "description": "Este es un NFT de ejemplo",
        "image": "ipfs://Qm...imagenHash" // Reemplaza con tu hash de IPFS
    });

    // Crear y enviar la transacción
    let xt = api.balance_transfer(from.clone(), signer.public().into(), 1000000);
    let result = api.send_extrinsic(xt.hex_encode(), XtStatus::InBlock).unwrap();

    match result {
        Some(block) => println!("NFT subido en el bloque {:?}", block),
        None => println!("Error al subir el NFT"),
    }
}
