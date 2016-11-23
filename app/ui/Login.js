/**
 * Created by zheng on 2016/10/21.
 */
import React , {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text , Image} from  'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import API from  './../net/api';
import TopBarUtils from  './views/TopBarUtils';
import NavigationBar from  './views/NavigationBar';
import UserCenter from  './UserCenter';

export default class LoginPage extends Component{



    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {username:'', password:'', visible: false};
    }

    _loginEvent(){
        this.setState({visible: true});
        let formData = new FormData();
        formData.append("login", this.state.username);
        formData.append("password", this.state.password);
        fetch(API.LOGIN, {method:"POST", body:formData})
            .then((respnose)=>respnose.json())
            .then((json)=>{
                global.user = json;
                this.setState({visible: false});
                this.props.navigator.push({
                    component:UserCenter,
                    name: "公司详情",
                    params: {
                        ...this.props
                    }
                });
            });
    }

    render(){
        return(
            <View style={styles.container}>
                <Spinner style={{flex:1}} visible={this.state.visible}></Spinner>
                <NavigationBar
                    navigator={this.props.navigator}
                    leftButton={TopBarUtils.getLeftButton(()=>this.props.navigator.pop())}
                    popEnabled={false}
                    title="登录"
                />
                <View style={styles.usernameAndPwdInputStyle} >
                    <TextInput style={styles.inputTextStyle} placeholder="请输入用户名" onChangeText={(username)=> this.setState({username:username})}/>
                    <View style={{height:1, backgroundColor :'#FFa589'}}></View>
                    <TextInput style={styles.inputTextStyle} placeholder="请输入密码" password={true} onChangeText={(password)=> this.setState({password: password})}/>

                </View>
                <TouchableOpacity style={styles.loginButtonStyle} onPress={this._loginEvent.bind(this)}>
                    <Text style={styles.loginButtonTextStyle}>登录</Text>
                </TouchableOpacity>
                <View style={{ flexDirection:'row',justifyContent:'space-between', marginLeft:16,marginRight:16 }}>
                    <Text style={styles.registerButtonStyle}>注册阿米哥</Text>
                    <Text style={styles.forgotButtonStyle}>忘记密码</Text>
                </View>

                <View style={{flexDirection:'row', marginTop:16, alignItems:'center',  marginLeft:16,marginRight:16}}>
                    <View style={{height:1, backgroundColor: '#dcdcdc', flex:1}} />
                    <Text style={{marginLeft:8, marginRight:8, color:'#dcdcdc'}}>通过以下方式快速登录</Text>
                    <View style={{height:1, backgroundColor: '#dcdcdc', flex:1}} />
                </View>
                <View style={{flexDirection:'row', marginTop:24,justifyContent:'space-between',  marginLeft:16,marginRight:16}}>
                    <Image source={require('./../../images/LoginViewweixin.png')} style={styles.thridImageStyle}></Image>
                    <Image source={require('./../../images/LoginViewweibo.png')} style={styles.thridImageStyle}></Image>
                    <Image source={require('./../../images/LoginViewfacebook.png')} style={styles.thridImageStyle}></Image>
                    <Image source={require('./../../images/LoginViewLinkedIn.png')} style={styles.thridImageStyle}></Image>
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex:1,
    },

    usernameAndPwdInputStyle:{
        height:90,
        borderWidth:1,
        borderColor:'#FFa589',
        marginTop:32,
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginLeft:16,
        marginRight:16,
        marginTop:16,
    },

    inputTextStyle:{
        height: 41,
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 12,

    },

    loginButtonStyle:{
        backgroundColor: '#FFa589',
        borderBottomLeftRadius : 5,
        borderBottomRightRadius : 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginLeft:16,
        marginRight:16,
    },

    loginButtonTextStyle:{
       fontSize:14,
        color:'white'
    },

    registerButtonStyle:{
        fontSize:13,
        color:'#FFa589',
        marginTop:16,

    },


    forgotButtonStyle:{
        fontSize:13,
        color:'#FFa589',
        marginTop:16,
    },

    thridImageStyle:{
      width:48,
      height:48,
    }
});