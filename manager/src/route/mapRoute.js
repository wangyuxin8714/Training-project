import React from 'react';
import {Switch, Route,Redirect} from "dva/router"


const MapRoute=props=>(
    <Switch>
        {
            props.route.map(item=>(
                item.path?<Route
                    key={item.path}
                    path={item.path}
                    render={props=><item.component {...props} route={item.children}/>}
                ></Route>:<Redirect
                    key={item.from}
                    {...item}
                ></Redirect>
            ))
        }
    </Switch>
)

export default MapRoute
