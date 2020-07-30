import axios from "axios"

let apiUrl
export let wsUrl

const apiUrls = {
  production: "https://mysterious-anchorage-39512.herokuapp.com/",
  development: "http://localhost:3000/",
}

// ws = websocket. used for action cable
const wsUrls = {
  production: "wss://mysterious-anchorage-39512.herokuapp.com/cable",
  development: "ws://localhost:3000/cable",
}

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development
  wsUrl = wsUrls.development
} else {
  apiUrl = apiUrls.production
  wsUrl = wsUrls.production
}

const api = axios.create({
  baseURL: apiUrl,
})

// using email for fake auth.
// determines if user with specific email exists
// if so, logs in as that user
// if not, the form resets
export const getUserByEmail = async (email) => {
  try {
    const userList = await api.get("/users")
    const matchingUsers = userList.data.filter((user) => {
      return user.email === email
    })
    if (matchingUsers[0]) {
      return matchingUsers[0].id
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
  }
}

export const getAllRooms = async () => {
  try {
    const rooms = await api.get("/rooms")
    return rooms.data
  } catch (error) {
    console.error(error)
  }
}

export const getRoomWithDetail = async (roomId) => {
  try {
    const room = await api.get(`/roomwithdetails/${roomId}`)
    return room.data
  } catch (error) {
    console.error(error)
  }
}

export const createNewPost = async (postData) => {
  try {
    const newPost = await api.post(`/posts`, postData)
    return newPost.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllUsers = async () => {
  try {
    const users = await api.get("/users")
    return users.data
  } catch (error) {
    console.error(error)
  }
}

export const getUserById = async (user_id) => {
  try {
    const user = await api.get(`/users/${user_id}`)
    return user.data
  } catch (error) {
    console.error(error)
  }
}

// API call to get users based on search query
export const getUsersByFieldAndQuery = async (searchType, query) => {
  query = query.toLowerCase()
  searchType = searchType.toLowerCase()
  try {
    const users = await getAllUsers()

    switch (searchType) {
      case "tag":
        return users.filter((user) => {
          const userTags = user.tags.map((tag) => tag.name.toLowerCase())
          return userTags.includes(query)
        })

      case "team":
        return users.filter((user) => {
          return user.team.name.toLowerCase().includes(query)
        })

      default:
        return users.filter((user) => {
          return user[searchType].toLowerCase().includes(query)
        })
    }
  } catch (error) {
    console.error(error)
  }
}

export const getTeams = async () => {
  try {
    const teams = await api.get("/teams")
    return teams.data
  } catch (error) {
    console.error(error)
  }
}

export const getTeamWithDetail = async (id) => {
  try {
    const team = await api.get(`/teamwithdetails/${id}`)
    return team.data
  } catch (error) {
    console.error(error)
  }
}

// gets all users except the one logged in 
// so no one appears in their own search
export const getManyUsersById = async (userIds) => {
  try {
    const users = await getAllUsers()
    const usersInList = users.filter((user) => {
      return userIds.includes(user.id)
    })
    return usersInList
  } catch (error) {
    console.error(error)
  }
}
