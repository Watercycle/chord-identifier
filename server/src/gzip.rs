extern crate flate2;

use rocket::{fairing, Response, Request};
use self::flate2::write::GzEncoder;
use self::flate2::Compression;
use std::io::{Cursor, Write};

pub struct Gzip;

//    let compressed_file = format!("{}{}", file.file_name().unwrap().to_str().unwrap(), ".gz");
//    let compressed_file_path = Path::new("public/").join(&compressed_file);

impl fairing::Fairing for Gzip {
    fn info(&self) -> fairing::Info {
        fairing::Info {
            name: "Gzip Compression",
            kind: fairing::Kind::Response,
        }
    }

    fn on_response(&self, request: &Request, response: &mut Response) {
        if !accepts_gzip_encoding(request) { return }

        let body = response.body_bytes().unwrap();
        let mut encoder = GzEncoder::new(Vec::new(), Compression::default());
        encoder.write_all(&body).unwrap();
        let encoded_body = encoder.finish().unwrap();

        response.set_sized_body(Cursor::new(encoded_body));
        response.set_raw_header("Content-Encoding", "gzip");
    }
}

fn accepts_gzip_encoding(request: &Request) -> bool {
    request
        .headers()
        .get("Accept-Encoding")
        .any(|e| e.to_lowercase().contains("gzip"))
}
