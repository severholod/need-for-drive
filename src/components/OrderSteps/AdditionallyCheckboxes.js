import React from 'react'
import {Field} from 'formik';

export const AdditionallyCheckboxes = () => (
    <>
        <div className="form-items__title">Тариф</div>
        <div className="form-item">
            <div className="form-item__radio form-item__radio_w100">
                <Field id="tariff-min" type="radio" name="tariff" value="Поминутно"/>
                <label htmlFor="tariff-min">Поминутно, 7₽/мин</label>
            </div>
            <div className="form-item__radio form-item__radio_w100">
                <Field id="tariff-day" type="radio" name="tariff" value="На сутки"/>
                <label htmlFor="tariff-day">На сутки, 1999 ₽/сутки</label>
            </div>
        </div>
        <div className="form-items__title">Доп услуги</div>
        <div className="form-item">
            <div className="form-item__radio form-item__radio_w100">
                <Field id="fullTank" type="checkbox" name="fullTank"/>
                <label htmlFor="fullTank">Полный бак, 500р</label>
            </div>
            <div className="form-item__radio form-item__radio_w100">
                <Field id="babyChair" type="checkbox" name="babyChair"/>
                <label htmlFor="babyChair">Детское кресло, 200р</label>
            </div>
            <div className="form-item__radio form-item__radio_w100">
                <Field id="rightHand" type="checkbox" name="rightHand"/>
                <label htmlFor="rightHand">Правый руль, 1600р</label>
            </div>
        </div>
    </>
)