import React, {useEffect, useState} from 'react'
import axios from 'axios'
import pointIcon from '../../assets/img/map-point.png'
import {Loader} from '../Loader/Loader'
import classNames from 'classnames'

export const Map = ({currentCity, currentPoint, points, setPoint, setCity}) => {
    const apiKey = '5e01c479-39d7-4233-9b65-74d453cac7fa'
    const YandexApiUrl = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
    const addScript = () => {
        return new Promise((resolve, reject) => {
            const YandexApiScript = document.createElement('script')
            YandexApiScript.src = YandexApiUrl
            YandexApiScript.async = true
            YandexApiScript.type = 'text/javascript'
            YandexApiScript.onerror = () => reject('YandexAPI did not download')
            YandexApiScript.onload = () => resolve()
            document.head.appendChild(YandexApiScript)
        })
    }
    const [map, setMap] = useState({})
    const [mapReady, setMapReady] = useState(false)
    useEffect(() => {
        addScript()
            .then(() => {
                createMap()
            })
            .catch(er => console.error(er))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const updateCenter = async () => {
        const center = await getCenter(currentCity, currentPoint)
        if(center && mapReady) {
            map.setCenter(center, currentPoint ? 14 : 12)
        }
    }
    useEffect(() => {
        updateCenter()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCity, currentPoint])
    useEffect(() => {
        if(map.geoObjects) {
            createPlacemark()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map])

    const createMap = () => {
        const init = () => {
            const map = new window.ymaps.Map(
                'map',
                {
                    center: [53.23042954121858,50.19112696465629],
                    zoom: 6
                },
                {
                    searchControlProvider: 'yandex#search',
                }
            )
            setMap(map)
        }
        window.ymaps.ready(init)
    }
    const getPoints = async (points) => {
        const pointsCoord = []
        for (let point of points) {
            const apiUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${point.cityId.name + ' ' + point.address}&apikey=${apiKey}`
            const res = await axios.get(apiUrl)
            pointsCoord.push(res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse())
        }
        return pointsCoord
    }
    const createPlacemark = () => {
        getPoints(points).then(res => {
            res.map((point, index) => {
                return new window.ymaps.Placemark(point, {
                    hintContent: points[index].address
                },{
                    iconLayout: 'default#image',
                    iconImageHref: pointIcon,
                    iconImageSize: [18, 18]
                })
            }).forEach((placemark, index) => {
                placemark.events.add('click', () => {
                    setValues((index))
                })
                map.geoObjects.add(placemark)
            })
            setMapReady(true)
        })
    }
    const getCenter = async (city, point) => {
        if(!city) {return false}
        const apiString = `${city ? city : ''} ${point ? point : ''}`
        const apiUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${apiString}&apikey=${apiKey}`
        const res = await axios.get(apiUrl)
        return res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse()
    }
    const setValues = (index) => {
        setCity('city', points[index].cityId.name)
        setPoint('carPoint', points[index].address)
    }
    return (
        <>
        {!mapReady && <Loader />}
        <div id="map" className={classNames('map', {'map-loading': !mapReady})} />
        </>
    )
}