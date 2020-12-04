import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import exitIcon from '../images/exitIcon.png'


const FadePanel = styled.div`
  position: absolute;   
  background-color: black;
  opacity: 0.45;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const AdCreationContainer = styled.div`
  position: absolute;   
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

const AdCreationPanel = styled.div`
  width: 500px;
  height: 500px;
  z-index: 10;
  background-color: white;
  position:absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  margin-top: 30px;
  display: grid;
  padding: 30px;
  box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ExitButton = styled.img`
  display:block;
  right: 0;
  width: 45px;
  position: absolute;
  padding: 9px;
  cursor: pointer;
`;

const FormLabel = styled.label`
  text-align:left;
`;

const FormInput = styled.input`
  text-align:left;
  margin-bottom: 17px;
`;

const SubmitBtn = styled.input`
  text-align:center;
  width: 80px;
`;

const CreateAdHeader = styled.div`
  font-size: 30px;
`;

export default function CreateAdPanel({ toggleAdPanel }) {

  function submitAd()
  {
    var adId = document.getElementsByName("id")[0].value;
    var adHeader = document.getElementsByName("header")[0].value;
    var adImgUrl = document.getElementsByName("img_url")[0].value;
    var secondText = document.getElementsByName("second_text")[0].value;
    var buttonLink = document.getElementsByName("btn_link")[0].value;

    var adObj = {
      "id": adId,
      "header_text": adHeader,
      "image": adImgUrl,
      "second_text": secondText,
      "button_rendered_link": buttonLink,
      "clicks": 0,
      "views": 0
    };

    var adObjJson = JSON.stringify(adObj);
    var url = "http://127.0.0.1:8000/advertisements/";

    const result = fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'authorization': "Basic bWljaGFlbG1vc2NoaXR0bzoxMW1pY2hhZWwxMQ=="
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: adObjJson // body data type must match "Content-Type" header
    });

    console.log(result);
  }

  return (
    <AdCreationContainer>
      <FadePanel></FadePanel>
      <AdCreationPanel>

        <ExitButton href="" src={exitIcon} onClick={toggleAdPanel}/>

        <CreateAdHeader>Create an Ad</CreateAdHeader>

        <FormLabel> Ad Name: </FormLabel>
        <FormInput type="text" name="header" />

        <FormLabel> Ad Id: </FormLabel>
        <FormInput type="text" name="id" />

        <FormLabel>  Image URL: </FormLabel>
        <FormInput type="text" name="img_url" />

        <FormLabel> Secondary Text: </FormLabel>
        <FormInput type="text" name="second_text" />

        <FormLabel> Button Link: </FormLabel>
        <FormInput type="text" name="btn_link" />

        <SubmitBtn onClick={submitAd} type="submit" value="Submit" />

      </AdCreationPanel>
    </AdCreationContainer>
  )
}
