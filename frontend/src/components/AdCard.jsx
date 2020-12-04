import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactSimpleSpinner } from 'reactjs-simple-spinner';

import { fetchData } from './Window';
import defaultImage from '../images/testAdImage.png';
let img = require('../images/7c2gaheiowu31.png');

const AdCardContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 300px;
  height: 300px;
  margin: 20px 345px;
  border-radius: 8px;
`;

const AdContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AdImg = styled.img`
  margin: 0px 70px;
  width: 160px;
`;

const AdTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding: 5px 10px;
`;

const AdText = styled.div`
  font-weight: 200;
  font-size: 14px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;

  padding: 0px 10px;
  color: #000000;
  background-color: inherit;
  text-overflow: ellipsis;
`;

const AdButton = styled.div`
  background: '#2176FF';
`;

const AdLink = styled.a`

  font-weight: 200;
  font-size: 14px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;
  text-decoration: none;

  padding-top: 10px;
  cursor: pointer;
`;

export default function AdCard({ title, description }) {
  let [ad, setAd] = useState(null)

  // Server has to be running for the endpoint to work
  let fetchAd = () => {
    fetchData('http://127.0.0.1:8000/advertisements/getad/',
      (data) => {
        setAd(data);
        console.log(data);
      },
    );
  }

  let renderAd = () => {
    if (ad == null) {
      return (
        <AdContainer>
          <AdTitle>{title}</AdTitle>
          <AdImg src={defaultImage} />
          <AdText>{description}</AdText>
          <AdLink href={"google.com"}>Go to site</AdLink>

        </AdContainer>
      );
    } else {
      return (
        <AdContainer>
          <AdTitle>{ad.header_text}</AdTitle>
          <AdImg src={`${ad.image}`}/>
          <AdText>{ad.second_text}</AdText>
          <AdButton>
            <AdLink href={ad.button_rendered_link}>Go to site</AdLink>
          </AdButton>
        </AdContainer>
      );
    }
  }

  useEffect(() => fetchAd(), []);

  return (
    <AdCardContainer>
      {renderAd()}
    </AdCardContainer>
  )
}
