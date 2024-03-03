import {View, Text, StyleSheet, Image} from 'react-native';
import {Cast} from '../../../core/entities/cast.entity';

interface CastActorProps {
  cast: Cast;
}

export const CastActor = ({cast}: CastActorProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: cast.avatar}}
        style={{width: 100, height: 150, borderRadius: 10}}
      />
      <View style={styles.actorInfo}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{cast.name}</Text>
        <Text style={{fontSize: 12, fontWeight: 'bold', opacity: 0.7}}>
          {cast.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    width: 100,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
});
