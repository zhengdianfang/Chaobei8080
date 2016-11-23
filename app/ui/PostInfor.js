/**
 * Created by zheng on 2016/10/28.
 */
import React , {Component} from 'react';
import {View, StyleSheet, TextInput, Text , Image, InteractionManager, ScrollView} from  'react-native';
import API from './../net/api';
import HTMLView from 'react-native-htmlview';
import TopBarUtils from './views/TopBarUtils';
import NavigationBar from './views/NavigationBar'
import ViewsUitls from './ViewsUitls';

export default class PostInfor extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state = {post:null, renderPlaceholderOnly:true, isRefreshing:false};
      }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.fetchData();
        });
    }

    fetchData() {
        let fromData = new FormData();
        fromData.append("post_id", this.props.item.id);
        fetch(
            API.POSTINFOR,
            {   method:"post",
                body: fromData
            },
        ).then((response)=> response.json())
        .then((json) =>{
            this.setState({post : json.post, renderPlaceholderOnly:false, isRefreshing:false});
        }).done();
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

        let post = this.state.post;

        return(
            <View style={styles.container}>
                <NavigationBar
                    navigator={this.props.navigator}
                    leftButton={TopBarUtils.getLeftButton(()=>this.onBack())}
                    popEnabled={false}
                    title="职位详情"
                />
                <ScrollView
                            refreshControl = {ViewsUitls.getRefreshControllerView(this.state.isRefreshing, ()=>{this._onRefresh()})}>
                    <View style={styles.container1}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={styles.postNameStyle}>{post.name}</Text>
                            <Image source={{uri:post.company.banner.thumb}} style={styles.postCompanyLogo} resizeMode="contain"></Image>
                        </View>
                        <View style={{marginTop:16}}>
                            <View style={{flexDirection:'row'}}><Image source={require("./../../images/xuli.png")} style={styles.feildLogo} resizeMode="contain"/><Text style={styles.feildValue}>{post.degree}</Text></View>
                            <View style={{flexDirection:'row', marginTop:8}}><Image source={require("./../../images/xingzhi.png")} style={styles.feildLogo} resizeMode="contain"/><Text style={styles.feildValue}>{post.opts}</Text></View>
                            <View style={{flexDirection:'row', marginTop:8}}><Image source={require("./../../images/xinzi.png")} style={styles.feildLogo} resizeMode="contain"/><Text style={styles.feildValue}>{post.pay}</Text></View>
                            <View style={{flexDirection:'row', marginTop:8}}><Image source={require("./../../images/m_place.png")} style={styles.feildLogo} resizeMode="contain"/><Text style={styles.feildValue}>{post.work_place}</Text></View>
                        </View>
                        <View style={{flexDirection:'row', marginTop:16}}>
                            <Text style={styles.contentTitle}>职位描述</Text>
                            <View style={styles.contentTitleLine}></View>
                        </View>
                        <View style={styles.contentFramecStyle}><HTMLView value={post.desc}/></View>

                        <View style={{flexDirection:'row', marginTop:16}}>
                            <Text style={styles.contentTitle}>职位要求</Text>
                            <View style={styles.contentTitleLine}></View>
                        </View>
                        <View style={styles.contentFramecStyle}><HTMLView value={post.requirment}/></View>

                        <View style={{flexDirection:'row', marginTop:16}}>
                            <Text style={styles.contentTitle}>申请方式</Text>
                            <View style={styles.contentTitleLine}></View>
                        </View>
                        <View style={styles.contentFramecStyle}><HTMLView value={" <div>请发送简历至：<span style='color: #fb3c08'>support@myamigo.cn</span></div> <div style='margin-top: 8px'>邮件标题格式：申请公司名称+职位名称+姓名+学校</div>"}/></View>
                    </View>
                </ScrollView>


            </View>
        );
    }

}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },

    container1:{
        padding:16
    },

    postNameStyle:{
        color:'#FF5400',
        fontSize:20,
        fontWeight:'bold',
    },

    postCompanyLogo:{
        width:40,
        height:30,
        borderWidth:1,
        borderColor:'#dcdcdc',
        marginLeft:16,
    },

    feildLogo:{
        width:14,
        height:14,
    },

    feildValue:{
        color:"#37587d",
        fontSize:13,
        marginLeft:8,
    },

    contentTitle:{
        color:'#333333',
        fontSize:16,
    },

    contentTitleLine:{
        borderBottomColor:"#dcdcdc",
        borderBottomWidth:1,
        flex:1,
        marginLeft:4
    },


    contentFramecStyle:{
        paddingTop:16,
    },
});