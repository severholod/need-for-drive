import React from 'react'
import {Form, Formik} from 'formik'
import {Route, Switch} from 'react-router-dom'
import {Location} from './Location'
import {ErrorIndicator} from '../ErrorBoundary/ErrorIndicator'
import {OrderInfo} from '../OrderInfo/OrderInfo'
import {withApiFactoryService} from '../../services/withApiFactoryService'
import {Cars} from './Cars'

export let OrderSteps = ({apiFactoryService}) => {

    return (
        <Formik
            initialValues={{}}
            onSubmit={(values) => console.log(values)}>
            {formProps => {
                return (
                    <Form className="order-content">
                        <div className="order-step">
                            <Switch>
                                <Route
                                    path='/order/'
                                    exact
                                    render={() => (
                                        <Location
                                            setFieldValue={formProps.setFieldValue}
                                            getCities={apiFactoryService.getCities}
                                            getPoints={apiFactoryService.getPoints}
                                        />
                                    )}/>
                                <Route path='/order/cars/' render={() => <Cars />}/>
                                <Route component={ErrorIndicator}/>
                            </Switch>
                        </div>
                        <OrderInfo isValid={formProps.isValid}/>
                    </Form>
                )
            }}
        </Formik>
    )
}
OrderSteps = withApiFactoryService(OrderSteps)