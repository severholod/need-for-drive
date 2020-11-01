import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {changeSlide} from '../../redux/actions'

export let Slider = ({items, activeItem, onChangeSlide}) => {
    return (
        <section className="slider">
            <button
                className="slider-nav slider-prev"
                onClick={() => onChangeSlide(activeItem - 1)}></button>
            <div className="slider-items">
                { items.map((item, index) => {
                    return (
                        <div
                            key={`slide_${index}`}
                            className={`slider-item ${index === activeItem ? 'active' : ''}`}
                            style={ {backgroundImage: `url(${item.img})`} }>
                            <div className="slider-item__content">
                                <div className="slider-item__title">{item.title}</div>
                                <div className="slider-item__description">{item.description}</div>
                                <Link to="/order">
                                    <button
                                        className={`btn btn_${item.button.color} btn_${item.button.size}`}>
                                        {item.button.text}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )
                }) }
            </div>
            <button
                className="slider-nav slider-next"
                onClick={() => onChangeSlide(activeItem + 1)}></button>
            <div className="slider-dots">
                {
                    items.map((_, index) => {
                        return (
                            <span
                                key={`dot_${index}`}
                                className={`slider-dot ${activeItem === index ? 'active' : ''}`}
                                onClick={() => onChangeSlide(index)}>
                            </span>
                        )
                    })
                }
            </div>
        </section>
    )
}
const mapStateToProps = ({sliderItems, activeItem}) => {
    return {
        items: sliderItems,
        activeItem
    }
}
const mapDispatchToProps = {
    onChangeSlide: changeSlide,
}
Slider = connect(mapStateToProps, mapDispatchToProps)(Slider)