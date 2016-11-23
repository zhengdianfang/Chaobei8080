/**
 * Created by zheng on 2016/11/2.
 */
import React , {Component} from 'react';
import {View, StyleSheet, TextInput, Text , Image, InteractionManager, ScrollView} from  'react-native';
import API from './../net/api';
import HTMLView from 'react-native-htmlview';
import TopBarUtils from './views/TopBarUtils';
import NavigationBar from './views/NavigationBar'
import ViewsUitls from './ViewsUitls';

export default class UserCenter extends Component{
    render(){
        return(
            <View>
                <Text>11111{global.user.uid}</Text>
            </View>
        );
    }
}