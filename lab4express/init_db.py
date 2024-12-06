import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
            ('Zdrajca', 'Aaron Dembski-Bowden', 30000)
            )

cur.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
            ('Harrowmaster', 'Mike Brooks', 40000)
            )

connection.commit()
connection.close()