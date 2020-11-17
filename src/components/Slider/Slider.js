import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {slides} from '../content'

export const Slider = () => {
    const [activeSlide, changeSlide] = useState(0)

    const onChangeSlide = newIndex => {
        if(newIndex < 0 || newIndex > slides.length - 1) {
            return false
        }
        changeSlide(newIndex)
    }
    const prevSlide = () => {
        onChangeSlide(activeSlide - 1)
    }
    const nextSlide = () => {
        onChangeSlide(activeSlide + 1)
    }
    return (
        <section className="slider">
            <button
                className="slider-nav slider-prev"
                onClick={prevSlide} />
            <div className="slider-items">
                { slides.map((slide, index) => {
                    return (
                        <div
                            key={`slide_${index}`}
                            className={classNames('slider-item', {'active':index === activeSlide})}
                            style={ {backgroundImage: `url(${slide.img})`} }>
                            <div className="slider-item__content">
                                <div className="slider-item__title">{slide.title}</div>
                                <div className="slider-item__description">{slide.description}</div>
                                <Link to="/order">
                                    <button
                                        className={`btn btn_${slide.button.color} btn_${slide.button.size}`}>
                                        {slide.button.text}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )
                }) }
            </div>
            <button
                className="slider-nav slider-next"
                onClick={nextSlide} />
            <div className="slider-dots">
                {
                    slides.map((_, index) => {
                        return (
                            <span
                                key={`dot_${index}`}
                                className={classNames('slider-dot', {'active':index === activeSlide})}
                                onClick={() => changeSlide(index)}>
                            </span>
                        )
                    })
                }
            </div>
        </section>
    )
}