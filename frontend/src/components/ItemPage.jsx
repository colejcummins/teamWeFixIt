import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {fetchData} from './Window';
import AdCard from './AdCard';


const PageContainer = styled.span`
  display: block;
  align-items: center;

  margin-top: 10px;
  padding: 5px 10px;

  background-color: #FFFFFF;
  border-radius: 6px;
  padding: 20px;
  width: 990px;
`;

const ItemTitle = styled.div`
  padding: 10px;
  font-size: 30px;
  font-weight: 600;
`;

const ItemImage = styled.img`
  padding: 10px;
  font-size: 30px;
  font-weight: 600;
`;

const CardText = styled.div`
  font-weight: 300;
  font-size: 18px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;
  color: #000000;
  text-overflow: ellipsis;
`;

export default function ItemPage({ title }) {

  let [itemDescription, setItemDescription] = useState(null);
  let [itemImage, setItemImage] = useState(null);

  // Fetch item description and image
  let fetchItemPage = () => {
    fetchData("https://www.ifixit.com/api/2.0/wikis/CATEGORY/" + title,
    (data) => {
      setItemDescription(data.description);
      setItemImage(data.image.standard);
    });
  };

  useEffect(() => fetchItemPage(), []);

  return (
    <div>
      <PageContainer>
        <ItemTitle>{title}</ItemTitle>
        <CardText> {itemDescription} </CardText>
        <ItemImage src={itemImage}></ItemImage>
      </PageContainer>
      <AdCard title="Here lies an ad." description="This is an ad description."/>
    </div>
  )
}
