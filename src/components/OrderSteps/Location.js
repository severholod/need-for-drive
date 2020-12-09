import React, {useEffect, useState} from 'react'
import {Map} from '../Map/Map'
import {citiesLoaded, pointsLoaded, setCurrentCity, setCurrentPoint} from '../../redux/actions'
import {connect} from 'react-redux'
import {FieldCity} from '../FormFields/FieldCity'
import {FieldCarPoint} from '../FormFields/FieldCarPoint'

export let Location = (props) => {
    const {
        setFieldValue,
        getCities,
        getPoints,
        cities,
        points,
        citiesLoaded,
        pointsLoaded,
        currentCity,
        currentPoint,
        dispatchCurrentCity,
        dispatchCurrentPoint,
    } = props
    const required = value => (value ? undefined : 'Required')
    useEffect(() => {
        getCities()
            .then(citiesList => {
                citiesLoaded(citiesList)
            })
        getPoints()
            .then(pointsList => {
                pointsLoaded(pointsList)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [isVisibleCitiesDropdown, setVisibilityCitiesDropdown] = useState(false)
    const [isVisiblePointsDropdown, setVisibilityPointsDropdown] = useState(false)
    const [pointsInCurrentCity, dispatchPointsInCurrentCity] = useState([])

    const setCurrentCity = (field, value) => {
        setFieldValue(field, value.name)
        setVisibilityCitiesDropdown(false)
        dispatchCurrentCity(value)
        const pointsList = points.filter(point => point.cityId.name === value.name)
        dispatchPointsInCurrentCity(pointsList)
    }
    const setCurrentPoint = (field, value) => {
        setFieldValue(field, value.address)
        setVisibilityPointsDropdown(false)
        dispatchCurrentPoint(value)
    }
    const resetFields = () => {
        setCurrentCity('city', '')
        setCurrentPoint('carPoint', '')
    }
    return (
        <div id="location">
            <div className="form-items">
                <div className="form-item">
                    <FieldCity
                        validator={required}
                        cities={cities}
                        setVisibilityCitiesDropdown={setVisibilityCitiesDropdown}
                        isVisibleCitiesDropdown={isVisibleCitiesDropdown}
                        setCurrentCity={setCurrentCity}
                        resetFields={resetFields}/>
                </div>
                <div className="form-item">
                    <FieldCarPoint
                        validator={required}
                        currentCity={currentCity}
                        pointsInCurrentCity={pointsInCurrentCity}
                        setVisibilityPointsDropdown={setVisibilityPointsDropdown}
                        isVisiblePointsDropdown={isVisiblePointsDropdown}
                        setCurrentPoint={setCurrentPoint}/>
                </div>
            </div>
            <div className="map-wrap">
                <div className="map-title form-item__label">Выбрать на карте:</div>
                {
                    points.length > 0 &&
                    <Map
                        currentCity={currentCity}
                        points={points}
                        cities={cities}
                        currentPoint={currentPoint}
                        setPoint={setCurrentPoint}
                        setCity={setCurrentCity}/>
                }
            </div>
        </div>
    )
}
const mapStateToProps = ({cities, points, currentCity, currentPoint, pointsInCurrentCity}) => ({
    cities,
    points,
    currentCity,
    currentPoint,
    pointsInCurrentCity
})
const mapDispatchToProps = {
    citiesLoaded: citiesLoaded,
    pointsLoaded: pointsLoaded,
    dispatchCurrentCity: setCurrentCity,
    dispatchCurrentPoint: setCurrentPoint
}

Location = connect(mapStateToProps, mapDispatchToProps)(Location)