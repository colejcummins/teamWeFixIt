import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CardGrid from './CardGrid'

// Global colors for styling
export const colors = {
  white: '#FFFFFF',
  dark_grey: '#2B3032',
  blue: '#2176FF',
}

const WindowContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;

  background-color: ${colors.dark_grey};
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Window() {

  let [categories, setCategories] = useState(null);
  let [titles, setTitles] = useState(null);

  let fetchData = async () => {
    const url = "https://www.ifixit.com/api/2.0/wikis/CATEGORY?display=hierarchy";

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        try {
          setCategories(data.hierarchy);
          setTitles(data.display_titles);
        } catch (e) {
          throw new Error(`Data failure: ${data}`);
        }
      })
      .catch(e => console.error('Fetching error in Window: ', e));
  };

  // Fetch data on componentDidMount
  useEffect(() => fetchData(), []);

  return (
    <WindowContainer>
      <ContentContainer>
        <CardGrid
          categories={categories}
          titles={titles}
        />
      </ContentContainer>
    </WindowContainer>
  );
}

