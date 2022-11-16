import express from 'express'

export const app = express()
const port = 3000

const jsonBody = express.json();
app.use(jsonBody)

const db = {
    users: [
        {id: 8, name: 'Igor'},
        {id: 2, name: 'Masha'},
        {id: 3, name: 'Boris'},
        {id: 4, name: 'Maxim'},
        {id: 5, name: 'Ivan'},
        {id: 6, name: 'Inna'},
        {id: 7, name: 'Baba'},
        {id: 1, name: 'James'},
    ]
}

app.get('/users', (req, res) => {
    const sortedUsers = db.users.sort((a, b) => {
        if 
        (
            req.query.sortBy === 'name' || 
            req.query.sortBy === 'id'
        ) {
           return a[req.query.sortBy] > b[req.query.sortBy] ? 1 : b[req.query.sortBy] > a[req.query.sortBy] ? -1 : 0;
        }
        else{
            return 0;
        }
    })
    const filteredSortedUsers = req.query.name
    ? sortedUsers.filter(u => u.name.indexOf(req.query.name as string) > -1) 
    : sortedUsers
    res.json(filteredSortedUsers)
})

app.get('/users/:id', (req, res) => {
    const user = db.users.find( u => u.id === +req.params.id);
    if(!user) return res.send(404)
    res.json(user)
})

app.post('/users', (req, res) => {
    const newUser = {
        id: +(new Date()),
        name: req.body.name ? req.body.name : 'Unknown'
    }
    db.users.push(newUser)
    res.status(201).json(newUser)
})

app.delete('/users/:id', (req, res) => {
    const delIndex = db.users.findIndex(u => u.id === +req.params.id)
    delIndex === -1 
        ? res.sendStatus(404)
        : db.users.splice(delIndex, 1)
    db.users = db.users.filter( u => u.id !== +req.params.id);
    res.status(204).json(db.users)
})

app.put('/users/:id', (req, res) => {
    if(!req.body.name) res.sendStatus(400)
    const index = db.users.findIndex(u => u.id === +req.params.id)
    index === -1 
        ? res.sendStatus(404)
        : db.users[index].name = req.body.name
    res.json(db.users[index])
})

app.delete('/__test__/data', (req, res) => {
    db.users = []
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Listening port ${port}`)
})