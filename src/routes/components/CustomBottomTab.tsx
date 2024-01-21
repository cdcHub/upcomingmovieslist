// CustomTabBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AppColors } from '../../constants/AppColors';
import { hp } from '../../dimension';
import { AppPoppinsFonts } from '../../constants/AppFonts';
import { Svgs } from '../../../assets/svgs';

const CustomBottomTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        if (label == 'MediaLibrary') {
          label = 'Media Library'
        } else if (label == 'FullWatchStack') {
          label = 'Watch'
        }
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let RenderSvg = null;
        switch (index) {
          case 0:
            RenderSvg = Svgs.Dashboard
            break;
          case 1:
            RenderSvg = Svgs.WatchSvg
            break;
          case 2:
            RenderSvg = Svgs.MediaLibrary
            break;
          case 3:
            RenderSvg = Svgs.List
            break;
          default:
            break;
        }
        return (
          <TouchableOpacity key={index} style={styles.tabItem} onPress={onPress}>
            {RenderSvg && <View>
              <RenderSvg
                fillColor={isFocused ? AppColors.active : AppColors.inActive}
                height={20}
                width={20}
              />
            </View>}
            <Text style={{
              marginTop: hp('1%'),
              textAlign: 'center',
              color: isFocused ? AppColors.active : AppColors.inActive,
              fontFamily: isFocused ? AppPoppinsFonts.SemiBold : AppPoppinsFonts.Regular,
              fontSize: hp('1.2%')
            }}>{`${label}`}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    height: hp('10%'),
    borderTopLeftRadius: hp('3.5%'),
    borderTopRightRadius: hp('3.5%'),
    overflow: 'hidden',


  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
});

export default CustomBottomTab;
