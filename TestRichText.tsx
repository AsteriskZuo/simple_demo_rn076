import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// 测试1：Text嵌套Image（会失败）
const Test1 = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      这是文本
      <Image 
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
        style={styles.image}
      />
      继续文本
    </Text>
  </View>
);

// 测试2：Text嵌套Text（正常工作）
const Test2 = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      普通文本
      <Text style={{ color: 'red', fontWeight: 'bold' }}>粗体红色</Text>
      继续文本
    </Text>
  </View>
);

// 测试3：View内并列Text和Image（推荐方案）
const Test3 = () => (
  <View style={styles.inline}>
    <Text style={styles.text}>这是文本 </Text>
    <Image 
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
      style={styles.image}
    />
    <Text style={styles.text}> 继续文本</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default Test1;

// 结论: 富文本可以通过嵌套 Text 和 Image 来实现。
