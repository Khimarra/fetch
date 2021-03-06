import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSwipeable } from "react-swipeable"

import ProfileNav from "../components/ProfileNav"
import Avatar from "../components/Avatar"
import { getUserById } from "../services/APIHelper"
import Bio from "../components/Bio"
import Interests from "../components/Interests"
import SocialActivity from "../components/SocialActivity"

// user's bio, interests, and social feed
export default function UserProfilePage2(props) {
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

  // useHistory retains data for userId returned from page1 or page3
  // swipeable uses that history to push userId into URL when page2 is accessed
  const history = useHistory()
  const handlers = useSwipeable({
    onSwipedLeft: () => history.push(`/users/${userId}/page3`),
    onSwipedRight: () => history.push(`/users/${userId}`),
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
      <Bio user={user} />

      <div>
        <Interests user={user} />
        <SocialActivity user={user} />
      </div>
    </div>
  )
}
