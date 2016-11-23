/**
 * Created by zheng on 2016/10/28.
 */
import React,{Component} from 'react'
import {
    Navigator,
}from 'react-native'
import Home from './../ui/Home'

export default class Root extends Component{


    render() {
        return (
            <Navigator
                initialRoute={{
                    name: 'Home',
                    component:Home
                }}
                configureScene= {(route, routeStack) => Object.assign(Navigator.SceneConfigs.FadeAndroid,{
                    defaultTransitionVelocity:10000,
                })}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }}
            />
        );
    }
}