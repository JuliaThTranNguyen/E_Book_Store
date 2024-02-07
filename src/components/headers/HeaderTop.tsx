import React from "react";

import styled from "@emotion/styled";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  AppBar,
  Box,
  MenuItem,
  Select,
  Stack,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const IconsContainer = styled.div`
  display: flex;
  text-align: center;
`;

const StyledSelect = styled(Select)`
  color: #555;
  font-size: 12px;
  width: 60px;
  height: 30px;
  color: ${(props) =>
    (props.theme as Theme).palette.mode === "dark" ? "white" : "white"};
`;

const StyledTypo = styled(Typography)`
  color: ${(props) =>
    (props.theme as Theme).palette.mode === "dark" ? "white" : "white"};
`;

export default function HeaderTop() {
  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={5}>
          <FlexContainer>
            {/* PART 1 */}
            <IconsContainer>
              <div className="header_top_icon_wrapper">
                <FacebookIcon />
              </div>
              <div className="header_top_icon_wrapper">
                <InstagramIcon />
              </div>
              <div className="header_top_icon_wrapper">
                <LinkedInIcon />
              </div>
            </IconsContainer>
          </FlexContainer>
        </Stack>

        <Stack
          direction="row"
          spacing={10}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <StyledTypo variant="body2">
            <b>WELCOME TO OUR E-BOOK STORE</b>
          </StyledTypo>
        </Stack>

        <Stack direction="row" spacing={5}>
          <FlexContainer>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <label htmlFor="language" className="sr-only">
                Select Language
              </label>
            </Box>

            <StyledSelect
              labelId="language-label"
              id="language"
              label="Select Language"
              defaultValue="English"
            >
              <MenuItem value="English" color="white">
                EN
              </MenuItem>
            </StyledSelect>
          </FlexContainer>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
