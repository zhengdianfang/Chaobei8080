/**
 * Created by zheng on 2016/10/28.
 */
import React , {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text , Image, InteractionManager,ListView, TouchableHighlight} from  'react-native';
import API from './../net/api';
import HTMLView from 'react-native-htmlview';
import TopBarUtils from './views/TopBarUtils';
import NavigationBar from './views/NavigationBar';
import PostInfor from './PostInfor';
import  ViewsUitls from './ViewsUitls';

export default class CompanyInfor extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state = {datas:new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
              renderPlaceholderOnly:true, company:null, isRefreshing:false};
      }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.fetchData();
        });
    }

    fetchData() {
        let fromData = new FormData();
        fromData.append("company_id", this.props.company.id);
        fetch(
            API.COMPANYINFOR,
            {   method:"post",
                body: fromData
            },
        ).then((response)=> response.json())
        .then((json) =>{
            this.setState({datas:this.state.datas.cloneWithRows(json.postlist), renderPlaceholderOnly:false,
                company:json.company, isRefreshing:false});
        }).done();
    }


    renderRow(item){
        return(
            <TouchableHighlight style={styles.diverStyle} onPress={()=>this._onPressPost(item)}  underlayColor='transparent'>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'#FF5400', fontSize:14}}>{item.name}</Text>
                    <View style={styles.postFrameStyle}>
                        <Text style={styles.postFieldStyle}>{item.work_place} | {item.degree} | {item.pay} </Text>
                    </View>
                </View>

            </TouchableHighlight>

        );
    }



    renderHeaderRow() {
        let company = this.state.company;
        if (company === null) {
            return (<View></View>);
        }
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <Image source={{uri:company.banner.thumb}} style={styles.logoStyles} resizeMode="contain"></Image>
                <Text style={styles.companyTitleStyle}>{company.name}</Text>
                <View style={styles.companyFieldFrameStyle}>
                    <Text style={styles.companyFieldStyle}>{company.industry}</Text>
                    <Text style={styles.companyFieldStyle}>|</Text>
                    <Text style={styles.companyFieldStyle}>{company.opts}</Text>
                    <Text style={styles.companyFieldStyle}>|</Text>
                    <Text style={styles.companyFieldStyle}>{company.scale}</Text>
                </View>
                <View style={styles.spritLineStyle}></View>
                <Text style={styles.companyTitleSecondStyle}>公司简介</Text>
                <View style={styles.companyDescStyle}><HTMLView value={company.desc}/></View>
                <Text style={styles.companyTitleSecondStyle}>招聘职位</Text>
            </View>
        );
    }


    onBack() {
        this.props.navigator.pop();
    }

    _onRefresh(){
        this.setState({isRefreshing:true});
        this.fetchData();
    }

    render(){
        if (this.state.renderPlaceholderOnly) {
            return(
                <View style={[styles.container, {alignItems:'center',justifyContent:'center'}]}>
                    <Text>加载中...</Text>
                </View>
            );
        }

        return(
            <View style={styles.container}>
                <NavigationBar
                    navigator={this.props.navigator}
                    leftButton={TopBarUtils.getLeftButton(()=>this.onBack())}
                    popEnabled={false}
                    title="公司详情"
                />

                <ListView
                    dataSource={this.state.datas}
                    renderRow={(item) => this.renderRow(item)}
                    renderHeader={()=>this.renderHeaderRow(this.props.company)}
                    initialListSize={5}
                    style={{backgroundColor:'white'}}
                    refreshControl = {ViewsUitls.getRefreshControllerView(this.state.isRefreshing, ()=>{this._onRefresh()})}
                >

                </ListView>
            </View>
        );
    }

    _onPressPost(item) {
        this.props.navigator.push({
            component: PostInfor,
            name: "职位详情",
            params: {
                ...this.props,
                item:item,
            }
        });
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },

    diverStyle:{
        borderColor : "#dcdcdc",
        padding: 16,
        borderWidth:1,
        marginLeft:16,
        marginRight:16,
        marginTop:8,
        marginBottom:8,
        borderRadius:4
    },

    logoStyles:{
        flex: 1,
        height:200
    },

    companyTitleStyle:{
        fontSize:20, color:'#333333', textAlign:'center',fontWeight:'bold',margin:16
    },

    companyTitleSecondStyle:{
        fontSize:14, color:'#333333',fontWeight:'bold', margin:16,
    },

    companyFieldStyle:{
        color:'#37587d',
        fontSize:13,

    },

    companyFieldFrameStyle:{
         flexDirection:'row', marginTop:16, justifyContent:'space-between', paddingLeft:32, paddingRight:32
    },

    spritLineStyle:{
        borderTopWidth:1, borderBottomWidth:1, borderColor:"lightgrey", height:16, backgroundColor:'#ececec', marginTop:16, marginBottom:16
    },

    companyDescStyle:{
        marginLeft:16,
        marginRight:16,
    },


    postFrameStyle:{
        flexDirection:'row', justifyContent:'space-between', marginTop:8 ,alignItems:'center'
    },

    postFieldStyle:{
        color:"#505050",
        fontSize:13
    },

});