import React, { useEffect, useState } from 'react';
import { ReactSimpleSpinner } from 'reactjs-simple-spinner';
import styled from 'styled-components';
import { map, lowerFirst } from 'lodash';

import { fetchData } from './ParentWindow';

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableContainer = styled.div`

`;

const SpinnerContainer = styled.div`
  align-items: center;
  padding: 100px 0px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 10px 20px;
`;

const RowContainer = styled.div`
  background-color: #363D40;
  display: flex;
  flex-direction: row;

  cursor: pointer;

  padding: 20px;
  border-radius: 4px;

  margin-bottom: 20px;

  &:hover {
    background-color: #2B3032;
  }
`;

const RowText = styled.div`
  text-align: left;

  width: ${props => props.width}%;

  font-weight: 500;
  font-size: ${props => props.fontSize}px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;

  color: #ffffff;
  text-overflow: ellipsis;
`;

// Literal width Values for styling
const modelColumns = {
  Advertisements: {
    widths: ['10', '20', '15', '15', '40'],
    columns: ['id', 'header_text', 'views', 'clicks', 'second_text'],
  },
  Campaigns: {
    widths: ['10', '40', '15', '15'],
    columns: ['id', 'name', 'start_date', 'end_date'],
  },
}

export default function AdminTable({ selectedModel }) {

  let [modelRows, setModelRows] = useState([]);
  let [loading, setLoading] = useState(true);

  let fetchModels = () => {
    setLoading(true);

    fetchData(`http://127.0.0.1:8000/${lowerFirst(selectedModel)}/`,
      (data) => {
        console.log(data);
        setModelRows(data);
        setLoading(false);
      },
      {
        method: 'GET',
      },
      {
        // TODO: Add proper auth
        authorization: 'Basic Y29sZWpjdW1taW5zOmF6YWxlYTQ5OHdheQ==',
      },
    );
  }

  useEffect(() => fetchModels(), [selectedModel]);

  let renderHeader = () => (
    <HeaderContainer>
      {renderRows("14", (name) => name)}
    </HeaderContainer>
  )

  let renderTable = () => {
    return map(modelRows, (model) => (
      <RowContainer>
        {renderRows("16", (name) => model[name])}
      </RowContainer>
    ))
  }

  let renderRows = (fontSize, content) => {
    return map(modelColumns[selectedModel].columns, (columnName, ind) => (
      <RowText fontSize={fontSize} width={modelColumns[selectedModel].widths[ind]}>
        {content(columnName)}
      </RowText>
    ))
  }

  return (
    <ComponentContainer>
      {loading ?
        (
          <SpinnerContainer>
            <ReactSimpleSpinner size={100} lineBgColor={'#2B3032'} lineFgColor={'#2176FF'}/>
          </SpinnerContainer>
        ) :
        (
          <TableContainer>
            {renderHeader()}
            {renderTable()}
          </TableContainer>
        )
      }
    </ComponentContainer>
  );
}