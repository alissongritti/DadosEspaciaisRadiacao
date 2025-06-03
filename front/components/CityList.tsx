import React from 'react';
import styled from 'styled-components';
import { useRadiation } from '../context/RadiationContext';

const ListContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
`;

const CityItem = styled.div<{ selected: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${({ selected }) => selected ? '#e3f2fd' : 'white'};
  font-weight: ${({ selected }) => selected ? '500' : 'normal'};
  
  &:hover {
    background-color: ${({ selected }) => selected ? '#bbdefb' : '#f5f5f5'};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const LoadingText = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
`;

const ErrorText = styled.div`
  padding: 20px;
  text-align: center;
  color: #d32f2f;
  font-weight: 500;
`;

const CityList: React.FC = () => {
  const { cities, selectedCity, loading, error, fetchCities, fetchCityData } = useRadiation();

  React.useEffect(() => {
    fetchCities();
  }, []);

  if (loading && cities.length === 0) {
    return <LoadingText>Carregando lista de cidades...</LoadingText>;
  }

  if (error) {
    return <ErrorText>Erro: {error}</ErrorText>;
  }

  return (
    <ListContainer>
      {cities.map(city => (
        <CityItem
          key={city.id}
          onClick={() => fetchCityData(city.id)}
          selected={selectedCity?.nome === city.nome}
        >
          {city.nome}
        </CityItem>
      ))}
    </ListContainer>
  );
};

export default CityList;