/**
 * Created by zheng on 2016/10/28.
 */
/**
 * Created by zheng on 2016/10/21.
 */
import React , {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text , Image} from  'react-native';
import TabNavigator from 'react-native-tab-navigator';
import CompanyListPage from './CompanyList';
import PostListPage from './PostList';
import NavigationBar from './views/NavigationBar';
import TopBarUtils from './views/TopBarUtils';
import LoginPage from './Login';
import UserCenter from './UserCenter';

export default class HomePage extends Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {selectedTab:0};
        global.user = null;
    }

    //tab view 布局
    renderTabItem(Component, selectedTab, title, renderIcon, renderSelectedIcon){
        return (
            <TabNavigator.Item
                    selected={this.state.selectedTab === selectedTab}
                    title={title}
                    renderIcon={()=> <Image source={renderIcon} style={styles.tabBarIcon}></Image>}
                    renderSelectedIcon={() => <Image style={styles.tabBarSelectedIcon} source={renderSelectedIcon}></Image>}
                    onPress={() => this.onSelectedTab(selectedTab)}
                    titleStyle={styles.tabBarTitleStyle}
                    selectedTitleStyle={styles.selectedTitleStyle}
                >
                    <Component homeComponent={this}/>

            </TabNavigator.Item>
        );
    }

    //tab点击事件
    onSelectedTab(selectedTab) {
        if (selectedTab !== this.state.selectedTab) {
            this.setState({selectedTab: selectedTab});
        }
    }

    _openNextPage(){
        this.props.navigator.push({
            component: global.user  ? UserCenter : LoginPage,
            name: "公司详情",
            params: {
                ...this.props
            }
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    navigator={this.props.navigator}
                    rightButton={TopBarUtils.getRightButton(this._openNextPage.bind(this))}
                    popEnabled={false}
                    title="阿米哥"
                />

                <TabNavigator>
                    {this.renderTabItem(CompanyListPage, 0, "公司", require("./../../images/company_d.png"), require("./../../images/company.png"))}
                    {this.renderTabItem(PostListPage, 1, "职位",  require("./../../images/post_d.png"), require("./../../images/post.png"))}
                </TabNavigator>

            </View>
        );
    };

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },

    topBarStyle:{
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc',
        height:56,
        alignItems:'center',
        justifyContent:'center'
    },

    tabBarIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
    },

    tabBarSelectedIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
    },
    tabBarTitleStyle : {
        fontSize:13,
        color:'#333333'
    },

    selectedTitleStyle:{
        color:'#FFa589'
    }


});