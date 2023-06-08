import { Geolocation, PincodeDumpObject, ReverseGeocoded } from "./interfaces/geolocationObject";
declare class GeoLocationDump {
    private pincodeDetails;
    constructor(pincodeDump?: PincodeDumpObject[]);
    geocode(searchParam: string): Geolocation[];
    reverseGeocode(latitude: number, longitude: number): ReverseGeocoded;
}
export declare const GeoLocationFactory: (pincodeDump: PincodeDumpObject[]) => GeoLocationDump;
export {};
