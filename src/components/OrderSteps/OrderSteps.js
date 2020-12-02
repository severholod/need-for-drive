import React from 'react'
import {Form, Formik} from 'formik'
import {Route, Switch} from 'react-router-dom'
import {Location} from './Location'
import {ErrorIndicator} from '../ErrorBoundary/ErrorIndicator'
import {OrderInfo} from '../OrderInfo/OrderInfo'
import {withApiFactoryService} from '../../services/withApiFactoryService'
import {Cars} from './Cars'
import {Additionally} from './Additionally'
import {Total} from './Total'

export let OrderSteps = ({apiFactoryService}) => {
    const initialValues = {
        "carType": "all",
        "carColor": "",
        "tariff": "",
        "fullTank": false,
        "babyChair": false,
        "rightHand": false
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}>
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
                                       tariff={formProps.values.tariff}
                                       fullTank={formProps.values.fullTank}
                                       babyChair={formProps.values.babyChair}
                                       rightHand={formProps.values.rightHand}/>
                               )}/>
                               <Route path='/order/total' render={() => (
                                   <Total
                                    fullTank={formProps.values.fullTank}/>
                               )}/>
                                <Route component={ErrorIndicator}/>
                            </Switch>
                        </div>
                        <OrderInfo
                            carColor={formProps.values.carColor}
                            tariff={formProps.values.tariff}
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