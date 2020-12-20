import React, { useEffect, useState } from 'react';
import { ReactSimpleSpinner } from 'reactjs-simple-spinner';
import styled from 'styled-components';
import _ from 'lodash';

import { fetchData } from './ParentWindow';

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpinnerContainer = styled.div`
  align-items: center;
  padding: 100px 0px;
`;

export default function AdminTable({ selectedModel }) {

  let [modelRows, setModelRows] = useState([]);
  let [loading, setLoading] = useState(true);

  let fetchModels = () => {
    setLoading(true);

    fetchData(`http://127.0.0.1:8000/${_.lowerFirst(selectedModel)}/`,
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

  return (
    <TableContainer>
      {loading ?
        (
          <SpinnerContainer>
            <ReactSimpleSpinner size={100} lineBgColor={'#2B3032'} lineFgColor={'#2176FF'}/>
          </SpinnerContainer>
        ) :
        (
          <div/>
        )
      }
    </TableContainer>
  );
}