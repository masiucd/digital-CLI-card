use colored::*;
use serde::{Deserialize, Serialize};
use serde_json::Result;
use std::fmt::format;

fn main() {
    let file = std::fs::read_to_string("me.json");
    match file {
        Ok(f) => {
            let me: Me = serde_json::from_str(&f).unwrap();
            let result = format!(
                "name = {} \nrole = {} \ngithub = {} \ntwitter = {} \nlinkedin = {} \n",
                me.name.blue(),
                me.role.green(),
                me.github.red(),
                me.twitter.cyan(),
                me.linkedin.magenta()
            );
            println!("{}", result);
        }
        Err(e) => {
            println!("{} {}", "me.json not found".red(), e);
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct Me {
    name: String,
    role: String,
    github: String,
    twitter: String,
    linkedin: String,
}
