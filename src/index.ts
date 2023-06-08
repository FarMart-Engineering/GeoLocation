import pincode from "./database/local/pincodeDetail.json";
import {
  Geolocation,
  PincodeDumpObject,
  ReverseGeocoded,
  ClosenessObject,
} from "./interfaces/geolocationObject";
import preparePincode from "./database/local/preparePincode";
import differenceBetweenCoordinates from "./utilities/differenceBetweenCoordinates";

class GeoLocationDump {
  private pincodeDetails: Geolocation[];
  constructor(pincodeDump: PincodeDumpObject[] = []) {
    if (pincodeDump.length > 0)
      this.pincodeDetails = preparePincode(pincodeDump);
    this.pincodeDetails = pincode;
    this.geocode = this.geocode.bind(this);
    this.reverseGeocode = this.reverseGeocode.bind(this);
  }

  public geocode(searchParam: string): Geolocation[] {
    try {
      searchParam = " " + searchParam.toLowerCase();
      const search_results = this.pincodeDetails.filter((pincodeDetail) => {
        return (
          (" " + pincodeDetail.address.toLowerCase()).indexOf(searchParam) >= 0
        );
      });
      search_results.map((result) => {
        return { ...result, address: result.address.trim() };
      });
      return search_results;
    } catch (err) {
      throw err;
    }
  }

  public reverseGeocode(latitude: number, longitude: number): ReverseGeocoded {
    try {
      let closenessScores: ClosenessObject[] = this.pincodeDetails.map(
        (pincodeDetail: Geolocation, index: number) => {
          let closenessObject: ClosenessObject = {
            index,
            latitudeDiff: latitude - pincodeDetail.lat,
            longitudeDiff: longitude - pincodeDetail.long,
            score: Number.MAX_VALUE,
          };
          closenessObject.score =
            closenessObject.latitudeDiff * closenessObject.latitudeDiff +
            closenessObject.longitudeDiff * closenessObject.longitudeDiff;
          return closenessObject;
        }
      );

      closenessScores = closenessScores.sort(
        (scoreA, scoreB) => +scoreA.score - +scoreB.score
      );

      let closest = {
        ...this.pincodeDetails[closenessScores[0].index],
        differenceInKm: Number.MAX_VALUE,
      };
      const differenceInKm = differenceBetweenCoordinates(
        latitude,
        longitude,
        closest.lat,
        closest.long
      );
      closest.differenceInKm = +differenceInKm.toFixed(4);
      return closest;
    } catch (err) {
      throw err;
    }
  }
}

export const GeoLocationFactory = (pincodeDump: PincodeDumpObject[]) => {
  return new GeoLocationDump(pincodeDump);
};
