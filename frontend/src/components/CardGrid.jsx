import React, {useState} from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Card from './Card';
import PathNavigator from './PathNavigator';
import ItemPage from './ItemPage';

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GridContainer = styled.div`
  background-color: #2B3032;

  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;

  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 30px;
  grid-template-rows: auto;
  row-gap: 40px;
`;

export default function CardGrid({ categories, titles }) {
  let [path, setPath] = useState([]);

  let currentKeys = _.keys(path.length > 0 ? _.get(categories, path) : categories).sort();

  return (
    <TopContainer>
      <PathNavigator navPath={path} setPath={setPath}/>
      {(_.get(categories, path) == null && path.length > 0) ?
        (
          <ItemPage title={path[path.length - 1]} />
        ) :
        (
          <GridContainer>
            {
              _.map(currentKeys, (key) => (
                <Card key={key} title={key} path={path} setPath={setPath} />
              ))
            }
          </GridContainer>
        )
      }
    </TopContainer>
  );
}
