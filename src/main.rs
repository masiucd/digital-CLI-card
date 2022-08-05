use std::collections::HashMap;

fn main() {
    let mut charMap = HashMap::new();

    let name = "Hannah";

    for c in name.chars() {
        let x = charMap.entry(c).or_insert(0);
        *x += 1;
    }
}
