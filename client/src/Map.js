import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { listLogEntries } from './Api';

const Map = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewPort] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 38.02130234000692,
    longitude: -96.52454556339762,
    zoom: 3,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={'mapbox://styles/sandurijal03/ckns0j8bj007i17rxfo53pduc'}
      onViewportChange={setViewPort}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {logEntries.map((entry) => (
        <Marker
          key={entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-20}
          offsetTop={-20}
        >
          gello
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
