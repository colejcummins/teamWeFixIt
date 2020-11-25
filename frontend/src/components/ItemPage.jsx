import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import AdCard from './AdCard';


const PageContainer = styled.span`
    display: block;
    align-items: center;
    width: 70vw;
    padding: 5px 10px;

    background-color: #FFFFFF;
    border-radius: 6px;
    padding: 20px;
    min-width: 700px;
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
    useEffect(() => {
        async function fetchData() {
            const url = "https://www.ifixit.com/api/2.0/wikis/CATEGORY/" + title;
            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    try {
                        setItemDescription(data.description);
                        setItemImage(data.image.standard);
                        console.log(data.image.standard);
                    } catch (e) {
                        throw new Error(`Data failure: ${data}`);
                    }
                })
                .catch(e => console.error('Fetching error in Window: ', e));
        }
        fetchData();
    }
    , []);

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
