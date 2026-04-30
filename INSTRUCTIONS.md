# CTF Solution: Davy Jones' Plunder Emporium

## 1. The Vulnerability
The search bar uses a **Union-Based SQL Injection** vulnerability. The backend code directly inserts user input into a string-based SQL query:

`SELECT name, price, description FROM products WHERE name LIKE '%[USER_INPUT]%'`

## 2. Reconnaissance (Finding the "Map")
By reading the cryptic product descriptions, we gathered the following metadata:
*   **Target Table:** `secrets` (found in the description of *The Captain's Log*)
*   **Target Column:** `flag` (found in the description of *Stolen Royal Seal*)
*   **Column Count:** The original query uses **3** columns: `name`, `price`, and `description`.

## 3. Crafting the Attack
To successfully use a `UNION` operator, our injected query must match the column count of the original query (3 columns).

### The Payload:
`' UNION SELECT flag, 'Priceless', 'Extracted from the vault' FROM secrets--`

### How the Payload works:
1.  **`'`**: Closes the opening single quote of the `LIKE` statement.
2.  **`UNION SELECT`**: Combines the results of the original product search with a new search on our target table.
3.  **`flag, 'Priceless', 'Extracted...'`**: We select the actual flag into the first column, and provide dummy text for the remaining two columns to satisfy the 3-column requirement.
4.  **`FROM secrets`**: Targets the table containing the flag.
5.  **`--`**: This is the SQL comment symbol. It ignores the rest of the original query (the closing quote and percent sign), preventing a syntax error.

## 4. Final Result
Entering the payload into the search bar bypasses the product filter and forces the database to display the hidden row from the `secrets` table. 

**The Flag:** `CTF{SQli_P1r4t3_M4st3r}`