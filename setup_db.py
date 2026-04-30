import sqlite3

def setup():
    conn = sqlite3.connect('plunder.db')
    c = conn.cursor()
    
    # Reset tables
    c.execute('DROP TABLE IF EXISTS products')
    c.execute('DROP TABLE IF EXISTS secrets')
    
    c.execute('CREATE TABLE products (name TEXT, price TEXT, description TEXT)')
    c.execute('CREATE TABLE secrets (flag TEXT)')
    
    # Pirate-themed products with "Leaky" descriptions
    items = [
        ("The Admiral's Ledger", "50 doubloons", "A book that reveals every 'table' in the fleet, if ye know where to look."),
        ("Whispering Conch Shell", "12 doubloons", "Listen closely... it whispers of 'secrets' hidden beneath the waves."),
        ("Navigator’s Compass", "30 doubloons", "Always points toward the 'flag' at the end of the journey."),
        ("Rusty Skeleton Key", "5 doubloons", "Built to 'UNION' two separate rooms into one."),
        ("Invisibilty Ink", "20 doubloons", "Use a single quote (') to reveal the hidden messages between the lines."),
        ("The Captain's Log", "45 doubloons", "Records suggest the most precious booty is kept in a table called 'secrets'."),
        ("Stolen Royal Seal", "100 doubloons", "Authorized to access columns named 'flag' in any manifest."),
        ("Broken Spyglass", "2 doubloons", "It cuts off the end of your vision (--) like a comment in the sand."),
        ("Tattered Treasure Map", "15 doubloons", "X marks the spot, but the 'flag' column is the true prize."),
        ("Old Sea Dog's Pipe", "8 doubloons", "Legend says the old man used it to 'SELECT' his favorite treasures from different 'secrets'.")
    ]
    
    c.executemany('INSERT INTO products VALUES (?, ?, ?)', items)
    
    # The actual win condition
    c.execute('INSERT INTO secrets VALUES ("pracsec{SQli_P1r4t3_M4st3r}")')
    
    conn.commit()
    conn.close()
    print("Database anchored and loaded with cryptic clues!")

if __name__ == "__main__":
    setup()