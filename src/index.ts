import pincode from "./database/local/pincodeDetail.json";
import {
  Geolocation,
  PincodeDumpObject,
  ReverseGeocoded,
  ClosenessObject,
  DistrictLocation,
  NearByDistrict,
} from "./interfaces/geolocationObject";
import preparePincode from "./database/local/preparePincode";
import differenceBetweenCoordinates from "./utilities/differenceBetweenCoordinates";
import getDistrictCoordinateDictionary from "./database/local/getDistrictLatLong";

// 300 KM
const MAX_DISTANCE_NEIGHBORING_DISTRICTS = 300;

class GeoLocationDump {
  private pincodeDetails: Geolocation[];
  private districtDetails: DistrictLocation[];
  constructor(pincodeDump: PincodeDumpObject[] = []) {
    if (pincodeDump.length > 0)
      this.pincodeDetails = preparePincode(pincodeDump);
    else this.pincodeDetails = pincode;
    this.districtDetails = getDistrictCoordinateDictionary(this.pincodeDetails);
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

  public nearByDistrictsFromDistrict(
    districtName: String,
    stateName: String,
    maxDistance: number = MAX_DISTANCE_NEIGHBORING_DISTRICTS
  ): any {
    try {
      let districtDetail = this.districtDetails.find((element) => {
        return element.district == districtName && element.state == stateName;
      });

      let districtLat = districtDetail?.lat || 0;
      let districtLong = districtDetail?.lon || 0;

      let nearByDistricts: NearByDistrict[] = this.districtDetails.map(
        (districtDetailElement: DistrictLocation) => {
          let closenessObject: NearByDistrict = {
            distance: Number.MAX_VALUE,
            district: districtDetailElement.district,
            state: districtDetailElement.state,
            country: districtDetailElement.country,
            lat: districtDetailElement.lat,
            lon: districtDetailElement.lon,
          };
          const differenceInKm = differenceBetweenCoordinates(
            districtLat,
            districtLong,
            districtDetailElement.lat,
            districtDetailElement.lon
          );
          closenessObject.distance = +differenceInKm.toFixed(4);
          return closenessObject;
        }
      );

      nearByDistricts = nearByDistricts
        .sort((scoreA, scoreB) => +scoreA.distance - +scoreB.distance)
        .filter((district) => district.distance < maxDistance)
        .filter((district) => district.district != districtName);

      return nearByDistricts;
    } catch (err) {
      throw err;
    }
  }
}

export const GeoLocationFactory = (pincodeDump: PincodeDumpObject[]) => {
  return new GeoLocationDump(pincodeDump);
};
