
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AppLoading} from 'expo';
import { Asset} from 'expo-asset';
import MusicApp from './screens/index';
function cacheImage (images){
  return images.map(image =>{
    if(typeof image == 'string'){
      return image.prefetch(image);
    }else{
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      isReady:false,
    }
  }

  async _loadAssetsAsync(){
    const imageAssets = cacheImage([require('./assets/bg.jpg') ])
      await Promise.all([...imageAssets])
   
  }
  render(){
    if(!this.state.isReady){
      return(
        <AppLoading
        startAsync={this._loadAssetsAsync}
        onFinish={()=>this.setState({isReady:true})}
        onError={console.warn}
        />
      )
    }
  return (
   <MusicApp/>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
