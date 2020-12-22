import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 10px 15px;
  margin-bottom: 5px;
`;

const ModelsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModelContainer = styled.div`
  padding-right: 30px;

  cursor: pointer;
`;

const ModelText = styled.div`
  color: #FFFFFF;
  text-align: start;
  font-size: 18px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;
`;

const SelectedBar = styled.div`
  background-color: ${props => props.selected};
  height: 3px;
`;

export default function AdminBar({ selectedModel, setModel }) {

  let models = ['Advertisements', 'Campaigns'];

  let renderModels = () => (
    <ModelsContainer>
      {_.map(models, (model) => (
        <ModelContainer key={model} onClick={() => setModel(model)}>
          <ModelText>{model}</ModelText>
          <SelectedBar selected={model == selectedModel ? '#2176FF' : '#2B3032'} />
        </ModelContainer>
      ))}
    </ModelsContainer>
  )

  return (
    <BarContainer>
      {renderModels()}
    </BarContainer>
  );
}