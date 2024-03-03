import {View, Text} from 'react-native';
import {FullMovie} from '../../../core/entities/movie.entity';
import {Formatter} from '../../../config/helpers/formatter';
import {Cast} from '../../../core/entities/cast.entity';
import {FlatList} from 'react-native-gesture-handler';
import {CastActor} from '../cast/CastActor';

interface MovieDetailsProps {
  movie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ({movie, cast}: MovieDetailsProps) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text>{movie.rating} ⭐⭐⭐</Text>
          <Text style={{marginLeft: 5}}> - {movie.genres.join(', ')} </Text>
        </View>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          Historia
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 3,
          }}>
          {movie.description}
        </Text>

        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Presupuesto
        </Text>

        <Text style={{fontSize: 18, marginTop: 2}}>
          {Formatter.currency(movie.budget)}
        </Text>
      </View>

      {/* Actores */}
      <View style={{marginTop: 10, marginBottom: 50}}>
        <Text
          style={{
            fontSize: 23,
            marginVertical: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Actores
        </Text>

        <FlatList
          style={{marginLeft: 10}}
          data={cast}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <CastActor cast={item} />}
        />
      </View>
    </>
  );
};
