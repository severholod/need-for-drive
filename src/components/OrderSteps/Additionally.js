/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import {Field} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {getCar, getEndDate, getStartDate, getTariff, getTariffs} from '../../redux/selectors'
import DatePicker from 'react-datepicker'
import "../../../node_modules/react-datepicker/dist/react-datepicker.min.css"
import {
    setCurrentTariff,
    setDifferenceTime,
    setEndDate,
    setOrderPrice,
    setStartDate,
    tariffsLoaded
} from '../../redux/actions'
import {AdditionallyCheckboxes} from './AdditionallyCheckboxes'
import {getDifTime} from '../../utils'

export const Additionally = (props) => {
    const car = useSelector(getCar)
    const startDate = useSelector(getStartDate)
    const endDate = useSelector(getEndDate)
    const currentTariff = useSelector(getTariff)
    const tariffs = useSelector(getTariffs)
    const dispatch = useDispatch()
    const dispatchStartDate = date => {
        if (!date) {
            dispatchEndDate(null)
        }
        dispatch(setStartDate(date))
    }
    const dispatchEndDate = date => {
        dispatch(setEndDate(date))
    }
    const minDate = new Date()
    const minStartTime = () => {
        if (startDate) {
            return startDate.getDate() === minDate.getDate() ? minDate : new Date().setHours(0, 0)
        }
        return minDate
    }
    const maxStartTime = () => {
        if (endDate) {
            return new Date().setHours(endDate.getHours() - 1, endDate.getMinutes())
        }
        return  new Date().setHours(23, 59)
    }
    const minEndTime = () => {
        if (endDate) {
            return endDate.getDate() === startDate.getDate() ?
                new Date().setHours(startDate.getHours() + 1, startDate.getMinutes()) :
                new Date().setHours(0, 0)
        }
        return startDate ? new Date().setHours(startDate.getHours() + 1, startDate.getMinutes()) : minDate
    }
    const getDifferenceTime = () => {
        if (startDate && endDate) {
            const differenceTime = getDifTime(startDate, endDate)
            dispatch(setDifferenceTime(differenceTime))
        } else {
            dispatch(setDifferenceTime(''))
        }
    }
    const getPrice = () => {
        if(endDate && startDate) {
            let price
            const differenceMinutes = Math.round((endDate - startDate) / 1000 / 60)
            switch (currentTariff.id) {
                case '5e26a0d2099b810b946c5d85':
                    price = differenceMinutes * currentTariff.price
                    break
                case '5e26a0e2099b810b946c5d86':
                    price = Math.ceil(differenceMinutes / 60 / 24) * currentTariff.price
                    break
                default:
                    price = 0
            }
            price = props.fullTank ? price + 500 : price
            price = props.babyChair ? price + 200 : price
            price = props.rightHand ? price + 1600 : price
            return price
        }
        return 0
    }
    useEffect(() => {
        getDifferenceTime()
    }, [startDate, endDate])
    useEffect(() => {
        const price = getPrice()
        dispatch(setOrderPrice(price))
    }, [startDate, endDate, props, currentTariff])
    useEffect(() => {
        props.getTariffs()
            .then(tariffs => dispatch(tariffsLoaded(tariffs)))
    }, [])
    const tariffClickHandler = (tariff) => {
        dispatch(setCurrentTariff(tariff))
    }
    return (
        <div id="additionally">
            <div className="form-items">
                <div className="form-items__title">Цвет</div>
                <div className="form-item mb-30">
                    <div className="form-item__radio">
                        <Field id="carColor-all" type="radio" name="carColor" value="любой"/>
                        <label htmlFor="carColor-all">Любой</label>
                    </div>
                    {
                        car.colors.map((color, index) => (
                            <div className="form-item__radio" key={`color_${index}`}>
                                <Field id={`color_${index}`} type="radio" name="carColor" value={color}/>
                                <label htmlFor={`color_${index}`}>{color}</label>
                            </div>
                        ))
                    }
                </div>
                <div className="form-items__title">Дата аренды</div>
                <div className="form-item">
                    <label className="form-item__label form-item__label_short">С</label>
                    <DatePicker
                        onChange={dispatchStartDate}
                        selected={startDate}
                        dateFormat="d.M.yyyy HH:mm"
                        timeFormat="HH:mm"
                        placeholderText="Выберите дату и время"
                        className="form-item__input"
                        showTimeSelect
                        isClearable
                        minDate={minDate}
                        maxDate={endDate ? endDate : undefined}
                        minTime={minStartTime()}
                        maxTime={maxStartTime()}
                    />
                </div>
                <div className="form-item mb-30">
                    <label className="form-item__label form-item__label_short">По</label>
                    <DatePicker
                        onChange={dispatchEndDate}
                        disabled={!startDate}
                        selected={endDate}
                        dateFormat="d.M.yyyy HH:mm"
                        timeFormat="HH:mm"
                        placeholderText="Выберите дату и время"
                        className="form-item__input"
                        showTimeSelect
                        isClearable
                        minDate={startDate}
                        minTime={minEndTime()}
                        maxTime={new Date().setHours(23, 59)}
                    />
                </div>
                <div className="form-items__title">Тариф</div>
                <div className="form-item">
                    {
                        tariffs.map((tariff, index) => (
                            <div className="form-item__radio form-item__radio_w100" key={`tariff_${index}`}>
                                <Field id={`tariff-${index}`}
                                       type="radio" name="tariff"
                                       onChange={() => tariffClickHandler(tariff)}
                                       checked={tariff.id === currentTariff.id}/>
                                <label htmlFor={`tariff-${index}`}>
                                    {`${tariff.rateTypeId.name}, ${tariff.price}₽/${tariff.rateTypeId.unit}`}
                                </label>
                            </div>
                        ))
                    }
                </div>
                <AdditionallyCheckboxes />
            </div>
        </div>
    )
}