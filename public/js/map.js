
   
    mapboxgl.accessToken =mapToken;
   

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12', // container ID
        center:coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 8 // starting zoom
    });

    const marker1= new mapboxgl.Marker()
    .setLngLat(coordinates)//lisitng.geometry.coordinate
    .addTo(map);