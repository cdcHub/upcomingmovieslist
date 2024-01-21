import React, { useState, useRef, useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES }  from 'react-native-media-controls';
import { useAppDispatch, useAppSelector } from '../store/configure';
import { openVideoPlayer, useMoviesState } from '../storeSlices/movies';
import { Button } from '.';
import { hp } from '../dimension';

const VideoPlayer = () => {
    const dispatch = useAppDispatch()
    const { videoUrl } = useAppSelector(useMoviesState)

    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('contain');
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                'android.permission.RECORD_AUDIO',
                {
                    title: 'Audio Permission',
                    message:
                        'This App needs access to your microphone ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    useEffect(() => {
        Platform.OS == 'android' && requestCameraPermission()
    }, [])
    const onCrossClick = () => {
        dispatch(openVideoPlayer({
            status: false
        }))
    }
    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        console.log('onLoad');
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => {
        console.log('End');

        onCrossClick()
        setPlayerState(PLAYER_STATES.ENDED)
    };

    const onError = () => Alert.alert('Oh! ', error);

    const exitFullScreen = () => {
        Alert.alert('Exit full screen');
    };

    const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'contain') setScreenType('cover');
        else setScreenType('contain');
    };

    const renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    const handlePlaybackRateChange = (data) => {
        // data.isPaused will be true when the video is paused
        console.log('Playback Rate Change:', data.isPaused ? 'Paused' : 'Playing');
    };
    return (
        <View style={{ flex: 1 }}>
            {
                !!videoUrl ?
                    <>

                        <Video
                            onEnd={onEnd}
                            onLoad={onLoad}
                            onLoadStart={onLoadStart}
                            onProgress={onProgress}
                            paused={paused}
                            ref={videoPlayer}
                            onPlaybackRateChange={handlePlaybackRateChange}

                            resizeMode={screenType}
                            ignoreSilentSwitch="ignore"
                            playWhenInactive={true}
                            playInBackground={true}
                            onFullScreen={isFullScreen}
                            source={{
                                uri: videoUrl

                            }}
                            controls={false}
                            style={styles.mediaPlayer}
                        />
                        <MediaControls
                            ignoreSilentSwitch="ignore"
                            playWhenInactive={true}
                            playInBackground={true}
                            duration={duration}
                            isLoading={isLoading}
                            mainColor="#333"
                            onFullScreen={onFullScreen}
                            onPaused={onPaused}
                            onReplay={onReplay}
                            onSeek={onSeek}
                            onSeeking={onSeeking}
                            playerState={playerState}
                            progress={currentTime}
                            toolbar={renderToolbar()}
                        />
                    </> :
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text>No Video Found</Text>
                        <Button
                            text='Close'
                            type='fill'
                            onPress={onCrossClick}
                            style={{
                                marginTop: hp('2%'),
                                height: hp('5%'),
                                width: hp('15%'),
                            }}
                            txtStyle={{
                                fontSize: hp('1.5%'),
                            }}
                        />
                    </View>
            }
        </View>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
});