#![no_std]

use sails_rs::prelude::*;

struct TrsService(());

#[sails_rs::service]
impl TrsService {
    pub fn new() -> Self {
        Self(())
    }

    // Service's method (command)
    pub fn do_something(&mut self) -> String {
        "Hello from Trs!".to_string()
    }

    // Service's query
    pub fn get_something(&self) -> String {
        "Hello from Trs!".to_string()
    }    
}

pub struct TrsProgram(());

#[sails_rs::program]
impl TrsProgram {
    // Program's constructor
    pub fn new() -> Self {
        Self(())
    }

    // Exposed service
    pub fn trs(&self) -> TrsService {
        TrsService::new()
    }
}
