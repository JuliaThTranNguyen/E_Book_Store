import React from "react";
import { Stack } from '@mui/material';
import Hero from "../components/hero/Hero";
import { SLIDE_IMAGES } from "../constant";
//import Body from '../components/pages/HomePage_Body';

const HomePage = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Hero slideImages={SLIDE_IMAGES} />
    </Stack>
  )
}

export default HomePage
