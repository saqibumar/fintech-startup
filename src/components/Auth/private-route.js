import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, canActivate, ...rest }) => (
  <Route {...rest} render={(props) => (
    canActivate && canActivate()
      ? <Component {...props} />
      : <Redirect to={{pathname: '/signup', state: { from: props.location }}} />
  )} />
)

export default PrivateRoute;