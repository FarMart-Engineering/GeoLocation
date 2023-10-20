"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (pincodes) => {
    let districts = new Map();
    pincodes.forEach((pincodeDetail) => {
        let districtDetails = districts.get(pincodeDetail.district) || {
            state: pincodeDetail.state,
            country: pincodeDetail.country,
            coordinates: [],
        };
        districtDetails.coordinates.push({
            lat: pincodeDetail.lat,
            lon: pincodeDetail.long,
        });
        districts.set(pincodeDetail.district, districtDetails);
    });
    let districtLatLong = [];
    for (let [districtName, districtDetails] of districts) {
        let lat_sum = 0;
        let lon_sum = 0;
        for (let i = 0; i < districtDetails.coordinates.length; i++) {
            lat_sum += districtDetails.coordinates[i].lat;
            lon_sum += districtDetails.coordinates[i].lon;
        }
        let lat_avg = lat_sum / districtDetails.coordinates.length;
        let lon_avg = lon_sum / districtDetails.coordinates.length;
        districtLatLong.push({
            lat: lat_avg,
            lon: lon_avg,
            state: districtDetails.state,
            country: districtDetails.country,
            district: districtName,
        });
    }
    return districtLatLong;
};
