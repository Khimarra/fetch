import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSwipeable } from "react-swipeable"

import ProfileNav from "../components/ProfileNav"
import { getUserById } from "../services/APIHelper"
import Avatar from "../components/Avatar"
import Pics from "../components/Pics"

// user's pictures
export default function UserProfilePage3(props) {
  // pull user's id from props
  const userId = props.match.params.id

  const [user, setUser] = useState([])

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const res = await getUserById(userId)
    setUser(res)
  }

  // useHistory retains data for userId returned from page2 or page4
  // swipeable uses that history to push userId into URL when page3 is accessed
  const history = useHistory()
  const handlers = useSwipeable({
    onSwipedLeft: () => history.push(`/users/${userId}/page4`),
    onSwipedRight: () => history.push(`/users/${userId}/page2`),
  })

  return (
    <div {...handlers} className="text-center w-full">
      <div className="text-3xl text-purple-700 p-6 font-bold">
        PROFILE DETAILS
      </div>
      <div className="purple-gradient py-4 shadow-xl">
        <ProfileNav user={user} />
        <Avatar user={user} />
      </div>
      <div>
        <Pics user={user} />
      </div>
    </div>
  )
}
