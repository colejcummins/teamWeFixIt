import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactSimpleSpinner } from 'reactjs-simple-spinner';

import { fetchData } from './Window';
import defaultImage from '../images/testAdImage.png';
let img = require('../images/7c2gaheiowu31.png');

const AdCardContainer = styled.div`
  background-color: #daefff;
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
  margin: 0px 50px;
  width: 200px;
`;

const AdTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding-top: 10px;
`;

const AdText = styled.div`
  font-weight: 200;
  font-size: 14px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;

  color: #000000;
  background-color: inherit;
  text-overflow: ellipsis;
`;

const AdButton = styled.a`
  background-color: '#2176FF';
  font-weight: 200;
  font-size: 14px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;
  text-decoration: none;

  padding-top: 10px;
  cursor: pointer;
`;

export default function AdCard({ title, description }) {
  let mediaRoot = '../images';

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
          <AdText>{desciption}</AdText>
          <AdButton href={"google.com"}>Go to site</AdButton>

        </AdContainer>
      );
    } else {
      // let other = require(`${mediaRoot}/${ad.image}`);
      return (
        <AdContainer>
          <AdTitle>{ad.header_text}</AdTitle>
          <AdImg src={img}/>
          <AdText>{ad.second_text}</AdText>
          <AdButton href={ad.button_rendered_link}>Go to site</AdButton>
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
