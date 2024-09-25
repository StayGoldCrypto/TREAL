use sails_rs::{calls::*, gtest::calls::*};

use trs_client::traits::*;

const ACTOR_ID: u64 = 42;

#[tokio::test]
async fn do_something_works() {
    let remoting = GTestRemoting::new(ACTOR_ID.into());
    remoting.system().init_logger();

    // Submit program code into the system
    let program_code_id = remoting.system().submit_code(trs::WASM_BINARY);

    let program_factory = trs_client::TrsFactory::new(remoting.clone());

    let program_id = program_factory
        .new() // Call program's constructor (see app/src/lib.rs:29)
        .send_recv(program_code_id, b"salt")
        .await
        .unwrap();

    let mut service_client = trs_client::Trs::new(remoting.clone());

    let result = service_client
        .do_something() // Call service's method (see app/src/lib.rs:14)
        .send_recv(program_id)
        .await
        .unwrap();

    assert_eq!(result, "Hello from Trs!".to_string());
}

#[tokio::test]
async fn get_something_works() {
    let remoting = GTestRemoting::new(ACTOR_ID.into());
    remoting.system().init_logger();

    // Submit program code into the system
    let program_code_id = remoting.system().submit_code(trs::WASM_BINARY);

    let program_factory = trs_client::TrsFactory::new(remoting.clone());

    let program_id = program_factory
        .new() // Call program's constructor (see app/src/lib.rs:29)
        .send_recv(program_code_id, b"salt")
        .await
        .unwrap();

    let service_client = trs_client::Trs::new(remoting.clone());

    let result = service_client
        .get_something() // Call service's query (see app/src/lib.rs:19)
        .recv(program_id)
        .await
        .unwrap();

    assert_eq!(result, "Hello from Trs!".to_string());
}
