import React, { createContext, useContext, useState, type ReactNode } from 'react';
import axios from 'axios';

interface City {
    id: number;
    nome: string;
    geom: string;
}

interface Incidence {
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
    geom: string;
}

interface CityData {
    nome: string;
    position: [number, number];
    radiation: {
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
        polygon: [number, number][];
    };
}

interface RadiationContextType {
    cities: City[];
    selectedCity: CityData | null;
    loading: boolean;
    error: string | null;
    fetchCities: () => Promise<void>;
    fetchCityData: (id: number) => Promise<void>;
}

const RadiationContext = createContext<RadiationContextType | undefined>(undefined);

// Função para extrair coordenadas de um WKT POINT (invertendo lat/lon)
const parseWktPoint = (wkt: string): [number, number] => {
    const cleanWkt = wkt.replace(/POINT\(/i, '').replace(/\)/, '');
    const [lon, lat] = cleanWkt.split(' ').map(Number);

    // Leaflet usa [lat, lon] então invertemos aqui
    return [lat, lon];
};

// Função para extrair coordenadas de um WKT POLYGON (invertendo lat/lon)
const parseWktPolygon = (wkt: string): [number, number][] => {
    const coordString = wkt.replace(/POLYGON\(\(/i, '').replace(/\)\)/, '');
    return coordString.split(',').map(coord => {
        const [lon, lat] = coord.trim().split(' ').map(Number);
        // Invertemos para [lat, lon]
        return [lat, lon];
    });
};

export const RadiationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCities = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/cidade/');
            setCities(response.data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar lista de cidades');
            console.error('Erro ao buscar cidades:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCityData = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3001/cidade/${id}`);
            const { cidade, incidencias } = response.data;

            if (!cidade) {
                throw new Error('Cidade não encontrada');
            }

            const incidenceData = incidencias?.[0] || {
                anual: 0, jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0,
                jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0,
                geom: 'POLYGON((0 0, 0 0, 0 0, 0 0, 0 0))'
            };

            const cityData: CityData = {
                nome: cidade.nome,
                position: parseWktPoint(cidade.geom),
                radiation: {
                    anual: incidenceData.anual,
                    jan: incidenceData.jan,
                    fev: incidenceData.fev,
                    mar: incidenceData.mar,
                    abr: incidenceData.abr,
                    mai: incidenceData.mai,
                    jun: incidenceData.jun,
                    jul: incidenceData.jul,
                    ago: incidenceData.ago,
                    set: incidenceData.set,
                    out: incidenceData.out,
                    nov: incidenceData.nov,
                    dez: incidenceData.dez,
                    polygon: parseWktPolygon(incidenceData.geom)
                }
            };

            setSelectedCity(cityData);
        } catch (err) {
            const errorMsg = axios.isAxiosError(err)
                ? err.response?.data?.message || err.message
                : (err as Error).message;

            setError(`Erro ao carregar dados: ${errorMsg}`);
            console.error('Erro detalhado:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RadiationContext.Provider value={{
            cities,
            selectedCity,
            loading,
            error,
            fetchCities,
            fetchCityData
        }}>
            {children}
        </RadiationContext.Provider>
    );
};

export const useRadiation = () => {
    const context = useContext(RadiationContext);
    if (context === undefined) {
        throw new Error('useRadiation must be used within a RadiationProvider');
    }
    return context;
};