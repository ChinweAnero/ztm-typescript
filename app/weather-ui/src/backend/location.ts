
import type { AxiosStatic } from "axios";
import { error } from "console";
import { z} from "zod";

const LocationInfoSchema = z.object({
    lat: z.string(),
    lon: z.string(),
    display_name: z.string()
})

export type LocationInfo = z.infer<typeof LocationInfoSchema>

export async function fetchLocationData(apiUrl: string, locationName: string, axios:AxiosStatic ): Promise<LocationInfo> {
    const options = {
        method: "GET",
        url: apiUrl,
        params: {
            q: locationName
        }
    }

    const response = await axios.request(options)
    if (response.status ===200){
        try{
            return LocationInfoSchema.parse(response.data[0])
        }
        catch (error){
            console.log(error)
            throw new Error(`Unable to find location information for ${locationName}`)
        }    
    }
    else{
        throw new Error("Failed to fetch location data")
    }

    
}