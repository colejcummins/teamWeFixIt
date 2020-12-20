import React, { useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import DemoWindow from './DemoWindow';
import AdminWindow from './AdminWindow';

export const fetchData = async (url, func, fields={}, onFinally=() => null) => {
  await fetch(url,
  {
    headers: {
      'Content-Type': 'application/json',
    },
    ...fields,
  })
  .then(res => res.json())
  .then(data => {
    try {
      func(data)
    } catch (e) {
      throw new Error(`Data failure: ${data}`);
    }
  })
  .catch(e => console.error('Fetching error in Window: ', e))
  .finally(() => onFinally());
}

const ParentContainer = styled.span`
  min-width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: row;

  background-color: #2B3032;
`;

const Sidebar = styled.div`
  min-height: 100vh;
  width: 180px;
`;

const SelectionBox = styled.div`
  background-color: ${props => props.selected};
  border-top-right-radius: ${props => props.top};
  border-bottom-right-radius: 4px;

  cursor: pointer;

  justify-content: left;

  padding: 15px 20px;
  height: 20px;
`;

const SelectionText = styled.div`
  color: #FFFFFF;
  text-align: start;
  font-size: 16px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;
`;

export default function ParentWindow() {
  let [ selection, setSelection ] = useState('Demo');
  let keys = ['Demo', 'Admin'];

  let renderSideBar = () => (
    <Sidebar>
      {_.map(keys, (key, ind) => (
        <SelectionBox
          key={key}
          selected={key == selection ? '#2176FF' : '#2B3032'}
          top={ind == 0 ? '0px' : '4px'}
          onClick={() => setSelection(key)}
        >
          <SelectionText>{key}</SelectionText>
        </SelectionBox>
      ))}
    </Sidebar>
  );

  let renderWindow = {'Demo': <DemoWindow/>, 'Admin': <AdminWindow/>};

  return (
    <ParentContainer>
      {renderSideBar()}
      {renderWindow[selection]}
    </ParentContainer>
  );
}