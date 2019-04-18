extern crate actix_web;
extern crate env_logger;

mod middlewares;

use self::middlewares::force_ssl;

use std::env;
use actix_web::{server, App, fs};
use actix_web::middleware::Logger;
use actix_web::fs::StaticFiles;

fn server_port() -> i32 {
    if let Ok(port) = env::var("PORT") {
        port.parse().expect("Failed to parse PORT.")
    } else {
        8000 // default port
    }
}

fn file_server<S: 'static>() -> StaticFiles<S> {
    fs::StaticFiles::new("public/")
        .expect("public directory is missing")
        .index_file("index.html")
        .show_files_listing()
}

fn setup_logger() {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
}

fn main() {
    setup_logger();

    let port = server_port();
    let server = server::new( ||
        App::new()
            .middleware(Logger::default())
            .middleware(force_ssl::ForceSsl)
            .handler("/", file_server())
            .finish());

    println!("Starting server at: 0.0.0.0:{}", port);
    server.bind(format!("0.0.0.0:{}", port))
        .expect(format!("Can not start server on port {}", port).as_str())
        .run();
}