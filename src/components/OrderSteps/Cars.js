import React, {useEffect, useState} from 'react'
import {Field} from 'formik'
import {Loader} from '../Loader/Loader'
import {carsLoaded, setCurrentCar} from '../../redux/actions'
import {connect} from 'react-redux'
import classNames from 'classnames'

const imgUrl = 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com'
export let Cars = (props) => {
    const {
        getCars,
        cars,
        currentCar,
        carsLoaded,
        setCurrentCar,
        carType
    } = props
    const [isLoading, setLoadingStatus] = useState(true)
    useEffect(() => {
        if (cars.length) {return false}
        getCars()
            .then(cars => {
                carsLoaded(cars)
                setLoadingStatus(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const carFilter = (cars, key) => {
        if (key === 'all') {
            return cars
        }
        return cars.filter(car => car.categoryId.id === key)
    }
    const visibleCars = carFilter(cars, carType)
    if(isLoading && !cars.length) {
        return (
            <Loader />
        )
    }
    return (
        <div className="cars">
            <div className="form-items">
                <div className="form-item">
                    <div className="form-item__radio">
                        <Field id="carType-all" type="radio" name="carType" value="all"/>
                        <label htmlFor="carType-all">Все</label>
                    </div>
                    <div className="form-item__radio">
                        <Field id="carType-basic" type="radio" name="carType" value="5e25c98d099b810b946c5d62"/>
                        <label htmlFor="carType-basic">Эконом</label>
                    </div>
                    <div className="form-item__radio">
                        <Field id="carType-premium" type="radio" name="carType" value="5e25c99a099b810b946c5d63"/>
                        <label htmlFor="carType-premium">Премиум</label>
                    </div>
                </div>
            </div>
            <div className="cars-list">
                {visibleCars.map(car => (
                    <div
                        key={car.id}
                        className={classNames("cars-item", {"cars-item_active" : car.id === currentCar.id})}
                        onClick={() => setCurrentCar(car)}>
                        <div className="cars-item__name">{car.name}</div>
                        <div className="cars-item__price">{car.priceMin} - {car.priceMax} ₽</div>
                        <div className="cars-item__image">
                            <img crossOrigin="anonymous" referrerPolicy={origin} src={`${imgUrl}${car.thumbnail.path}`} alt={car.name}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
const mapStateToProps = ({currentCar, cars}) => ({currentCar, cars})
const mapDispatchToProps = {
    carsLoaded: carsLoaded,
    setCurrentCar: setCurrentCar
}
Cars = connect(mapStateToProps, mapDispatchToProps)(Cars)