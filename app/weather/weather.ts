import { error } from "console";
import { fetchLocationData } from "./location";
import type {LocationInfo} from "./location"
import { CurrentWeather, fetchWeatherData } from "./weatherapi";


const GEOCODE_API_URL = "https://geocode.maps.co/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";


async function main(): Promise<number>{
    // pnpm run weather Location
    if (process.argv.length !== 3){
        console.error("usage: weather LOCATION");
        return 1;
    }
    //get location
    const location = process.argv[2];

    //convert location to lat/lon
    let locationInfo: LocationInfo;

    //fetch weather data
    try{
        locationInfo = await fetchLocationData(GEOCODE_API_URL, location);
    } catch (error){
        console.log(error)
        return 1;
    }
   
    console.log(`Fetching weather data for ${locationInfo.display_name}.\n`)
    try{
        const weather = await fetchWeatherData(
            WEATHER_API_URL,
            locationInfo.lat,
            locationInfo.lon
        )
        console.log(weather.format())
    }
    catch(error){
        console.error(error);
        return 1;
    }

    //display weather data
    return await Promise.resolve(0);

}
main().catch((error) => console.error(error))