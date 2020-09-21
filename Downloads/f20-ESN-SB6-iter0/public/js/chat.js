/* global io */
const socket = io()

const input = document.querySelector('#message-input')
const msgForm = document.querySelector('.message-form')
const msgBox = document.querySelector('.messages')
const leaveChat = document.querySelector('#leave')

const username = "Shuai"//window.localStorage.getItem('username')
// if (!username) {
//   // If not logged in, redirect
//   window.location.replace('index.html')
// }

// When DOM is ready, load chat history
document.addEventListener('DOMContentLoaded', () => {
  socket.emit('get chat history', username)
})

// Referenced: https://tsh.io/blog/socket-io-tutorial-real-time-communication/

const addMessage = ({ sender, msg, timestamp }) => {
  // Differentiate between senders so myMessage vs message
  const message = `
  <div class="card">
    <div class="card-body">
      <div class="message-header">
        <span class="message-sender"><b>${sender}</b></span>
        <span class="timestamp">${timestamp}</span>
      </div>
      <p>${msg}</p>
    </div>
  </div>`

  const myMessage = `
  <div class="card" style="background:aliceblue">
  <div class="card-body">
      <div class="message-header">
        <span class="message-sender"><b>Me</b></span>
        <span class="timestamp">${timestamp}</span>
      </div>
      <p>${msg}</p>
    </div>
  </div>
  `
  if (sender === username) {
    msgBox.innerHTML += myMessage
  } else {
    msgBox.innerHTML += message
  }
  // Autoscroll to bottom of chat
  const element = document.getElementsByClassName('messages')[0]
  element.scrollTop = element.scrollHeight
}

const updateAllMessages = (chats) => {
  // Fill chat room on initial connection
  chats.forEach(chat => addMessage({ sender: chat.from, msg: chat.msg, timestamp: chat.timestamp }))
}

socket.on('chat history', (data) => {
  updateAllMessages(data.chats)
})

socket.on('new chat message', (data) => {
  addMessage({ sender: data.from, msg: data.msg, timestamp: data.timestamp })
})


// Display message that new user entered chat
// socket.on("new connection", (data) =>{
//   const enterMessage = `
//     <div class="card">
//       <div class="card-body">
//           <p>${data.msg}</p>
//       </div>
//     </div>
//     `
//   msgBox.innerHTML += enterMessage
//   element = document.getElementsByClassName("messages")[0]
//   element.scrollTop = element.scrollHeight
// })

// Display message that user left the chat
// socket.on("received logout", (data) => {
//   const leaveMessage = `
//     <div class="card">
//       <div class="card-body">
//           <p>${data.msg}</p>
//       </div>
//     </div>
//     `
//   msgBox.innerHTML += leaveMessage
//   element = document.getElementsByClassName("messages")[0]
//   element.scrollTop = element.scrollHeight
// })

msgForm.addEventListener('submit', (e) => {

  e.preventDefault()

  console.log("Message from Client:", input.value)
  if (!input.value) {
    return
  }
  if ((input.value).length > 0) {
    console.log("sending ", input.value, "to server through socket")
    socket.emit('chat message', {
      msg: input.value,
      username,
    })
  }
  input.value = ''
})

leaveChat.addEventListener('click', (e) => {
  e.preventDefault()
  // User left chat
  // socket.emit("logout",  {
  //  msg: `${username} has left the chat`,
  //  username: username
  // })
  window.localStorage.removeItem('username')
  window.location.replace('index.html')
})
