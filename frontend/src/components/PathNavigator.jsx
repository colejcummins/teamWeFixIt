import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import {ReactComponent as ChevronRight} from '../chevron-right.svg';

const PathContainer = styled.div`
  display: flex;
  margin: 10px 0px;
`;

const PathSpan = styled.span`
  display: flex;
`;

const PathText = styled.div`
  font-weight: 400;
  font-size: 16px;
  font-family: Roboto, Ubuntu, Oxygen, sans-serif;

  align-content: center;
  padding: 3px 0px;

  cursor: pointer;
  color: #FFFFFF;
`;

export default function PathNavigator({ navPath, setPath }) {
  let path = [...navPath];
  path.unshift("Home");

  return (
    <PathContainer>
      {_.map(path, (val, ind) => (
        <PathSpan>
          <PathText onClick={() => setPath(_.slice(navPath, 0, ind))}>{val}</PathText>
          {(ind < (path.length - 1)) ? (<ChevronRight style={{color: '#2176FF', padding: '0px 5px'}}/>) : (<div/>)}
        </PathSpan>
      ))}
    </PathContainer>
  );

}