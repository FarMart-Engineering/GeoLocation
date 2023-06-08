# GeoLocation Package

A TypeScript package for geocoding and reverse geocoding functionalities, allowing you to retrieve location details based on addresses or coordinates. This package works completely offline and doesn't make calls to any third-party services.

## Installation

To install the GeoLocation package, use npm:

```bash
npm install @opencollabnexus/geolocation
```

## Usage

Import the package and create an instance of the GeoLocationDump class, passing the pincode dump as a parameter. If no parameter is provided, the package will use a default pincode dump containing all Indian pincodes.

```typescript
import { GeoLocationFactory } from 'geolocation-package';

// Create an instance of the GeoLocationDump class
const geoLocation = GeoLocationFactory(pincodeDump);
```

## Geocoding

To geocode an incomplete address, use the geocode method. It takes an address parameter and returns a list of possible matches containing location details.

```typescript
const searchParam = 'Your incomplete address';

const searchResults = geoLocation.geocode(searchParam);
console.log(searchResults);
```

## Reverse Geocoding

To perform reverse geocoding, use the reverseGeocode method. Pass the latitude and longitude of a location as parameters, and it will return an object containing detailed information about the closest match, including the distance between the found result and the provided coordinates.

```typescript
const latitude = 9.123456;
const longitude = 92.654321;

const reverseGeocodedResult = geoLocation.reverseGeocode(latitude, longitude);
console.log(reverseGeocodedResult);
```

## Pincode Dump

The GeoLocation package requires a pincode dump to function correctly. The pincode dump is an array of objects containing location details, in the following format:

```json
[
  {
    "state_name": "Andaman and Nicobar Islands",
    "district_name": "Nicobar",
    "taluk": "Carnicobar",
    "pincode": 744301,
    "country": "India",
    "pincode_lat": 9.1573175,
    "pincode_lon": 92.7580701
  },
  ...
]
```

## Best Practice for Large Pincode Dumps

If you have a large pincode dump, it is recommended to divide the dump based on criteria such as country or state. By segmenting the pincode dump, you can initialize multiple instances of the GeoLocationDump class and refer to the appropriate instance for finding pincode details of a specific country or state.

```typescript
import { GeoLocationFactory } from 'geolocation-package';

// Initialize multiple instances with segmented pincode dumps
const geoLocationIndia = GeoLocationFactory(pincodeDumpIndia);
const geoLocationUSA = GeoLocationFactory(pincodeDumpUSA);
// Initialize more instances for other countries or states if needed

// Use the appropriate instance for geocoding or reverse geocoding
const searchResultsIndia = geoLocationIndia.geocode('Address in India');
const searchResultsUSA = geoLocationUSA.geocode('Address in USA');
// Perform reverse geocoding using the appropriate instance
const reverseGeocodedResultIndia = geoLocationIndia.reverseGeocode(latitude, longitude);
const reverseGeocodedResultUSA = geoLocationUSA.reverseGeocode(latitude, longitude);
```

In the future, the package aims to include built-in segmentation functionality to handle large pincode dumps more efficiently.

## License

This project is licensed under the [MIT License](https://github.com/nihalpandey4/GeoLocation/blob/main/LICENSE).