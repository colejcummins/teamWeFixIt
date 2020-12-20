import React, { useEffect } from 'react';
import _ from 'lodash';

import { fetchData } from './ParentWindow';


export default function AdminTable({ selectedModel }) {

  let fetchModels = () => {
    fetchData(`http://127.0.0.1:8000/${_.lowerFirst(selectedModel)}`,
      (data) => {
        console.log(data);
      },
      {
        method: 'GET',
      },
    );
  }

  useEffect(() => fetchModels(), [selectedModel]);

  return (
    <div />
  );
}