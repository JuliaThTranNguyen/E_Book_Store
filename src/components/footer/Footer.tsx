import React from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  List,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Theme,
} from "@mui/material";
import styled from "@emotion/styled";

import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "../../constant";

const StyledFooter = styled.footer`
  display: none; /* Hide by default */
  @media (min-width: 968px) {
    display: flex;
    justify-content: center;
    margin-bottom: 5px; /* Adjust the margin as needed */
  }
`;

const FooterContent = styled.div`
  display: none; /* Hide by default */
  @media (min-width: 968px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 5%;
  }
`;

const FooterContainer = styled.div`
  padding: 0;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledFooterListContainer = styled.div`
  display: none; /* Hide by default */
  @media (min-width: 968px) {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 5px;
    justify-content: space-between;
    width: 100%;
  }
`;

const LogoLink = styled(Link)`
  display: none; /* Hide by default */
  @media (min-width: 968px) {
    display: block; /* Show on laptop views */
    margin-bottom: 10px;
    padding-right: 15px;
  }
`;

const StyledFooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
`;

const StyledListItem = styled(ListItemText)`
  font-size: 14px;
`;

const StyledLinks = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: ${(props) =>
    (props.theme as Theme).palette.mode === "dark" ? "green" : "blue"};
`;

const StyledListIcon = styled(ListItemIcon)`
  font-size: 14px;
  display: flex;
  gap: 2px;
`;

const StyledDivider = styled.div`
  border: 1px solid grey;
  background-color: #8aab9d;
  margin: 5px 0;
`;

const StyledTypography = styled(Typography)({
  fontSize: "14px",
  textAlign: "center",
  margin: "5px 0",
  fontWeight: "bold",
  color: `${(props: any) =>
    (props.theme as Theme).palette.mode === "dark" ? "white" : "black"}`,
});

const StyledAuthorLink = styled(Link)`
  margin: '5px 0',
  flex-direction: column;
  textAlign: 'center',
  gap: 2px;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) =>
    (props.theme as Theme).palette.mode === "dark" ? "green" : "blue"};
`;

const StyledAvatar = styled(Avatar)({
  width: 50,
  height: 50,
  marginLeft: "50px",
});

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[300]
            : theme.palette.grey[900],
        p: 2,
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      component="footer"
    >
      <StyledFooter>
        <FooterContainer>
          <FooterContent>
            <Box>
              <LogoLink to="/">
                <StyledAvatar src="/book.svg" alt="logo" />
              </LogoLink>
            </Box>
            {/* PART 1 */}
            <StyledFooterListContainer>
              {FOOTER_LINKS.map((columns) => (
                <StyledFooterColumn title={columns.title} key={columns.title}>
                  <Typography variant="h6">{columns.title}</Typography>
                  <StyledList>
                    {columns.listItems.map((link) => (
                      <StyledListItem key={link.id}>
                        <StyledLinks to={link.url}>{link.label}</StyledLinks>
                      </StyledListItem>
                    ))}
                  </StyledList>
                </StyledFooterColumn>
              ))}

              {/* PART 2 */}
              <StyledFooterColumn>
                <Typography variant="h6">
                  {FOOTER_CONTACT_INFO.title}
                </Typography>
                <StyledList>
                  {FOOTER_CONTACT_INFO.listItems.map((link) => (
                    <StyledLinks to="/" key={link.id}>
                      <p>{link.value}</p>
                    </StyledLinks>
                  ))}
                </StyledList>
              </StyledFooterColumn>

              {/* PART 3 */}
              <StyledFooterColumn>
                <Typography variant="h6">{SOCIALS.title}</Typography>
                <StyledList>
                  {SOCIALS.listItems.map((item) => (
                    <StyledListIcon key={item.id}>
                      <StyledLinks to={item.url}>
                        {React.createElement(item.icon)}
                      </StyledLinks>
                    </StyledListIcon>
                  ))}
                </StyledList>
              </StyledFooterColumn>
            </StyledFooterListContainer>
          </FooterContent>

          {/* PART 4 */}
          <StyledDivider />
          <StyledTypography>
            2023 Shobie Online Shopping App | All rights reserved | Made by{" "}
            <StyledAuthorLink to="https://github.com/JuliaThTranNguyen">
              @TH.Julia - HienTran
            </StyledAuthorLink>{" "}
          </StyledTypography>
        </FooterContainer>
      </StyledFooter>
    </Box>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

export default Footer;
