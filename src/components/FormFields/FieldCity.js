import {Field} from 'formik'
import React from 'react'

export const FieldCity = (props) => {
    const {
        validator,
        search,
        cities,
        setVisibilityCitiesDropdown,
        isVisibleCitiesDropdown,
        setCurrentCity,
        resetFields
    } = props
    return (
        <Field name="city" validate={validator}>
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
                            disabled={!Boolean(cities.length)}
                            onFocus={() => setVisibilityCitiesDropdown(true)}
                        />
                        {
                            field.value &&
                            <span className="form-item__reset" onClick={resetFields}/>
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
    )
}
