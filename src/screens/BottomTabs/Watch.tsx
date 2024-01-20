import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { BottomTabsStackParamList, FullWatchStackParamList } from '../../routes/BottomTabs';
import { useAppDispatch, useAppSelector } from '../../store/configure';
import { fetchMoviesList, useMoviesState } from '../../storeSlices/movies';
import { Loader } from '../../components';
import { Result } from '../../types/movies@Interfaces.ds';
import MovieItem from '../../components/Watch/MovieItem';
import Header from '../../components/Watch/Header';
import { hp } from '../../dimension';

type Props = NativeStackScreenProps<FullWatchStackParamList, 'Watch'>;


const Watch: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { movies_list_loader, movies_list, isMoviesSearchBoxOPened, LastPage } = useAppSelector(useMoviesState)
  const [searchText, setSearchText] = useState<string>('')

  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  const onSearchclick = () => {
    navigation.navigate('WatchSearch')
  }
  useEffect(() => {
    console.log('last page : ',LastPage);
    
    setLastPage(LastPage)
  }, [LastPage])
  useEffect(() => {
    // navigation.setOptions({
    //   header(props) {
    //     return <Header
    //       props={props}
    //       onSearchclick={onSearchclick}
    //       onChangeText={setSearchText}
    //       screen={'watch'}

    //     />
    //   },
    // })

  }, [])

  const fetchMoviesListData = async (page: number) => {
     dispatch(fetchMoviesList({
      page,
      onSuccess() {
        setLoadingMore(false)
      },
      onFail() {
        setLoadingMore(false)
      },
    }))


  }
  useEffect(() => {
    fetchMoviesListData(1)
  }, [])

  if (movies_list_loader && !loadingMore) {
    return <Loader />
  }

  const onEndReached = () => {

    if (page <= lastPage && !loadingMore) {
      let nextPage = page + 1
      setPage(nextPage)
      setLoadingMore(true)
      fetchMoviesListData(nextPage)
    }
  }
  const renderItem = ({ item }: { item: Result }) => <MovieItem movie={item} />;
  const ListFooterComponent = () => {
    return loadingMore ? <View style={{
      height: hp('7%')
    }}>
      <ActivityIndicator />
    </View> : null
  }


  return (
    <View>
      <FlatList
        data={movies_list}
        keyExtractor={(item: Result, index: number) => `${item?.id?.toString()}-${index}`}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Watch;
