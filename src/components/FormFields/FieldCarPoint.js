import {Field} from 'formik'
import React from 'react'

export const FieldCarPoint = (props) => {
    const {
        validator,
        search,
        currentCity,
        pointsInCurrentCity,
        setVisibilityPointsDropdown,
        isVisiblePointsDropdown,
        setCurrentPoint
    } = props
    return (
        <Field name="carPoint" validate={validator}>
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
    )
}