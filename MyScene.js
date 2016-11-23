/**
 * Created by zheng on 2016/10/21.
 */
import React, {Component} from 'react'
import {View ,Text, TouchableOpacity, StyleSheet} from  'react-native'

export default class MyScene extends Component{
    static defaultProps = {title : "page1"};
    render(){
        return(<View style={{flex:1, backgroundColor:"white",  alignItems: 'center'}}>
                    <Text style={{paddingTop: 100, textAlign:'center'}}>{this.props.title}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            alert("Success");
                        }}
                    >
                        <Text style={{color:'white', textAlign :'center'}}>确定</Text>
                    </TouchableOpacity>
               </View>
        );
    };


}

const styles = StyleSheet.create({
    button : {
        height : 40,
        width : 150,
        overflow : 'hidden',
        backgroundColor: 'green',
        justifyContent:'center',
        borderRadius : 20,
        alignItems: 'center',
    },
});