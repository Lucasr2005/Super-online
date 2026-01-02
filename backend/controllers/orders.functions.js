import axios from "axios";

const getCoordinatesFromAddress = async (address) => {
    const searchAddress = `${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country}`;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchAddress)}&format=geojson`;
    const geoResponse = await axios.get(nominatimUrl, {
        headers: {
            // Es importante proveer un User-Agent válido con un email de contacto real según la poiltica de Nominatim.
            'User-Agent': 'Super-Online-App/1.0 (lukisromero@hotmail.com.ar)'
        }
    });
    if (!geoResponse.data.features || geoResponse.data.features.length === 0) {
        return null;
    }
    return geoResponse.data.features[0].geometry.coordinates;
}

const getDistanceInMeters = async (STORE_COORDINATES, destinationCoordinates) => {
    const openRoutesUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTES_APY_KEY}&start=${STORE_COORDINATES.join(',')}&end=${destinationCoordinates.join(',')}`;
    const routeResponse = await axios.get(openRoutesUrl);
    if (!routeResponse.data.features || routeResponse.data.features.length === 0) {
        return null;
    }
    return routeResponse.data.features[0].properties.summary.distance;
}

const STORE_COORDINATES = [-58.6082141, -34.5624953];
const FUEL_CONSUMPTION_PER_METER = 0.0001;
const FUEL_PRICE = 1;
const ROUND_TRIP_MULTIPLIER = 2;
const MINIMUM_FEE = 5;

export async function getShippingPrice(req, res) {
    const { address } = req.body;

    if (!address || !address.street || !address.houseNumber || !address.city || !address.state || !address.country) {
        return res.status(400).send("La dirección está incompleta.");
    }

    try {
        const destinationCoordinates = await getCoordinatesFromAddress(address);
        if (!destinationCoordinates) {
            return res.status(404).send("No se pudieron encontrar las coordenadas para la dirección proporcionada. Verifique que sea correcta.");
        }
        const distanceInMeters = await getDistanceInMeters(STORE_COORDINATES, destinationCoordinates);
        if (!distanceInMeters) {
            return res.status(400).send("No se pudo calcular una ruta a la dirección proporcionada.");
        }

        const shippingPrice = Math.max(MINIMUM_FEE, distanceInMeters * ROUND_TRIP_MULTIPLIER * FUEL_CONSUMPTION_PER_METER * FUEL_PRICE);

        res.status(200).json({ price: Math.round(shippingPrice) });

    } catch (error) {
        console.error(error);
        if (error.config?.url?.includes('nominatim')) {
            return res.status(500).send("Ha ocurrido un error interno al obtener las coordenadas de la direccion");
        }
        res.status(500).send("Ha ocurrido un error al obtener el precio de envio");
    }
}