import React from 'react';
import styled from 'styled-components';
import { useRadiation } from '../context/RadiationContext';

const DetailsContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  height: fit-content;
`;

const Title = styled.h2`
  margin-top: 0;
  color: #333;
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 15px;
`;

const DataItem = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const DataLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const DataValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const CityDetails: React.FC = () => {
    const { selectedCity } = useRadiation();

    if (!selectedCity) {
        return (
            <DetailsContainer>
                <Title>Selecione uma cidade</Title>
                <p>Clique em uma cidade da lista para ver os detalhes</p>
            </DetailsContainer>
        );
    }

    return (
        <DetailsContainer>
            <Title>{selectedCity.nome}</Title>
            <DataGrid>
                <DataItem>
                    <DataLabel>Anual</DataLabel>
                    <DataValue>{selectedCity.radiation.anual} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Janeiro</DataLabel>
                    <DataValue>{selectedCity.radiation.jan} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Fevereiro</DataLabel>
                    <DataValue>{selectedCity.radiation.fev} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Março</DataLabel>
                    <DataValue>{selectedCity.radiation.mar} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Abril</DataLabel>
                    <DataValue>{selectedCity.radiation.abr} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Maio</DataLabel>
                    <DataValue>{selectedCity.radiation.mai} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Junho</DataLabel>
                    <DataValue>{selectedCity.radiation.jun} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Julho</DataLabel>
                    <DataValue>{selectedCity.radiation.jul} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Agosto</DataLabel>
                    <DataValue>{selectedCity.radiation.ago} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Setembro</DataLabel>
                    <DataValue>{selectedCity.radiation.set} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Outubro</DataLabel>
                    <DataValue>{selectedCity.radiation.out} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Novembro</DataLabel>
                    <DataValue>{selectedCity.radiation.nov} kWh/m²</DataValue>
                </DataItem>
                <DataItem>
                    <DataLabel>Dezembro</DataLabel>
                    <DataValue>{selectedCity.radiation.dez} kWh/m²</DataValue>
                </DataItem>
            </DataGrid>
        </DetailsContainer>
    );
};

export default CityDetails;