import {PossibleLocation, SearchResult} from "../types/types.ts";

export function parseGeoData(response: any): SearchResult {
    const featureMember = response.response.GeoObjectCollection.featureMember;
    const metaData = response.response.GeoObjectCollection.metaDataProperty?.GeocoderResponseMetaData;

    if (!featureMember || !Array.isArray(featureMember)) {
        return {
            count: 0,
            locations: []
        };
    }

    const count = metaData?.found ? parseInt(metaData.found) : 0;


    const locations = featureMember.map((item: any): PossibleLocation => {
        const geoObject = item.GeoObject;

        const title = geoObject.name || '';
        const details = geoObject.description || '';
        const coordinatesArray = geoObject.Point?.pos.split(' ').map((val: string) => parseFloat(val));

        return {
            coordinates: [coordinatesArray[1], coordinatesArray[0]],
            address: {
                title,
                details,
            },
        };
    });

    return {
        count,
        locations,
    };
}

