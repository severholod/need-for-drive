/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import {Field} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {getCar, getEndDate, getStartDate} from '../../redux/selectors'
import DatePicker from 'react-datepicker'
import "../../../node_modules/react-datepicker/dist/react-datepicker.min.css"
import {setDifferenceTime, setEndDate, setOrderPrice, setStartDate} from '../../redux/actions'
import {AdditionallyCheckboxes} from './AdditionallyCheckboxes'

export const Additionally = (props) => {
    const car = useSelector(getCar)
    const startDate = useSelector(getStartDate)
    const endDate = useSelector(getEndDate)
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
            let differenceDay = 0
            let differenceHours = Math.round((endDate - startDate) / 1000 / 60 / 60)
            if (differenceHours >= 24) {
                differenceDay = Math.floor(differenceHours / 24)
                differenceHours = differenceHours % 24
            }
            const differenceTime = `${differenceDay ? differenceDay + 'д': ''} ${differenceHours}ч`
            dispatch(setDifferenceTime(differenceTime))
        } else {
            dispatch(setDifferenceTime(''))
        }
    }
    const getPrice = () => {
        if(endDate && startDate) {
            let price
            const differenceMinutes = Math.round((endDate - startDate) / 1000 / 60)
            // использование консутркции switch-case больше подходит в случае добавления большего количества тарифов
            switch (props.tariff) {
                case 'Поминутно':
                    price = differenceMinutes * 7
                    break
                case 'На сутки':
                    price = Math.ceil(differenceMinutes / 60 / 24) * 1999
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
    }, [startDate, endDate, props])
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
                <AdditionallyCheckboxes />
            </div>
        </div>
    )
}