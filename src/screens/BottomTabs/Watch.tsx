import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabsStackParamList, FullWatchStackParamList } from '../../routes/BottomTabs';
import { useAppDispatch, useAppSelector } from '../../store/configure';
import { fetchMovieDetailsById, fetchMoviesList, useMoviesState } from '../../storeSlices/movies';
import { Loader, SafeContainer } from '../../components';
import { Result } from '../../types/movies@Interfaces.ds';
import MovieItem from '../../components/Watch/MovieItem';
import Header from '../../components/Watch/Header';
import { hp } from '../../dimension';
import SearchSvg from '../../../assets/svgs/SearchSvg';
import { AppColors } from '../../constants/AppColors';
import { AppPoppinsFonts } from '../../constants/AppFonts';

type Props = NativeStackScreenProps<FullWatchStackParamList, 'Watch'>;


const Watch: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { movies_list_loader, movies_list, isMoviesSearchBoxOPened, LastPage } = useAppSelector(useMoviesState)
  const [searchText, setSearchText] = useState<string>('')

  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  
  useEffect(() => {
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
  const onItemClick = (id: number) => {
    dispatch(fetchMovieDetailsById({
      id
    }))
    navigation.navigate('WatchItemDetails')
  }
  const renderItem = ({ item }: { item: Result }) => <MovieItem movie={item} onItemClick={() => onItemClick(item.id)} />;
  const ListFooterComponent = () => {
    return loadingMore ? <View style={{
      height: hp('7%')
    }}>
      <ActivityIndicator />
    </View> : null
  }

  const WatchHeader =() =>{
    return (
        <View style={styles.WatchHeaderBg}>
            <Text style={styles.title}>Watch</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('WatchSearch')
                }} style={styles.searchBtn}>
                <SearchSvg />
            </TouchableOpacity>
        </View>)
}
  return (
    <SafeContainer>
      <WatchHeader />
      <FlatList
        data={movies_list}
        keyExtractor={(item: Result, index: number) => `${item?.id?.toString()}-${index}`}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={0.1}
      />
    </SafeContainer>
  );
};

export default Watch;

const styles = StyleSheet.create({
  title: {
    fontFamily: AppPoppinsFonts.Regular,
    fontWeight: '500',
    fontSize: hp('2%')
},
  WatchHeaderBg: {
    backgroundColor: AppColors.white,
    padding: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
},
searchBtn: {
    padding: hp('1%'),
},
})

