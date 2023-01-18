import axios from 'axios'
//Import URL
import { URL } from '../App'


const API_URL = `${URL}/api/sightings/`

//Create new sighting
const createSighting = async (sightingData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, sightingData, config)

    return response.data

}

//Get user specific sightings
const getMySightings = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'user', config)

    return response.data

}

//Get sightings
const getSightings = async () => {
    const response = await axios.get('https://squatch-watch-backend-deployment.onrender.com/api/sightings')

    return response.data
}

//Delete a sighting
const deleteSighting = async (sightingID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.delete(API_URL + sightingID, config)
    return response.data
}

const sightingService = {
    getSightings,
    createSighting,
    getMySightings,
    deleteSighting
}

export default sightingService