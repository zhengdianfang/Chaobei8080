/**
 * Created by zheng on 2016/10/28.
 */

import React , {Component} from 'react';
import {View, StyleSheet,  Text , Image, ListView, TouchableHighlight, InteractionManager, RefreshControl} from  'react-native';
import API from  './../net/api';
import CompanyCell from './views/CompanyCell';
import ViewsUitls from './ViewsUitls';
import DataRepository from './../net/DataRepository';

export default class CompanyListPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.dataRepository = new DataRepository();
        this.state = {datas:new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}), renderPlaceholderOnly:true, isRefreshing:false};
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.fetchDatas();
        });
    }

    fetchDatas() {
        this.dataRepository.fetchRepository(API.COMPANYLIST, null, true)
            .then((json) =>{
                this.setState({datas:this.state.datas.cloneWithRows(json.companylist), renderPlaceholderOnly:false, isRefreshing:false});
            })
            .done();
    }

    _onRefresh(){
        this.setState({isRefreshing: true});
        this.fetchDatas();
    }

    renderRow(item){
        return (
            <CompanyCell company={item} navigator={this.props.homeComponent.props.navigator}></CompanyCell>
        );
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
               <ListView
                   dataSource={this.state.datas}
                   renderRow={(item) => this.renderRow(item)}
                   initialListSize={5}
                   refreshControl={ViewsUitls.getRefreshControllerView(this.state.isRefreshing, this._onRefresh.bind(this))}
               >

               </ListView>
            </View>

        );
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,

    }
});