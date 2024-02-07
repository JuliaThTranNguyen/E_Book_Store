import React from "react";

import { Avatar, Theme } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

interface PropsType {
  img: string;
}

const SlideContainer = styled.div`
  outline: none;
  border: none;
  position: relative;
  @media (min-width: 980px) {
    margin-top: 0px;
  }
`;

const SlideContent = styled.div`
  position: absolute;
  left: 30px;
  @media (min-width: 600px) {
    left: 70px;
    max-width: 350px;
  }
  top: 70%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #ffffffa2;
  padding: 1rem;
  @media (min-width: 600px) {
    padding: 0;
  }
  border-radius: 0.5rem;
  @media (min-width: 600px) {
    border-radius: 0;
  }
  z-index: 1; /* Ensure it's displayed above other elements */
`;

const ShopNowButton = styled.div`
  border: 2px solid #edd8d8;
  background-color: #67996f;
  font-size: 20px;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: inline-block;
  &:hover {
    background-color: #e0a4b1;
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 100%;
  height: 300px;
  @media (min-width: 600px) {
    height: auto;
  }
  border-radius: 0.75rem;
  object-fit: cover;
  object-position: right center;
  @media (min-width: 600px) {
    object-position: left bottom;
  }
`;

const StyledLink = styled(Link)`
  margin: '5px 0',
  flex-direction: column;
  textAlign: 'center',
  gap: 2px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${(props) =>
    (props.theme as Theme).palette.mode === "dark" ? "white" : "white"};
`;

const Slide: React.FC<PropsType> = ({ img }) => {
    return (
      <SlideContainer>
        <SlideContent>
          <ShopNowButton>
            <StyledLink to={'/books'}>Shop now</StyledLink>
          </ShopNowButton>
        </SlideContent>
        <StyledAvatar src={img} alt="banner" style={{ width: '100%', height: '300px', borderRadius: '0.75rem', objectFit: 'cover', objectPosition: 'right center' }} />
      </SlideContainer>
    );
  };
export default Slide;
