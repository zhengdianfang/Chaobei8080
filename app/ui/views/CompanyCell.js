/**
 * Created by zheng on 2016/10/28.
 */
import React , {Component, PropTypes} from 'react';
import {View, StyleSheet,  Text , Image, TouchableHighlight,   Navigator} from  'react-native';
import CompanyInfor from './../CompanyInfor';

export default class CompanyCell extends Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    render(){
        return(
            <TouchableHighlight style={styles.diverStyle} onPress={()=>this._onPress()} underlayColor='transparent'>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri:this.props.company.banner.thumb}} style={styles.logoStyles} resizeMode="contain" />
                    <Text style={{marginLeft:8}}>{this.props.company.name}</Text>
                </View>

            </TouchableHighlight>

        );
    }

    _onPress(){
        this.props.navigator.push({
            component: CompanyInfor,
            name: "公司详情",
            params: {
                ...this.props
            }
        });
    }

}

const styles = StyleSheet.create({
    diverStyle:{
        borderBottomColor : "#dcdcdc",
        padding: 16,
        borderBottomWidth:1
    },

    logoStyles:{
        borderWidth:1,
        borderColor:"#dcdcdc",
        width:80,
        height:80
    }
});