import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import {store} from './src/redux/store';
import Toast, { BaseToast } from 'react-native-toast-message';
import { colors } from './src/constants';

const RootContent = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

const toastConfig = {
  success: (props: any)=>(
    <BaseToast 
    {...props}
    style={{borderLeftColor:colors.desginColor}}
    contentContainerStyle={{paddingHorizontal:15}}
    text1Style={{
      fontSize: 15,
      fontWeight:'500'
    }}
    />
  )
}


const App = () => {
  return (
    <Provider store={store}>
      <RootContent />
      <Toast config={toastConfig} position="bottom" visibilityTime={2000}  />
    </Provider>
  );
};

export default App;

