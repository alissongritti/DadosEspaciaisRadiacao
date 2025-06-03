import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export interface CityData {
    id: number;
    nome: string;
    geom: [number, number]; // formato adaptado
}

export interface RadiationData {
    id: number;
    lon: number;
    lat: number;
    anual: number;
    jan: number;
    fev: number;
    mar: number;
    abr: number;
    mai: number;
    jun: number;
    jul: number;
    ago: number;
    set: number;
    out: number;
    nov: number;
    dez: number;
    geom: [number, number][];
}

function parsePolygon(geom: string): [number, number][] {
    const matches = geom.match(/\(\((.*?)\)\)/);
    if (!matches || matches.length < 2) return [];

    return matches[1]
        .split(',')
        .map(coord => coord.trim().split(' ').map(Number))
        .map(([lon, lat]) => [lat, lon] as [number, number]);
}

export const fetchCities = async () => {
    const response = await axios.get(`${API_BASE_URL}/cidades`);
    return response.data;
};

export const fetchCityData = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/cidades/${id}`);

    const cidadeRaw = response.data.cidade;
    const incidenciasRaw = response.data.incidencias;

    const cidade: CityData = {
        ...cidadeRaw,
        geom: parsePolygon(cidadeRaw.geom)[0], // pega só o centro para o Marker
    };

    const incidencia = incidenciasRaw[0];
    const radiationData: RadiationData = {
        ...incidencia,
        geom: parsePolygon(incidencia.geom),
    };

    return {
        cidade,
        incidencias: [radiationData],
    };
};
