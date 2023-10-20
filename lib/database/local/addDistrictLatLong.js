"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDistrictCoordinateDictionary_1 = __importDefault(require("./getDistrictCoordinateDictionary"));
exports.default = (pincodes) => {
    let districtDictionary = (0, getDistrictCoordinateDictionary_1.default)(pincodes);
    const transformed_pincodes = pincodes.map((pincode_detail) => {
        var _a, _b;
        let transformed_pincode = Object.assign(Object.assign({}, pincode_detail), { district_lat: ((_a = districtDictionary.get(pincode_detail.district)) === null || _a === void 0 ? void 0 : _a.lat) ||
                pincode_detail.lat, district_long: ((_b = districtDictionary.get(pincode_detail.district)) === null || _b === void 0 ? void 0 : _b.lon) ||
                pincode_detail.long });
        return transformed_pincode;
    });
    return transformed_pincodes;
};
