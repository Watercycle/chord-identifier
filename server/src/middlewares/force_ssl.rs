use actix_web::middleware::{Middleware, Response};
use actix_web::{HttpRequest, HttpResponse, http};
use actix_web::error::{Result};

pub struct ForceSsl;

impl<S> Middleware<S> for ForceSsl {
    fn response(&self, req: &HttpRequest<S>, resp: HttpResponse) -> Result<Response> {
        if !should_force_ssl(req) {
            return Ok(Response::Done(resp))
        }

        let ssl_resp = HttpResponse::PermanentRedirect()
            .header(http::header::LOCATION, https_url_for_request(req))
            .finish();

        Ok(Response::Done(ssl_resp))
    }
}

fn should_force_ssl<T>(req: &HttpRequest<T>) -> bool {
    let in_dev = req.connection_info().host().contains("localhost");
    let already_secure = req.connection_info().scheme() == "https";

    !in_dev && !already_secure
}

fn https_url_for_request<T>(req: &HttpRequest<T>) -> String {
    let header = req.headers();
    let host = header[http::header::HOST].to_str().expect("Invalid ASCII");
    let path = req.uri().path();

    format!("https://{}{}", host, path)
}