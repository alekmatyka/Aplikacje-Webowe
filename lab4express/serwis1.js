const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(express.json()); 

function connect() {
    return new sqlite3.Database('./database.db');
}

app.get('/api/books', (req, res) => {
    const db = connect()
  
    db.all("SELECT * from books", [], (err, rows) => {
      res.status(200).json({
          posts: rows
      });
    })
  });

app.get('/api/books/:id', (req, res) => {
    const db = connect()
    const bookID=req.params.id

    db.all("SELECT * from books where id = ?", [bookID], (err, rows) => {
        console.log(rows)
        console.log(bookID)
        res.status(200).json({
            books: rows
        });
    })
});

app.post("/api/books", (req, res) => {
    const { title, author, year} = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({ 
            message: "Musisz podać tytuł, autora i rok!" 
        });
    }

    const db = connect();

    db.run(
        "INSERT INTO books (title, author, year) VALUES (?, ?, ?)", 
        [title, author, year], 
        function(err)  {
            /*
                Ćwiczenie:
                    W tym miejscu można dodać handling dla err
                    np. return res.status(500) .....
            */
            res.status(201).json({
                id: this.lastID,
                message: "Ksiazka dodana poprawnie!"
            });
        }
    );
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Serwer włączony!");
});