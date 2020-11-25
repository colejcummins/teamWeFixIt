import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import adImage from '../images/testAdImage.png' // test image

const AdCardContainer = styled.span`
	background-color: #daefff;
	display: inline-block;
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

const AdText = styled.div`
  font-weight: 200;
  font-size: 14px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;

  color: #000000;
  text-overflow: ellipsis;
`;

export default function AdCard({ title, description }) {

	return (
		<AdCardContainer>
			<AdTitle>{title}</AdTitle>
			<AdImg src={adImage}></AdImg>
			<AdText> {description} </AdText>
		</AdCardContainer>
	)
}
