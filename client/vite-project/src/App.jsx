import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import "./app.css"
const App = () => {

  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [socketId, setSockcetId] = useState('')
  const [messages, setMesages] = useState([]);
  const [roomJoin, setRoomJoin] = useState([]);


  const socket = useMemo(() => io("http://localhost:3000"), []);

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("message", { message, room })
    setMessage("")

  }
  console.log(messages)

  const handleRoomJoin = (e)=>{
    e.preventDefault();
    socket.emit("room-join", roomJoin)
  }

  useEffect(() => {

    socket.on("connect", () => {
      setSockcetId(socket.id)
      console.log("connected", socket.id)
    })

    socket.on("welcome", (s) => {
      console.log(s)
    })

    socket.on("receive-message", (data) => {

      setMesages((messages) => [...messages, data])


    })

    return () => {
      socket.disconnect()
    }

  }, [])
  return (
    <div className='container'>


      <div className='container-form'>
        <form onSubmit={handleSubmit} className='container-form-1' action="">
          <p>Let's Chat with others</p>
          <div className='form-elem '>

            <h2>Room: {socketId}</h2>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter Message' type="text" />
            <input value={room} onChange={(e) => setRoom(e.target.value)} placeholder='Enter Room' type="text" />
            <button type='submit'>Send</button>
          </div>

        </form>


        <form className='container-form-1' onSubmit={handleRoomJoin}>
          <input value={roomJoin} onChange={(e) => setRoomJoin(e.target.value)} placeholder='Enter Room Name' type="text" />
          <button type='submit'>Join</button>
        </form>
      </div>
      <div className='mess-main'>
        <p>Your Messages:</p>

        <div className='message-container'>


          {messages.map((m, i) => (

            <div key={i} >

              <span>{m}</span>
            </div>
          ))
          }
        </div>
      </div>

    </div>

  )
}

export default App
