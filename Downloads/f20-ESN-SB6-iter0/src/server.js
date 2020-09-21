const express = require('express')
const path = require('path')

const app = express()
const server = require('http').Server(app);
app.io = require('socket.io')(server);


const views_dir = path.join(__dirname, '../public/views')
app.set('views', views_dir)

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath)) // root dir path

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

// get the routers
const userRouter = require('./routers/user')
const chatRouter = require('./routers/chat')(app.io)

// set routers
app.use(userRouter)
app.use(chatRouter)

// listen at port 8080
// var server = http.createServer(app);
// app.io.attach(server);
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

server.listen(8080, () => {
  console.log('Listening on *:8080')
})




// starting point /GET index.html -> login point 
app.get('/', (req, res)=> {
  console.log(req.query)
  if (req.query.msg != undefined) {
    res.render('login', req.query) 
  } 
  else {
    res.render('login', {msg: ''})
  }
  
})

// // direct to signup window
// app.get('/signup', (req, res) => {
//   res.render('signup', {})
// })

// direct to chat window
app.get('/chat', (req, res) => {
  //render chat html
  res.render('chat', {}) // match up with the view folder
})


app.get('/home', (req, res) => {
  res.render('home', {})
})



  // To indicate user left a chat
  // socket.on("logout", (data) => {
  //     io.emit("received logout", data)
  // })

