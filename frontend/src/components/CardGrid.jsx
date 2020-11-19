import React, {useState} from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Card from './Card';
import PathNavigator from './PathNavigator';

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;

  display: grid;

  grid-template-columns: 350px 350px 350px;
  grid-template-rows: auto;
  row-gap: 40px

`;

export default function CardGrid({ categories, titles }) {
  let [path, setPath] = useState([]);

  let currentKeys = _.keys(path.length > 0 ? _.get(categories, path) : categories).sort();

  let renderCards = () => {
    return _.map(currentKeys, (key) => (
      <Card title={key} path={path} setPath={setPath} />
    ));
  }

  return (
    <TopContainer>
      <PathNavigator navPath={path} setPath={setPath}/>
      <GridContainer>
        {renderCards()}
      </GridContainer>
    </TopContainer>
  );
}
