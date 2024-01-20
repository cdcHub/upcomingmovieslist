import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppPoppinsFonts } from '../../constants/AppFonts';
import { hp } from '../../dimension';
import SearchSvg from '../../../assets/svgs/SearchSvg';
import { AppColors } from '../../constants/AppColors';
import CrossSvg from '../../../assets/svgs/CrossSvg';
import { useAppDispatch } from '../../store/configure';
import { isSearchBoxOpen } from '../../storeSlices/movies';
import LeftArrowSvg from '../../../assets/svgs/LeftArrowSvg';

interface IHeader {
    props?: NativeStackHeaderProps,
    onSearchclick?: () => void;
    onChangeText?: (text: string) => void;
    title?: string
}
const Header: React.FC<IHeader> = (props) => {
    const dispatch = useAppDispatch()
    const { props: headerProps, onSearchclick, onChangeText, title } = props
    const insets = useSafeAreaInsets();
    const [text, setText] = useState<string>('')
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(true)

    const toggleSearch = () => {
        // onSearchclick && onSearchclick()
        dispatch(isSearchBoxOpen(!isSearchOpen))
        setIsSearchOpen(!isSearchOpen)
    }
    const onCrossClick = () => {
        if (!!text) {
            setText('')
            return
        }
        headerProps?.navigation?.goBack()
    }

    useEffect(() => {
        onChangeText && onChangeText(text)
    }, [text])

    const onSubmitEditing = () => {
        if (!text) {
            return
        }
        
        toggleSearch()

    }

    return (
        <>

            <View style={styles.container} >


                <View style={[styles.textInputContainer, {
                    backgroundColor: isSearchOpen ? AppColors.lightOffWhite : AppColors.white
                }]}>
                    {
                        !!title ?
                            <TouchableOpacity
                                onPress={() => {
                                    toggleSearch()

                                }} style={[styles.searchedBtn]}>
                                <LeftArrowSvg />
                                <Text style={styles.title}>{title}</Text>
                            </TouchableOpacity>

                            :
                            <>
                                <TouchableOpacity
                                    disabled={isSearchOpen}
                                    onPress={toggleSearch}
                                    style={styles.searchBtn}>
                                    <SearchSvg />
                                </TouchableOpacity>

                                <TextInput
                                    value={text}
                                    onChangeText={setText}
                                    style={styles.input}
                                    returnKeyType='go'
                                    onSubmitEditing={onSubmitEditing}
                                    placeholder='TV shows, movies and more'
                                />
                                <TouchableOpacity
                                    disabled={!isSearchOpen}
                                    onPress={onCrossClick} style={styles.searchBtn}>
                                    <CrossSvg />
                                </TouchableOpacity>
                            </>
                    }



                </View>
            </View>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: hp('2%'),
        paddingBottom: hp('1%')

    },
    title: {
        fontFamily: AppPoppinsFonts.Regular,
        fontWeight: '500',
        fontSize: hp('2%')
    },
    searchBtn: {
        padding: hp('1%'),
    },
    textInputContainer: {
        backgroundColor: AppColors.lightOffWhite,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: hp('3%')
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: hp('1.6%'),
        paddingVertical: hp('.5%')
    },
    searchedBtn: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center'
    }
})