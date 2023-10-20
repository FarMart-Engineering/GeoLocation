export interface Geolocation {
    state: string;
    district: string;
    taluk: string;
    pincode: number;
    lat: number;
    long: number;
    country: string;
    address: string;
}
export interface GeolocationWithDistrict {
    state: string;
    district: string;
    lat: number;
    long: number;
    country: string;
}
export interface ReverseGeocoded extends Geolocation {
    differenceInKm: number;
}
export interface PincodeDumpObject {
    state_name: string;
    district_name: string;
    taluk: string;
    pincode: number;
    country: string;
    pincode_lat: number;
    pincode_lon: number;
}
export interface ClosenessObject {
    index: number;
    latitudeDiff: number;
    longitudeDiff: number;
    score: number;
}
export interface NearByDistrict {
    distance: number;
    state: string;
    country: string;
    lat: number;
    lon: number;
    district: string;
}
export interface DistrictCoordinateDictionary {
    [key: string]: Location;
}
export interface Location {
    lat: number;
    lon: number;
}
export interface DistrictLocation {
    lat: number;
    lon: number;
    state: string;
    country: string;
    district: string;
}
