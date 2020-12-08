import React, { useState } from 'react';
import styled from 'styled-components';

import DemoWindow from './DemoWindow';

const ParentContainer = styled.div`
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

export default function ParentWindow() {
  let [ selection, setSelection ] = useState('demo');

  return (
    <ParentContainer>
      <Sidebar />
      <DemoWindow />
    </ParentContainer>
  );
}