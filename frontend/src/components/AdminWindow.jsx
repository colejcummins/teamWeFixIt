import React, { useState } from 'react';
import styled from 'styled-components';

import AdminBar from './AdminBar';
import AdminTable from './AdminTable';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function AdminWindow() {
  let [ model, setModel ] = useState("Advertisements");

  return (
    <AdminContainer>
      <AdminBar selectedModel={model} setModel={setModel} />
      <AdminTable selectedModel={model} />
    </AdminContainer>
  );
}