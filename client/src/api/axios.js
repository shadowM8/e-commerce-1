import axios from 'axios'
const serverUrl = `http://localhost:3000`

export default
axios.create({
  baseURL: `${serverUrl}`
})
