import {View, Text, ActivityIndicator} from 'react-native';

export const LoaderFullScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};
