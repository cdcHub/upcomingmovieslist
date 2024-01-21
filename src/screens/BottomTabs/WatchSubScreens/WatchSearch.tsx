import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Result } from '../../../types/movies@Interfaces.ds';
import { useAppDispatch, useAppSelector } from '../../../store/configure';
import { fetchMovieDetailsById, useMoviesState } from '../../../storeSlices/movies';
import MovieItem from '../../../components/Watch/MovieItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FullWatchStackParamList } from '../../../routes/BottomTabs';
import Header from '../../../components/Watch/Header';
import { AppPoppinsFonts } from '../../../constants/AppFonts';
import { hp } from '../../../dimension';
import { AppColors } from '../../../constants/AppColors';

type Props = NativeStackScreenProps<FullWatchStackParamList, 'WatchSearch'>;

const WatchSearch: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const { navigation } = props
    const { movies_list_loader, movies_list, isMoviesSearchBoxOPened } = useAppSelector(useMoviesState)

    const [searchText, setSearchText] = useState<string>('')

    const onSearchclick = () => {
        navigation.navigate('WatchSearch')
    }
    const onItemClick = (id: number) => {
        dispatch(fetchMovieDetailsById({
            id
        }))
        navigation.navigate('WatchItemDetails')
    }
    useEffect(() => {

        // navigation.setOptions({
        //     header(props) {
        //         return <Header
        //             props={props}
        //             onSearchclick={onSearchclick}
        //             onChangeText={setSearchText}
        //             title={!isMoviesSearchBoxOPened ? `${getSearchData()?.length} Results Found` : ''}

        //         />
        //     },
        // })

    }, [isMoviesSearchBoxOPened])
    const renderItem = ({ item }: { item: Result }) => <MovieItem movie={item}
        containerStyle={{
            flex: 1,
        }}
        type={!searchText ? 'default' : 'list'}
        onItemClick={() => onItemClick(item.id)}

    />

    const getSearchData = useCallback(() => {

        if (!searchText) {
            return movies_list
        }
        let smallLetters = searchText?.toLowerCase()
        return movies_list?.filter((movie) => movie?.title?.toLowerCase().includes(smallLetters))
    }, [searchText])

    // if (searchText) {
    //     return (
    //         <View style={{ flex: 1, }}>
    //             <View style={styles.searchTextContainer}>
    //                 <Text style={styles.searchText}>Top results</Text>
    //                 <View style={styles.line} />
    //             </View>
    //             <FlatList
    //                 data={getSearchData()}
    //                 keyExtractor={(item: Result, index: number) => `${item?.id?.toString()}-${index}`}
    //                 renderItem={renderItem}
    //                 ListEmptyComponent={() => {
    //                     return <View style={styles.center}>
    //                         <Text style={{ textAlign: 'center' }}>
    //                             No data found!
    //                         </Text>
    //                     </View>
    //                 }}
    //             />
    //         </View>
    //     )
    // }

    return (
        <View style={{flex:1}}>
            <Header
                props={props}
                onSearchclick={onSearchclick}
                onChangeText={setSearchText}
                title={!isMoviesSearchBoxOPened ? `${getSearchData()?.length} Results Found` : ''}

            />
            {
                searchText ?
                    <View style={{ flex: 1, }}>
                        <View style={styles.searchTextContainer}>
                            <Text style={styles.searchText}>Top results</Text>
                            <View style={styles.line} />
                        </View>
                        <FlatList
                            data={getSearchData()}
                            keyExtractor={(item: Result, index: number) => `${item?.id?.toString()}-${index}`}
                            renderItem={renderItem}
                            ListEmptyComponent={() => {
                                return <View style={styles.center}>
                                    <Text style={{ textAlign: 'center' }}>
                                        No data found!
                                    </Text>
                                </View>
                            }}
                        />
                    </View> :
                    <FlatList
                        numColumns={2}
                        data={movies_list}
                        keyExtractor={(item: Result, index: number) => `${item?.id?.toString()}-${index}`}
                        renderItem={renderItem}
                    />
            }
            {/* <FlatList
                numColumns={2}
                data={movies_list}
                keyExtractor={(item: Result, index: number) => `${item?.id?.toString()}-${index}`}
                renderItem={renderItem}
            /> */}
        </View>
    );
}

export default WatchSearch

const styles = StyleSheet.create({
    searchText: {
        fontFamily: AppPoppinsFonts.Regular,
        fontSize: hp('1.7%'),
        paddingVertical: hp('1%'),
        color: AppColors.searchTextColor

    },
    searchTextContainer: {
        padding: hp('2%')
    },
    line: {
        height: 2,
        width: '100%',
        backgroundColor: AppColors.darkOffWhite
    },
    center: {

        justifyContent: 'center',
        alignItems: 'center',
    }
})