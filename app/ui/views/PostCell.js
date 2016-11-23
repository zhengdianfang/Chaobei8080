/**
 * Created by zheng on 2016/10/28.
 */
import React , {Component} from 'react';
import {View, StyleSheet,  Text , Image, TouchableHighlight} from  'react-native';
import PostInfor from './../PostInfor';

export default class PostCell extends Component{

    _onPress(){
        this.props.navigator.push({
            component: PostInfor,
            name: "职位详情",
            params: {
                ...this.props
            }
        });
    }

    render(){
        return(
            <TouchableHighlight style={styles.diverStyle} onPress={()=>this._onPress()} underlayColor='transparent'>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'#FF5400', fontSize:14}}>{this.props.item.name}</Text>
                    <View style={styles.postFrameStyle}>
                        <Text style={styles.postFieldStyle}>{this.props.item.work_place} | {this.props.item.degree} | {this.props.item.pay} </Text>
                        <Image source={{uri:this.props.item.company.banner.thumb}} style={styles.logoStyles} resizeMode="contain" />
                    </View>
                </View>

            </TouchableHighlight>

        );
    }
}

const styles = StyleSheet.create({
    diverStyle:{
        borderBottomColor : "#dcdcdc",
        padding: 16,
        borderBottomWidth:1
    },

    postFrameStyle:{
        flexDirection:'row', justifyContent:'space-between', marginTop:8 ,alignItems:'center'
    },

    postFieldStyle:{
        color:"#505050",
        fontSize:13
    },

    logoStyles:{
        borderWidth:1,
        borderColor:"#dcdcdc",
        width:40,
        height:30
    }
});