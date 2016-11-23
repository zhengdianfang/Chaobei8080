/**
 * DataRepository
 * 刷新从网络获取;非刷新从本地获取,
 * 若本地数据过期,先返回本地数据,然后返回从网络获取的数据
 * @flow
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';

export default class DataRepository {

    saveRepository(url, json, callback) {
        if (!json || !url)return;
        let wrapData={data:json,date:new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
    }

    fetchRepository(url, formData, need) {
        return new Promise((resolve, reject)=> {
            if (need){
                this.fetchLocalRepository(url).then((wrapData)=> {
                    if (wrapData) {
                        resolve(wrapData,true);
                    } else {
                        this.fetchNetRepository(url, formData, need).then((data)=> {
                            resolve(data);
                        }).catch((error)=> {
                            reject(error);
                        })
                    }

                }).catch((error)=> {
                    console.log('fetchLocalRepository fail:'+error);
                    this.fetchNetRepository(url,  formData, need).then((data)=> {
                        resolve(data);
                    }).catch((error=> {
                        reject(error);
                    }))
                })
            }else {
                this.fetchNetRepository(url, formData, need).then((data)=> {
                    resolve(data);
                }).catch((error)=> {
                    reject(error);
                })
            }

        })
    }

    fetchLocalRepository(url) {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(url, (error, result)=> {
                if (!error) {
                    try {
                        resolve(result.data);
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    fetchNetRepository(url, formData, need) {
        return new Promise((resolve, reject)=> {
            fetch(url, {method:"POST", body:formData})
                .then((response)=>response.json())
                .catch((error)=> {
                    reject(error);
                }).then((responseData)=> {
                if (!responseData) {
                    reject(new Error('responseData is null'));
                    return;
                }
                resolve(responseData);
                if (need){
                    this.saveRepository(url,responseData)
                }
            }).done();
        })
    }

    removeRepository(url) {
        AsyncStorage.removeItem(url, (error, result)=> {
            if(error)console.log(error);
        });
    }

    checkDate(longTime) {
        let currentDate = new Date();
        let targetDate = new Date();
        targetDate.setTime(longTime);
        if (currentDate.getMonth() !== targetDate.getMonth())return false;
        if (currentDate.getDate() !== targetDate.getDate())return false;
        if (currentDate.getHours() - targetDate.getHours() > 4)return false;
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}
