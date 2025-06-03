import React from 'react';
import styled from 'styled-components';
import { RadiationProvider } from '../context/RadiationContext';
import CityList from '../components/CityList';
import RadiationMap from '../components/RadiationMap';
import CityDetails from '../components/CityDetails';
import { useRadiation } from '../context/RadiationContext';

const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 24px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 350px;
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    
    & > div:nth-child(3) {
      order: 3;
    }
  }
`;

const SectionTitle = styled.h2`
  color: #34495e;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.2rem;
`;

const App: React.FC = () => {
  return (
    <RadiationProvider>
      <AppContainer>
        <Title>Monitoramento de Radiação Solar</Title>

        <ContentGrid>
          <div>
            <SectionTitle>Cidades Disponíveis</SectionTitle>
            <CityList />
          </div>

          <div>
            <SectionTitle>Visualização Geográfica</SectionTitle>
            <RadiationMapWithData />
          </div>

          <div>
            <SectionTitle>Dados Detalhados</SectionTitle>
            <CityDetails />
          </div>
        </ContentGrid>
      </AppContainer>
    </RadiationProvider>
  );
};

const RadiationMapWithData: React.FC = () => {
  const { selectedCity } = useRadiation();

  // Adicione um key para forçar recriação do mapa quando a cidade muda
  return (
    <RadiationMap
      key={selectedCity?.nome || 'default'}
      position={selectedCity?.position || null}
      polygon={selectedCity?.radiation.polygon || null}
      cityName={selectedCity?.nome || null}
      annualRadiation={selectedCity?.radiation.anual || null}
    />
  );
};

export default App;