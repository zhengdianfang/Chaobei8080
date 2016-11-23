/**
 * Created by zheng on 2016/10/28.
 */

import React , {Component} from 'react';
import {View, StyleSheet,  Text , Image, ListView} from  'react-native';
import API from  './../net/api';
import PostCell from './views/PostCell';
import ViewsUitls from './ViewsUitls';
import DataRepository from './../net/DataRepository';


export default class CompanyListPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.items = [];
        this.page = 1;
        this.dataRepository = new DataRepository();
        this.state = {datas:new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}), renderPlaceholderOnly:true,
            isRefreshing:false, isLoadMoreDoing: false};
    }

    componentDidMount() {
        this.fetchDatas(1, true);
    }

    fetchDatas(page, need) {
        let formData = new FormData();
        formData.append("page", page);
        this.dataRepository.fetchRepository(API.POSTLIST, formData, need)
            .then((json) =>{
                if (!this.state.isLoadMoreDoing) {
                    this.items = json.postlist;
                }else {
                    json.postlist.map((item)=>this.items.push(item));
                }
                this.setState({datas:this.state.datas.cloneWithRows(this.items),
                    renderPlaceholderOnly:false, isRefreshing:false, isLoadMoreDoing:false});
            })
            .done();
    }

    renderRow(item){
        return (
            <PostCell item={item} navigator={this.props.homeComponent.props.navigator}></PostCell>
        );
    }

    _onRefresh(){
        this.page = 1;
        this.setState({isRefreshing:true});
        this.fetchDatas(1, true);
    }

    _toEnd(){
        this.setState({isLoadMoreDoing:true});
        this.fetchDatas(++this.page, false);
    }

    render(){
        if (this.state.renderPlaceholderOnly){
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
                    renderFooter={()=>ViewsUitls.getLoadMoreFooterView(this.state.isLoadMoreDoing)}
                    initialListSize={20}
                    onEndReached={ this._toEnd.bind(this) }
                    onEndReachedThreshold={10}
                    refreshControl = {ViewsUitls.getRefreshControllerView(this.state.isRefreshing, ()=>{this._onRefresh()})}
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