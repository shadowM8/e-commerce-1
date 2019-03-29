import axios from 'axios'
const serverUrl = `http://35.187.245.8`

export default
axios.create({
  baseURL: `${serverUrl}`
})
