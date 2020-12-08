import React, {useState} from 'react'
import {Form, Formik} from 'formik'
import {Route, Switch} from 'react-router-dom'
import {Location} from './Location'
import {ErrorIndicator} from '../ErrorBoundary/ErrorIndicator'
import {OrderInfo} from '../OrderInfo/OrderInfo'
import {withApiFactoryService} from '../../services/withApiFactoryService'
import {Cars} from './Cars'
import {Additionally} from './Additionally'
import {Total} from './Total'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getCar, getCity, getEndDate, getPoint, getPrice, getStartDate, getTariff} from '../../redux/selectors'

const initialValues = {
    "carType": "all",
    "carColor": "",
    "fullTank": false,
    "babyChair": false,
    "rightHand": false
}
export let OrderSteps = ({apiFactoryService}) => {
    const city = useSelector(getCity)
    const point = useSelector(getPoint)
    const car = useSelector(getCar)
    const orderPrice = useSelector(getPrice)
    const startDate = useSelector(getStartDate)
    const endDate = useSelector(getEndDate)
    const tariff = useSelector(getTariff)
    const history = useHistory()
    const [orderIsSent, setSendStatus] = useState(false)
    const createOrder = (values) => {
        setSendStatus(true)
        const body = {
            ...values,
            city,
            point,
            car,
            orderPrice,
            startDate,
            endDate,
            tariff
        }
        apiFactoryService.sendOrder(body)
            .then(id => {
                setSendStatus(false)
                history.push(`/detail/#${id}`)
            })
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={createOrder}>
            {formProps => {
                return (
                    <Form className="order-content">
                        <div className="order-step">
                            <Switch>
                                <Route path='/order/' exact render={() => (
                                    <Location
                                        setFieldValue={formProps.setFieldValue}
                                        getCities={apiFactoryService.getCities}
                                        getPoints={apiFactoryService.getPoints}
                                    />
                                )}/>
                                <Route path='/order/cars/' render={() => (
                                <Cars
                                    getCars={apiFactoryService.getCars}
                                    carType={formProps.values.carType}/>
                                )}/>
                               <Route path='/order/additionally/' render={() => (
                                   <Additionally
                                       getTariffs={apiFactoryService.getTariffs}
                                       fullTank={formProps.values.fullTank}
                                       babyChair={formProps.values.babyChair}
                                       rightHand={formProps.values.rightHand}/>
                               )}/>
                               <Route path='/order/total/' render={() => (
                                   <Total
                                    fullTank={formProps.values.fullTank}/>
                               )}/>
                                <Route component={ErrorIndicator}/>
                            </Switch>
                        </div>
                        <OrderInfo
                            request={orderIsSent}
                            carColor={formProps.values.carColor}
                            fullTank={formProps.values.fullTank}
                            babyChair={formProps.values.babyChair}
                            rightHand={formProps.values.rightHand}/>
                    </Form>
                )
            }}
        </Formik>
    )
}
OrderSteps = withApiFactoryService(OrderSteps)