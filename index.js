const express = require('express')
const path = require('path')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = 3004
const messages = []

app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, 'public'))

app.engine("html", require("ejs").renderFile)

app.set("view engine", "html")

app.use('/', (req, res) => {
  res.render("index.ejs")
})

io.on('connection', (Socket) => {
  console.log(`usuário conectado. ID: ${Socket.id}`);
  Socket.on('sendMessage', data => {
    messages.push(data);
    io.emit("message", messages)
    })
  }); 




server.listen(PORT, () => console.log(`escutando na porta ${PORT}`))


