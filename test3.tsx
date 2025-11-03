/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Button, Text, View, AppState} from 'react-native';
import {
  NavigationContainer,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LoadingIcon2} from './LoadingIcon';

const Stack = createNativeStackNavigator();

export function MainScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isStop, setIsStop] = React.useState(false);
  React.useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      console.log('App state:', nextAppState);

      if (nextAppState === 'background') {
        // 类似 onStop：应用完全进入后台
        setIsStop(true);
      } else if (nextAppState === 'inactive') {
        // 类似 onPause：应用失去焦点（如来电、弹窗）
        setIsStop(false);
      } else if (nextAppState === 'active') {
        // 类似 onResume：应用回到前台
        setIsStop(false);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('MainScreen:focused - 启动动画');
      setIsStop(false);
      return () => {
        console.log('MainScreen:blurred - 停止动画');
        setIsStop(true);
      };
    }, []),
  );
  console.log('MainScreen:render', isStop);
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <Text>Main Screen</Text>
      <Button
        title="Go to Detail"
        onPress={() => navigation.push('Detail', {id: 1})}
      />
      <LoadingIcon2 isStop={isStop} />
    </View>
  );
}

export function DetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<any, 'Detail'>>();
  const id = (route.params as {id: number} | undefined)?.id;
  console.log('id:', id);
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Text>Detail Screen</Text>
      <Button title="Go to Main" onPress={() => navigation.goBack()} />
      <Text>ID: {id}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
