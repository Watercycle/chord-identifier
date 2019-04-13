#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] extern crate rocket;

extern crate rocket_file_cache;

mod gzip;

use std::path::{PathBuf, Path};
use rocket::{State};
use rocket_file_cache::{Cache, CachedFile, CacheBuilder};
use gzip::Gzip;
use rocket::response::NamedFile;

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

#[get("/<file..>")]
fn files(file: PathBuf, cache: State<Cache>) -> CachedFile {
    let path = Path::new("public/").join(file);
    CachedFile::open(path, cache.inner())
}

fn main() {
    let cache: Cache = CacheBuilder::new()
        .size_limit(1024 * 1024 * 20) // 20 MB
        .build()
        .unwrap();

    rocket::ignite()
        .attach(Gzip)
        .manage(cache)
        .mount("/", routes![index, service_worker, files])
        .launch();
}