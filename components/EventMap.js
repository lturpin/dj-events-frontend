import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactMapGl, {Marker} from 'react-map-gl'
import Geocode from 'react-geocode'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function EventMap({evt}) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading ] = useState(true)
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    zoom: 12
  })

  useEffect(() => {
    Geocode.fromAddress(evt.data[0].attributes.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat)
        setLng(lng)
        setViewport({...viewport, latitude: lat, longitude: lng})
        setLoading(false)
      },
      (error) => {
        console.error(error);
      }
    );
  }, [evt.data, viewport])
 
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

  if (loading) return false

  console.log(lat, lng);
  
  return (
    <div>
      <ReactMapGl
        initialViewState={{ ...viewport }}
        style={{width: '100%', height: 500}}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={(vp) => setViewport(vp)}
      >
        <Marker key={evt.data[0].id}
          latitude={lat}
          longitude={lng}
        >
          <Image src='/images/pin.svg' width={30} height={30} alt="pin for showing location"/>
        </Marker>
      </ReactMapGl>
    </div>
  )
}