/**
 * Created by zheng on 2016/10/31.
 */
import React  from 'react';
import {
    TouchableHighlight,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
export  default class TopBarUtils{
    static getLeftButton(callBack) {
        return <TouchableOpacity
            style={{padding:8}}
            onPress={callBack}>
            <Image
                style={{width: 32, height: 32,}}
                source={require('./../../../images/BackButtonC2.png')}/>
        </TouchableOpacity>
    }

    static getRightButton(callBack) {
        return <TouchableOpacity
            style={{padding:8}}
            onPress={callBack}>
            <Image
                style={{width: 24, height: 24,}}
                source={require('./../../../images/user_center.png')}/>
        </TouchableOpacity>
    }

}