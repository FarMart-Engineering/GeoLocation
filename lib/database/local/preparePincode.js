"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (pincodes) => {
    const transformed_pincodes = pincodes.map((pincode_detail) => {
        let transformed_pincode = {
            state: pincode_detail.state_name,
            district: pincode_detail.district_name,
            taluk: pincode_detail.taluk,
            pincode: pincode_detail.pincode,
            lat: pincode_detail.pincode_lat,
            long: pincode_detail.pincode_lon,
            country: pincode_detail.country,
            address: ""
        };
        transformed_pincode["address"] = "" + transformed_pincode.pincode;
        if (transformed_pincode.taluk)
            transformed_pincode["address"] += " , " + transformed_pincode.taluk;
        if (transformed_pincode.district)
            transformed_pincode["address"] += " , " + transformed_pincode.district;
        if (transformed_pincode.state)
            transformed_pincode["address"] += " , " + transformed_pincode.state;
        if (transformed_pincode.country)
            transformed_pincode["address"] += " , " + transformed_pincode.country;
        return transformed_pincode;
    });
    return transformed_pincodes;
};
