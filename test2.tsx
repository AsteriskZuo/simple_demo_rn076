import * as React from 'react';
import { Animated, Button, Easing, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';



// 优化版本：使用 Animated.View 包装，支持原生驱动
export function LoadingIcon3(props: any) {
  const { name = 'loading', resolution, style, isStop, ...others } = props;
  const ringRotate = React.useRef(new Animated.Value(0)).current;
  const ringRotateAnimation = React.useRef<Animated.CompositeAnimation>();
  const initRingAnimation = React.useCallback(() => {
    console.log('LoadingIcon2:initRingAnimation');
    ringRotateAnimation.current = Animated.loop(
      Animated.timing(ringRotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.linear,
      })
    );
  }, [ringRotate]);
  const startRingAnimation = React.useCallback(() => {
    console.log('LoadingIcon2:startRingAnimation');
    ringRotateAnimation.current?.start();
  }, [ringRotateAnimation]);
  const stopRingAnimation = React.useCallback(() => {
    console.log('LoadingIcon2:stopRingAnimation');
    // ringRotateAnimation.current?.stop();
    ringRotate.stopAnimation();
  }, [ringRotate]);
  const ringRotation = React.useMemo(
    () =>
      ringRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [ringRotate]
  );
  console.log('LoadingIcon2:ringRotation:');
  React.useEffect(() => {
    const listenerId = ringRotate.addListener((event) => {
      console.log('LoadingIcon2:ringRotate:', event.value);
    });
    initRingAnimation();
    if (isStop === true) {
      stopRingAnimation();
    } else {
      startRingAnimation();
    }
    return () => {
      stopRingAnimation();
      ringRotate.removeListener(listenerId); // 清理 listener
    };
  }, [isStop]);
  // return (
  //   <AnimatedImage
  //     source={getIconSource(name, resolution) ?? 0}
  //     style={[
  //       style,
  //       {
  //         transform: [
  //           {
  //             rotate: ringRotation,
  //           },
  //         ],
  //       },
  //     ]}
  //     {...others}
  //   />
  // );
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Animated.View
        style={[
          styles.ring,
          {
            transform: [
              {
                rotateZ: ringRotation,
              },
            ],
          },
        ]}
      />
    </View>
  );
}

export function LoadingIcon2(props: any) {
  const { name = 'loading', resolution, style, isStop, ...others } = props;
  const ringRotate = React.useRef(new Animated.Value(0)).current;
  const ringRotateAnimation = React.useRef<Animated.CompositeAnimation | null>(
    null,
  );
  const initRingAnimation = React.useCallback(() => {
    ringRotateAnimation.current = Animated.loop(
      Animated.timing(ringRotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    );
  }, [ringRotate]);
  const startRingAnimation = React.useCallback(() => {
    console.log('LoadingIcon2:startRingAnimation');
    ringRotateAnimation.current?.start();
  }, [ringRotateAnimation]);
  const stopRingAnimation = React.useCallback(() => {
    console.log('LoadingIcon2:stopRingAnimation');
    ringRotateAnimation.current?.stop();
    ringRotate.stopAnimation();
  }, [ringRotate]);
  const ringRotation = React.useMemo(
    () =>
      ringRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [ringRotate],
  );
  console.log('LoadingIcon2:ringRotation:');
  React.useLayoutEffect(() => {
    initRingAnimation();
    if (isStop === true) {
      stopRingAnimation();
    } else {
      startRingAnimation();
    }
    return () => {
      stopRingAnimation();
    };
  }, [initRingAnimation, startRingAnimation, stopRingAnimation, isStop]);
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Animated.View
        style={[styles.ring, style, { transform: [{ rotateZ: ringRotation }] }]}
      />
    </View>
  );
}

const App = () => {
  const [isStop, setIsStop] = React.useState(false);
  const onTouchEnd = () => {
    console.log('onTouchEnd:', isStop);
    setIsStop(!isStop);
    console.log('isStop:', isStop);
  };
  return (
    // <React.StrictMode>
      <SafeAreaView style={styles.container} onTouchEnd={onTouchEnd}>
        {isStop ? <LoadingIcon2 isStop={false} /> : null}
      </SafeAreaView>
    // </React.StrictMode>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  // 圆环样式（使用边框实现圆环）
  ring: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: '#007AFF', // 蓝色边框
    borderTopColor: 'transparent', // 顶部透明，形成圆环
    borderRadius: 20, // 圆形
  },
});

export default App;

// StrictMode and useNativeDriver is not working together.
