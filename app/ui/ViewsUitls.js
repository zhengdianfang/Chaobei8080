/**
 * Created by zheng on 2016/11/1.
 */
import React , {Component} from 'react';
import {View, Text,  RefreshControl} from  'react-native';

export  default class ViewsUitls{
    static getRefreshControllerView(isRefreshing, onRefreshCallback){
        return(
            <RefreshControl
                refreshing={isRefreshing}
                onRefresh={()=>onRefreshCallback}
                tintColor="#333333"
                title="加载中..."
                titleColor="#333333"
                colors={['#333333', '#333333', '#333333']}
                progressBackgroundColor="#FFa589"
            />
        );
    }

    static getLoadMoreFooterView(isLoadMoreDoing){
        return(
            <View style={{height:40, alignItems:'center',justifyContent:'center'}}>
                <Text>{isLoadMoreDoing ? '加载中...' : '加载更多'}</Text>
            </View>
        );
    }
}