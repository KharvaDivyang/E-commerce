import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    Intro: undefined;
    Cart: undefined;
    ProductDetails: undefined;
    Addresses: undefined;
    Contact: undefined;
    Checkout: undefined;
};
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>


export interface ProductsrProps{
    brand: string;
    category: string;
    description:string;
    image: string;
    isNew: boolean;
    previousPrice: number;
    price: number;
    quantity:number;
    title: string;
    _id:number;
}

export interface Item{
    item: ProductsrProps;
}