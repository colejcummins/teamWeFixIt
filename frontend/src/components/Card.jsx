import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const CardContainer = styled.span`
  display: flex;
  align-items: center;

  width: 300px;
  height: 70px;

  padding: 5px 10px;
  cursor: pointer;

  background-color: #FFFFFF;
  border-radius: 6px;
`;

const CardText = styled.div`
  font-weight: 600;
  font-size: 18px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;

  color: #000000;
  text-overflow: ellipsis;
`;

export default function Card({ title, path, setPath }) {

  return (
    <CardContainer onClick={() => setPath(_.concat(path, title))}>
      <CardText>{title}</CardText>
    </CardContainer>
  )
}