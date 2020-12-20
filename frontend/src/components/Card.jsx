import React, {useRef, useEffect, useState} from 'react';
import { ReactSimpleSpinner } from 'reactjs-simple-spinner';
import styled from 'styled-components';
import _ from 'lodash';

import { fetchData } from './ParentWindow';

const CardContainer = styled.span`
  display: flex;
  align-items: center;

  width: 300px;
  height: 70px;

  padding: 5px;
  cursor: pointer;

  background-color: #FFFFFF;
  border-radius: 6px;
`;

const CardImage = styled.img`
  height: 72px;
  width: 80px;
`;

const CardText = styled.div`
  margin-left: 10px;
  font-weight: 500;
  font-size: 18px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;

  color: #000000;
  text-overflow: ellipsis;
`;

export default function Card({ title, path, setPath }) {

  let [image, setImage] = useState(null);
  let [loading, setLoading] = useState(true);

  let visibleRef = useRef();

  let fetchCardImage = () => {
    fetchData("https://www.ifixit.com/api/2.0/wikis/CATEGORY/" + title,
    (data) => {
      setImage(data.image.standard);
      setLoading(false);
    });
  };

  useEffect(() => fetchCardImage(), []);

  return (
    <CardContainer ref={visibleRef} onClick={() => setPath(_.concat(path, title))}>
      {loading ?
        (
          <ReactSimpleSpinner size={48} lineFgColor={'#2176FF'} lineBgColor={'#FFFFFF'} style={{padding: '0px 5px'}}/>
        ) :
        (
          <CardImage src={image} />
        )
      }
      <CardText>{title}</CardText>
    </CardContainer>
  )
}
