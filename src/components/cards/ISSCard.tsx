import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import ApiCard from "@/components/cards/ApiCard.tsx"
import MapUpdater from "@/components/MapUpdater";

const issIcon = L.icon({
  iconUrl: "/iss.png",
  iconSize: [60, 60],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

export default function ISSCard() {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [altitude, setAltitude] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        const data = res.data;
        setPosition([data.latitude, data.longitude]);
        setAltitude(data.altitude);
        setVelocity(data.velocity);
      } catch (error) {
        console.error("Failed to fetch ISS location", error);
      }
    }

    fetch();
    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ApiCard 
      title="ISS Whereabouts"
      description="Where the ISS at?"
      apiLink="https://wheretheiss.at/w/developer"
      content={
        <div className="flex flex-col gap-3">
          <MapContainer
            center={position}
            zoom={2}
            scrollWheelZoom={true}
            className="rounded-xl overflow-hidden z-0"
            style={{ height: 300, width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={issIcon}>
              <Popup>International Space Station</Popup>
            </Marker>
            <MapUpdater position={position} />
          </MapContainer>
          <div className="container flex flex-col gap-2 bg-secondary p-4 rounded-xl text-muted-foreground">
            <p><strong>Coordinates:</strong><br />Lat: {position[0]},<br />Lon: {position[1]}</p>
            <p><strong>Altitude:</strong> {altitude.toFixed(2)}km</p>
            <p><strong>Velocity:</strong> {velocity.toFixed(2)}km/h</p>
          </div>
        </div>
      }
      />
  );
}