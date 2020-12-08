import axios from 'axios'
export const imgUrl = 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com'
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
        return cities.data.data.map(city => city)
    }
    getPoints = async () => {
        const points = await this.getResource('/point')
        return points.data.data.map(point => point)
    }
    getCars = async () => {
        const cars = await this.getResource('/car')
        return cars.data.data
    }
    getTariffs = async () => {
        const tariffs = await this.getResource('/rate')
        return tariffs.data.data
    }
    sendOrder = async (body) => {
        const statusRes = await this.getResource('/orderStatus')
        const status = statusRes.data.data[0]
        const order = {
            "orderStatusId": status,
            "cityId": body.city,
            "pointId": body.point,
            "carId": body.car,
            "color": body.carColor,
            "dateFrom": body.startDate.getTime(),
            "dateTo": body.endDate.getTime(),
            "rateId": body.tariff,
            "price": body.orderPrice,
            "isFullTank": body.fullTank,
            "isNeedChildChair": body.babyChair,
            "isRightWheel": body.rightHand
        }
        const res = await axios({
            method: 'POST',
            url: `${this.apiUrl}/order/`,
            headers: {
                ...this.config.headers,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(order)
        })
        return res.data.data.id
    }
    getOrder = async (id) => {
        const res = await this.getResource(`/order/${id}`)
        return res.data.data
    }
}