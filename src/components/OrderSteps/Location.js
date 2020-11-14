import React, {useEffect, useState} from 'react'
import {Field} from 'formik'
import {Map} from '../Map/Map'
import {citiesLoaded, pointsLoaded, setCurrentCity, setCurrentPoint} from '../../redux/actions'
import {connect} from 'react-redux'

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

    const search = (data = [], key = '') => {
        return data.filter(el => el.toLowerCase().includes(key.toLowerCase()))
    }

    const [isVisibleCitiesDropdown, setVisibilityCitiesDropdown] = useState(false)
    const [isVisiblePointsDropdown, setVisibilityPointsDropdown] = useState(false)
    const [pointsInCurrentCity, dispatchPointsInCurrentCity] = useState([])

    const setCurrentCity = (field, value) => {
        setFieldValue(field, value)
        setVisibilityCitiesDropdown(false)
        dispatchCurrentCity(value)
        const pointsList = points.filter(point => point.cityId.name === value).map(point => point.address)
        dispatchPointsInCurrentCity(pointsList)
    }
    const setCurrentPoint = (field, value) => {
        setFieldValue(field, value)
        setVisibilityPointsDropdown(false)
        dispatchCurrentPoint(value)
    }
    return (
        <div id="location">
            <div className="form-items">
                <div className="form-item">
                    <Field name="city" validate={required}>
                        {({field}) => {
                            const visibleCities = search(cities, field.value)
                            return (
                                <>
                                    <label className="form-item__label form-item__label_large">Город</label>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Начните вводить город ..."
                                        autoComplete="off"
                                        className="form-item__input"
                                        onFocus={() => setVisibilityCitiesDropdown(true)}
                                        />
                                    {
                                        field.value &&
                                        <span className="form-item__reset" onClick={() => {
                                            setCurrentCity(field.name, '')
                                            setCurrentPoint('carPoint', '')
                                        }}/>
                                    }
                                    {
                                        isVisibleCitiesDropdown && field.value &&
                                        <ul className="form-item__dropdown">
                                            {visibleCities.map((city, index) => (
                                                <li
                                                    key={`city_${index}`}
                                                    onClick={() => setCurrentCity(field.name, city)}>
                                                    {city}
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </>
                            )
                        }}
                    </Field>
                </div>
                <div className="form-item">
                    <Field name="carPoint" validate={required}>
                        {({field}) => {
                            const visiblePoints = search(pointsInCurrentCity, field.value)
                            return (
                                <>
                                    <label className="form-item__label form-item__label_large">Пункт выдачи</label>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Начните вводить пункт ..."
                                        autoComplete="off"
                                        className="form-item__input"
                                        disabled={!currentCity}
                                        onFocus={() => setVisibilityPointsDropdown(true)}
                                    />
                                    {
                                        field.value &&
                                        <span className="form-item__reset" onClick={() => {
                                            setCurrentPoint(field.name, '')
                                        }}/>
                                    }
                                    {
                                        isVisiblePointsDropdown && field.value &&
                                        <ul className="form-item__dropdown">
                                            {visiblePoints.map((point, index) => (
                                                <li
                                                    key={`city_${index}`}
                                                    onClick={() => setCurrentPoint(field.name, point)}>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </>
                            )
                        }}
                    </Field>
                </div>
            </div>
            <div className="map-wrap">
                <div className="map-title form-item__label">Выбрать на карте:</div>
                {
                    points.length > 0 &&
                    <Map
                        currentCity={currentCity}
                        points={points}
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

