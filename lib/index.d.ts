import { Geolocation, PincodeDumpObject, ReverseGeocoded } from "./interfaces/geolocationObject";
declare class GeoLocationDump {
    private pincodeDetails;
    private districtDetails;
    constructor(pincodeDump?: PincodeDumpObject[]);
    geocode(searchParam: string): Geolocation[];
    reverseGeocode(latitude: number, longitude: number): ReverseGeocoded;
    nearByDistrictsFromDistrict(districtName: String, stateName: String, maxDistance?: number): any;
}
export declare const GeoLocationFactory: (pincodeDump: PincodeDumpObject[]) => GeoLocationDump;
export {};
