import React, { useState, useEffect } from 'react';
import { ReactSimpleSpinner } from 'reactjs-simple-spinner';
import styled from 'styled-components';

import CardGrid from './CardGrid'

// Global colors for styling
export const colors = {
  white: '#FFFFFF',
  dark_grey: '#2B3032',
  blue: '#2176FF',
};

export const fetchData = async (url, func) => {
  await fetch(url,
  {
    headers: {
      'Content-Type': 'application/json',
      'authorization': "Basic bWljaGFlbG1vc2NoaXR0bzoxMW1pY2hhZWwxMQ==",
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/',
    },
  })
  .then(res => res.json())
  .then(data => {
    try {
      func(data)
    } catch (e) {
      throw new Error(`Data failure: ${data}`);
    }
  })
  .catch(e => console.error('Fetching error in Window: ', e));
}

const WindowContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;

  background-color: ${colors.dark_grey};
`;

const SpinnerContainer = styled.div`
  align-items: center;
  padding: 100px 0px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Window() {

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
    <WindowContainer>
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
    </WindowContainer>
  );
}
