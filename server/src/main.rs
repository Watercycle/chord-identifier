#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] extern crate rocket;

extern crate rocket_file_cache;

mod gzip;

use std::path::{PathBuf, Path};
use rocket::{State, Config};
use rocket_file_cache::{Cache, CachedFile, CacheBuilder};
use gzip::Gzip;
use rocket::response::NamedFile;
use std::env;

#[get("/")]
fn index() -> NamedFile {
    let path = Path::new("public/").join("index.html");
    NamedFile::open(path).expect("You probably need to run `npm run build`.")
}

#[get("/service-worker.js")]
fn service_worker() -> NamedFile {
    let path = Path::new("public/").join("service-worker.js");
    NamedFile::open(path).expect("You probably need to run `npm run build`.")
}

// <file..> rejects hidden folders, so this is a manual route
// used for the ACME SSL certificate setup.
#[get("/.well-known/<file..>", rank = 1)]
fn cheap_ssl(file: PathBuf) -> NamedFile {
    let path = Path::new("public/.well-known/").join(file);
    NamedFile::open(path).expect("Failed to get SSL ACME Certificate")
}

#[get("/<file..>", rank=2)]
fn files(file: PathBuf, cache: State<Cache>) -> CachedFile {
    let path = Path::new("public/").join(file);
    CachedFile::open(path, cache.inner())
}

/// Configure Rocket to serve on the port requested by Heroku.
fn configure() -> Config {
    let mut config = Config::active().expect("could not load configuration");

    if let Ok(port_str) = env::var("PORT") {
        let port = port_str.parse().expect("could not parse PORT");
        config.set_port(port);
    }

    config
}

fn main() {
    let cache: Cache = CacheBuilder::new()
        .size_limit(1024 * 1024 * 20) // 20 MB
        .build()
        .unwrap();

    rocket::custom(configure())
        .attach(Gzip)
        .manage(cache)
        .mount("/", routes![index, service_worker, files, cheap_ssl])
        .launch();
}