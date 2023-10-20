"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocationFactory = void 0;
const pincodeDetail_json_1 = __importDefault(require("./database/local/pincodeDetail.json"));
const preparePincode_1 = __importDefault(require("./database/local/preparePincode"));
const differenceBetweenCoordinates_1 = __importDefault(require("./utilities/differenceBetweenCoordinates"));
const getDistrictLatLong_1 = __importDefault(require("./database/local/getDistrictLatLong"));
// 300 KM
const MAX_DISTANCE_NEIGHBORING_DISTRICTS = 300;
class GeoLocationDump {
    constructor(pincodeDump = []) {
        if (pincodeDump.length > 0)
            this.pincodeDetails = (0, preparePincode_1.default)(pincodeDump);
        else
            this.pincodeDetails = pincodeDetail_json_1.default;
        this.districtDetails = (0, getDistrictLatLong_1.default)(this.pincodeDetails);
        this.geocode = this.geocode.bind(this);
        this.reverseGeocode = this.reverseGeocode.bind(this);
    }
    geocode(searchParam) {
        try {
            searchParam = " " + searchParam.toLowerCase();
            const search_results = this.pincodeDetails.filter((pincodeDetail) => {
                return ((" " + pincodeDetail.address.toLowerCase()).indexOf(searchParam) >= 0);
            });
            search_results.map((result) => {
                return Object.assign(Object.assign({}, result), { address: result.address.trim() });
            });
            return search_results;
        }
        catch (err) {
            throw err;
        }
    }
    reverseGeocode(latitude, longitude) {
        try {
            let closenessScores = this.pincodeDetails.map((pincodeDetail, index) => {
                let closenessObject = {
                    index,
                    latitudeDiff: latitude - pincodeDetail.lat,
                    longitudeDiff: longitude - pincodeDetail.long,
                    score: Number.MAX_VALUE,
                };
                closenessObject.score =
                    closenessObject.latitudeDiff * closenessObject.latitudeDiff +
                        closenessObject.longitudeDiff * closenessObject.longitudeDiff;
                return closenessObject;
            });
            closenessScores = closenessScores.sort((scoreA, scoreB) => +scoreA.score - +scoreB.score);
            let closest = Object.assign(Object.assign({}, this.pincodeDetails[closenessScores[0].index]), { differenceInKm: Number.MAX_VALUE });
            const differenceInKm = (0, differenceBetweenCoordinates_1.default)(latitude, longitude, closest.lat, closest.long);
            closest.differenceInKm = +differenceInKm.toFixed(4);
            return closest;
        }
        catch (err) {
            throw err;
        }
    }
    nearByDistrictsFromDistrict(districtName, stateName, maxDistance = MAX_DISTANCE_NEIGHBORING_DISTRICTS) {
        try {
            let districtDetail = this.districtDetails.find((element) => {
                return element.district == districtName && element.state == stateName;
            });
            let districtLat = (districtDetail === null || districtDetail === void 0 ? void 0 : districtDetail.lat) || 0;
            let districtLong = (districtDetail === null || districtDetail === void 0 ? void 0 : districtDetail.lon) || 0;
            let nearByDistricts = this.districtDetails.map((districtDetailElement) => {
                let closenessObject = {
                    distance: Number.MAX_VALUE,
                    district: districtDetailElement.district,
                    state: districtDetailElement.state,
                    country: districtDetailElement.country,
                    lat: districtDetailElement.lat,
                    lon: districtDetailElement.lon,
                };
                const differenceInKm = (0, differenceBetweenCoordinates_1.default)(districtLat, districtLong, districtDetailElement.lat, districtDetailElement.lon);
                closenessObject.distance = +differenceInKm.toFixed(4);
                return closenessObject;
            });
            nearByDistricts = nearByDistricts
                .sort((scoreA, scoreB) => +scoreA.distance - +scoreB.distance)
                .filter((district) => district.distance < maxDistance)
                .filter((district) => district.district != districtName);
            return nearByDistricts;
        }
        catch (err) {
            throw err;
        }
    }
}
const GeoLocationFactory = (pincodeDump) => {
    return new GeoLocationDump(pincodeDump);
};
exports.GeoLocationFactory = GeoLocationFactory;
