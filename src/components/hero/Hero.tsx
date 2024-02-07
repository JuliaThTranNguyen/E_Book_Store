import React from 'react';
import Slider from 'react-slick';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import Slide from './Slide';

interface HeroProps {
  slideImages: { id: number; img: string }[];
}

const StyledContainer = styled(Container)`
  padding-top: 1.0rem;

  @media (min-width: 1280px) {
    padding-top: 1.5rem;
  }
`;

const Hero: React.FC<HeroProps> = ({ slideImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  return (
    <StyledContainer>
      <Slider {...settings}>
        {slideImages.map((item) => (
          <Slide key={item.id} img={item.img} />
        ))}
      </Slider>
    </StyledContainer>
  );
};

export default Hero;
