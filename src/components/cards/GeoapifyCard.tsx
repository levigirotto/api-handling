import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import ApiCard from "@/components/cards/ApiCard.tsx"
import MapUpdater from "@/components/MapUpdater";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

const API_KEY = "9da296e52adb4d1ab868b513f0361d72";

export default function GeoapifyCard() {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [locationQuery, setLocationQuery] = useState("Praca%da%Se");

  async function fetch() {
      try {
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${locationQuery}&format=json&apiKey=${API_KEY}`
        );
        const data = res.data.results[0].bbox;
        setPosition([data.lat1, data.lon1]);
      } catch (error) {
        console.error("Failed to fetch location", error);
      }
    }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ApiCard 
      title="Location finder"
      description="Geoapify Geocoding API"
      apiLink="https://apidocs.geoapify.com/docs/geocoding/forward-geocoding/"
      content={
        <div className="flex flex-col gap-8">
            <div>
                <label>Type a location</label>
                <div className="flex gap-1">
                    <Input 
                        className="bg-zinc-950" 
                        placeholder="e.g., Sao Paulo, Brazil"
                        onChange={(e) => {
                            const formatted = e.target.value.replaceAll(" ", "%");
                            setLocationQuery(formatted);
                        }}
                    />
                    <Button onClick={fetch}>Submit</Button>
                </div>
            </div>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              className="rounded-xl overflow-hidden z-0"
              style={{ height: 300, width: "100%" }}
              >
              <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                  <Popup>Requested location</Popup>
              </Marker>
              <MapUpdater position={position} />
            </MapContainer>
        </div>
    }/>
  );
}
