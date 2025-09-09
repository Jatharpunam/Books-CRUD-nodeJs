const express = require('express')
require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res)=> res.send('Hello World! We are doing CRUD operation on BOOK'))

const books = [{
    id: 1,
    title: 'NodeJS',
    author: 'Wisdom Sprouts',
    price: 1200,
    gen: 'V1.1'
}]


app.get('/getAllBooks', (req, res)=> {
    res.status(200).send({books:books})
})

app.get('/getBooksById/:ID', (req, res)=> {
    console.log(req.params.ID)
    const ID = req.params.ID;
    const index = books.findIndex((b)=>b.id == ID)

    if(index == -1) {
        res.status(400).send({msg:"Book not found", status:false})
    }else {
        const book = books.find((b)=> b.id == ID)
        res.status(200).send({book:book, status:true})
    }
})

app.post('/createBook', (req, res)=> {
    console.log(req.body)
    newBook = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        gen: req.body.gen
    }
    books.push(newBook)
    res.status(200).send({msg:'Book Added Successfully'})
})

app.delete('/deleteBook/:ID', (req, res)=> {
    const ID = req.params.ID
    const index = books.findIndex((b)=>b.id == ID)

    if(index == -1) {
        res.status(400).send({msg:"Book not found", status:false})
    }else {
        books.splice(index, 1)
        res.status(200).send({msg:"Book deleted successfully"})
    }
})

app.put('/updateBook/:ID', (req, res)=> {
    ID = req.params.ID
    const index = books.findIndex((b)=>b.id == ID)

    if(index == -1) {
        res.status(400).send({msg:"Book not found", status:false})
    }else {
        // books[index].price = req.body.price || books[index].price
        books[index].gen = req.body.gen || books[index].gen
        res.status(200).send({msg: "Book updated successfully"})
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//http://localhost:7777/
//http://localhost:7777/getAllBooks/
//http://localhost:7777/getBooksById/:ID
//http://localhost:7777/getBooksById/1
//http://localhost:7777/createBook/
//http://localhost:7777/deleteBook/
//http://localhost:7777/updateBook/




