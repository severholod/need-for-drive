import axios from 'axios'
export class ApiFactoryService {
    apiUrl = 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db'
    config = {
        headers: {
            'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
            'Authorization': '4cbcea96de'
        }
    }
    getResource = async (url) => {
        const res = await axios.get(`${this.apiUrl}${url}`, this.config)
        return res
    }
    getCities = async () => {
        const cities = await this.getResource('/city')
        return cities.data.data.map(city => city.name)
    }
    getPoints = async () => {
        const points = await this.getResource('/point')
        return points.data.data.map(point => {
            return point
        })
    }
}