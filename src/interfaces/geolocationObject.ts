export interface Geolocation {
    "state": string,
    "district": string,
    "taluk": string,
    "pincode": number,
    "lat": number,
    "long": number,
    "country": string,
    "address": string,
}

export interface ReverseGeocoded extends Geolocation {
    differenceInKm: number
}

export interface PincodeDumpObject {
    "state_name": string,
    "district_name": string,
    "taluk": string,
    "pincode": number,
    "country": string,
    "pincode_lat": number,
    "pincode_lon": number
}


export interface ClosenessObject {
    index: number,
    latitudeDiff: number,
    longitudeDiff: number,
    score: number
}