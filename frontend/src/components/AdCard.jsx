import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactSimpleSpinner } from 'reactjs-simple-spinner';

import { fetchData } from './Window';
import adImage from '../images/testAdImage.png' // test image

const AdCardContainer = styled.div`
  background-color: #daefff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 300px;
  height: 300px;
  margin: 20px;
  border-radius: 8px;
`;

const AdImg = styled.img`
  width: 200px;
`;

const AdTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
`;

const AdText = styled.a`
  font-weight: 200;
  font-size: 14px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;

  cursor: pointer;

  color: #000000;
  background-color: inherit;
  text-overflow: ellipsis;
`;

export default function AdCard({ title, description }) {

  let [ad, setAd] = useState(null)
  let [loading, setLoading] = useState(true);

  // Server has to be running for the endpoint to work
  let cors = 'https://cors-anywhere.herokuapp.com/';
  let fetchAd = () => {
    fetchData(cors + '127.0.0.1:8000/getad',
    (data) => {
      setLoading(false);
      console.log(data);
    });
  }

  useEffect(() => fetchAd(), []);

  return (
    <AdCardContainer>
      <AdTitle>{title}</AdTitle>
      <AdImg src={adImage}></AdImg>
      <AdText> {description} </AdText>
    </AdCardContainer>
  )
}
