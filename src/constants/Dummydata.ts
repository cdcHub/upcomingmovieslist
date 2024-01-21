import { AppImages } from "../../assets/images";
import { AppColors, GenresColors } from "./AppColors";

export type CinemaHallSettingType = {
    date: string;
    fromPrice: number;
    toPrice: number;
    title: string;
    image: number;
};
const cinemaHallSettings: CinemaHallSettingType[] = [
    {
        date: '11:30',
        fromPrice: 50,
        toPrice: 2500,
        title: 'Cinetech + Hall 1',
        image: AppImages.chairs,
    },
    {
        date: '12:30',
        fromPrice: 60,
        toPrice: 3000,
        title: 'Cinetech + Hall 2',
        image: AppImages.chairs,
    },
    {
        date: '14:30',
        fromPrice: 70,
        toPrice: 3500,
        title: 'Cinetech + Hall 4',
        image: AppImages.chairs,
    },
    {
        date: '15:30',
        fromPrice: 65,
        toPrice: 3200,
        title: 'Cinetech + Hall 5',
        image: AppImages.chairs,
    },
    {
        date: '16:30',
        fromPrice: 80,
        toPrice: 4000,
        title: 'Cinetech + Hall 6',
        image: AppImages.chairs,
    },
    {
        date: '17:30',
        fromPrice: 75,
        toPrice: 3700,
        title: 'Cinetech + Hall 7',
        image: AppImages.chairs,
    },
    {
        date: '18:30',
        fromPrice: 90,
        toPrice: 4500,
        title: 'Cinetech + Hall 8',
        image: AppImages.chairs,
    },
    {
        date: '19:30',
        fromPrice: 85,
        toPrice: 4200,
        title: 'Cinetech + Hall 9',
        image: AppImages.chairs,
    },
    {
        date: '20:30',
        fromPrice: 100,
        toPrice: 5000,
        title: 'Cinetech + Hall 10',
        image: AppImages.chairs,
    },
];

export default cinemaHallSettings;

export type SeatChairsType = {
    bgColor: string;
    text: string;
}
export const SeatChairs: SeatChairsType[] = [
    {
        bgColor: GenresColors.yellow,
        text: 'Selected'
    },
    {
        bgColor: AppColors.inActive,
        text: 'Not available'
    },
    {
        bgColor: GenresColors.purple,
        text: 'VIP (150$)'
    },
    {
        bgColor: AppColors.secondry,
        text: 'Regular (50 $)'
    },
]


