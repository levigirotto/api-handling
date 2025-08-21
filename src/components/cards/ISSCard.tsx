import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import ApiCard from "@/components/cards/ApiCard.tsx"
import MapUpdater from "@/components/MapUpdater";
import { Button } from "../ui/button";

const issIcon = L.icon({
  iconUrl: "/iss.png",
  iconSize: [60, 60],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

export default function ISSCard() {
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  async function fetch() {
      try {
        const res = await axios.get(
          "http://api.open-notify.org/iss-now.json"
        );
        const data = res.data.iss_position;
        setPosition([data.latitude, data.longitude]);
      } catch (error) {
        console.error("Failed to fetch ISS location", error);
      }
    }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ApiCard 
      title="ISS Current Location"
      description="ISS Current Location"
      apiLink="http://open-notify.org/Open-Notify-API/ISS-Location-Now/"
      content={
        <MapContainer
          center={position}
          zoom={4}
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
        
      }
      footer={<Button onClick={fetch}>Fetch</Button>}
      />
  );
}