import React, { useState, useEffect } from 'react';
import { ReactSimpleSpinner } from 'reactjs-simple-spinner';
import styled from 'styled-components';

import { fetchData } from './ParentWindow';
import CardGrid from './CardGrid'

// Global colors for styling
export const colors = {
  white: '#FFFFFF',
  dark_grey: '#2B3032',
  blue: '#2176FF',
};

const SpinnerContainer = styled.div`
  align-items: center;
  padding: 100px 0px;
`;

const ContentContainer = styled.div`
  display: flex;
  width: calc(100% - 180px);
  justify-content: center;
`;

export default function DemoWindow() {

  let [categories, setCategories] = useState(null);
  let [titles, setTitles] = useState(null);
  let [loading, setLoading] = useState(true);

  let fetchWindow = () => {
    fetchData("https://www.ifixit.com/api/2.0/wikis/CATEGORY?display=hierarchy",
    (data) => {
      setCategories(data.hierarchy);
      setTitles(data.display_titles);
      setLoading(false);
    });
  }

  // Fetch data on componentDidMount
  useEffect(() => fetchWindow(), []);

  return (
    <ContentContainer>
      {loading ?
        (
          <SpinnerContainer>
            <ReactSimpleSpinner size={100} lineBgColor={'#2B3032'} lineFgColor={'#2176FF'}/>
          </SpinnerContainer>
        ) :
        (
          <CardGrid
            categories={categories}
            titles={titles}
          />
        )
      }
    </ContentContainer>
  );
}
