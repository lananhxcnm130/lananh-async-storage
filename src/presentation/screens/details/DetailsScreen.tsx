import {useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {RootStackParams} from '../../navigation/StackNavigation';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movie/MovieHeader';
import {MovieDetails} from '../../components/movie/MovieDetails';
import {LoaderFullScreen} from '../../components/loader/LoaderFullScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {top} = useSafeAreaInsets();
  // const {movieId} = useRoute().params;
  const {movieId} = route.params;

  // Hacer peticion a la api para obtener la informacion del movieId
  const {isLoading, movie, cast} = useMovie(movieId);

  if (isLoading) {
    return <LoaderFullScreen />;
  }
  return (
    <ScrollView>
      <View style={{marginTop: top, paddingBottom: 30}}>
        <MovieHeader
          title={movie!.title}
          originalTitle={movie!.originalTitle}
          poster={movie!.poster}
        />

        <MovieDetails movie={movie!} cast={cast!} />
      </View>
    </ScrollView>
  );
};
