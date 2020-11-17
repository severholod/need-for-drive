import img1 from '../assets/img/slide1.jpg'
import img2 from '../assets/img/slide2.jpg'
import img3 from '../assets/img/slide3.jpg'
import img4 from '../assets/img/slide4.jpg'

export const slides = [
    {
        title: 'Бесплатная парковка',
        description: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
        img: img1,
        button: {
            text: 'Подробнее',
            color: 'darkgreen',
            size: 'medium'
        }
    },
    {
        title: 'Страховка',
        description: 'Полная страховка страховка автомобиля',
        img: img2,
        button: {
            text: 'Подробнее',
            color: 'darkblue',
            size: 'medium'
        }
    },
    {
        title: 'Бензин',
        description: 'Полный бак на любой заправке города за наш счёт',
        img: img3,
        button: {
            text: 'Подробнее',
            color: 'darkred',
            size: 'medium'
        }
    },
    {
        title: 'Обслуживание',
        description: 'Автомобиль проходит еженедельное ТО',
        img: img4,
        button: {
            text: 'Подробнее',
            color: 'darkviolet',
            size: 'medium'
        }
    }
]
export const menu =  [
    'Парковка',
    'Страховка',
    'Бензин',
    'Обслуживание'
]