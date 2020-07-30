import React, { useState, useEffect } from "react"
import { getRoomWithDetail, getUserById } from "../services/APIHelper"
import Room from "../components/Room"

let sub

// individual chat rooms between two users
export default function RoomPage(props) {
  let { cable } = props
  let { id } = props.match.params

  const [roomDetail, setRoomDetail] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    getInitialRoomPosts()
  }, [])

  // tells posts which room to post in
  const handleRecievePost = async () => {
    let singleRoomWithDetailsResponse = await getRoomWithDetail(id)
    // Room id and user id are aligned
    let newUser = await getUserById(id)
    setRoomDetail(singleRoomWithDetailsResponse)
    setUser(newUser)
  }

  // get existing posts for specific room, received = new posts
  const getInitialRoomPosts = async () => {
    sub = cable.subscriptions.create(
      { channel: "RoomChannel", room: id },
      { received: handleRecievePost }
    )

    handleRecievePost()
  }

  return (
    <>
      <div>
        <Room roomDetails={roomDetail} user={user} />
      </div>
    </>
  )
}
