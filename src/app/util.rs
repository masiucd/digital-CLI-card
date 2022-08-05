use colored::*;
use serde::{Deserialize, Serialize};

fn read_file(path: &str) -> Option<String> {
    let file = std::fs::read_to_string("me.json").unwrap();
    Some(file)
}

pub fn print_me() {
    let file = read_file("me.json");
    match file {
        Some(f) => {
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
        None => {
            println!("{}", "file not found".red());
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
