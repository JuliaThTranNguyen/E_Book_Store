import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HailIcon from "@mui/icons-material/Hail";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Theme,
  ListItemText,
  Stack,
  Badge,
  Paper,
  InputBase,
  Avatar,
  ListItemIcon,
  Box,
} from "@mui/material";

import { NAV_LINKS } from "../../constant";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootStateType } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { UserLogout } from "../../redux/reducers/authReducer";
import { Book } from "../../types/Book";

const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    backgroundColor: `${(props: any) =>
      (props.theme as Theme).palette.mode === "dark" ? "white" : "black"} `,
    maxWidth: "200px",
  },
});

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 250px) {
    padding-left: 25px;
  }
`;

const StyledListIcon = styled(ListItemIcon)`
  font-size: 14px;
  display: flex;
  gap: 2px;
`;

const StyledLinks = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0px;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${(props) =>
    (props.theme as Theme).palette.mode === "dark" ? "white" : "black"};
  text-decoration: none;
  padding: 3px;
  margin-top: 40px;
`;

const StyledSearchLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  color: ${(props) =>
    (props.theme as Theme).palette.mode === "dark" ? "white" : "black"};
  text-decoration: none;
  padding: 3px;
  margin-top: 40px;
  cursor: pointer;
`;

const StyledCartIcon = styled(Badge)({
  marginTop: "5px",
});

const SearchContainer = styled(Paper)`
  display: flex;
  width: 100%;
  height: 40px;
  @media (min-width: 300px) {
    width: 100px;
    height: 40px;
  }
  @media (min-width: 600px) {
    width: 300px;
    height: 40px;
  }
  @media (min-width: 960px) {
    width: 500px;
    height: 40px;
  }
`;

const StyledSearchDropdown = styled(Paper)({
  position: "absolute",
  top: "100%",
  width: "100%",
  maxWidth: "300px",
  zIndex: 1,
  "@media (min-width: 300px)": {
    maxWidth: "100px",
  },
  "@media (min-width: 600px)": {
    maxWidth: "300px",
  },
  "@media (min-width: 960px)": {
    maxWidth: "500px",
  },
});

const StyledDropdownList = styled(List)({
  width: "100%",
});

const StyledDropdownItem = styled(ListItemText)({
  fontSize: "12px",
  textAlign: "left",
});

const StyledInputBase = styled(InputBase)`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const StyledTyphography = styled(Typography)((props) => ({
  color: (props.theme as Theme).palette.mode === "dark" ? "white" : "white",
}));

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state: RootStateType) => state.cart);
  const totalCartItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const { user, isLoggedIn } = useAppSelector(
    (state: RootStateType) => state.auth
  );

  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nodejs-server-thjulia.vercel.app/api/v1/books?title=${searchTerm}`
      );

      if (!response.ok) {
        console.error(`Failed to fetch books. Status: ${response.status}`);
        alert("Oops! Something has went wrong,  please refresh & try again.");
      }

      const data = await response.json();
      const { books } = data.data;

      setSearchResults(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Oops! Something has went wrong,  please refresh & try again.");
    }
  };

  const handleReviewBookData = async (result: Book) => {
    navigate(`/books/${result.isbn}`, {
      state: {
        bookData: result,
      },
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchDropdownOpen(true);
    handleSearch();
  };

  const handleCloseSearchDropdown = () => {
    setSearchDropdownOpen(false);
    setSearchTerm("");
  };

  const logoutHandler = () => {
    dispatch(UserLogout());
    navigate("/");
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      setSearchDropdownOpen(false);
    };

    document.body.addEventListener("click", handleDocumentClick);
    return () => {
      document.body.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: { xs: "80px" },
          }}
        >
          {/* First section */}
          <Stack direction="row" spacing={2}>
            <StyledLinks to="/">
              <StyledTyphography variant="h4" noWrap>
                <HomeIcon />
              </StyledTyphography>
            </StyledLinks>
            <Box paddingTop={0.5}>
              <StyledTyphography variant="h4" noWrap>
                <MenuIcon onClick={toggleMenu} />
              </StyledTyphography>
            </Box>
          </Stack>

          {/* Second & Search section */}
          <Stack direction="row" spacing={5}>
            <SearchContainer>
              <StyledInputBase
                placeholder="Want to find something ..."
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              <IconButton
                type="submit"
                sx={{ p: "10px" }}
                aria-label="search"
                size="large"
                onClick={() => handleSearch()}
              >
                <SearchIcon />
              </IconButton>
              {searchResults.length > 0 && isSearchDropdownOpen && (
                <StyledSearchDropdown>
                  <IconButton
                    aria-label="close"
                    size="large"
                    onClick={handleCloseSearchDropdown}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <CloseIcon />
                  </IconButton>

                  <StyledDropdownList>
                    {searchResults.map((result) => (
                      <StyledDropdownItem key={result._id}>
                        <StyledSearchLinks
                          onClick={() => handleReviewBookData(result)}
                        >
                          {result.title}
                        </StyledSearchLinks>
                      </StyledDropdownItem>
                    ))}
                  </StyledDropdownList>
                </StyledSearchDropdown>
              )}
            </SearchContainer>
          </Stack>

          {/* Third section */}
          <Stack direction="row" spacing={2}>
            <StyledLinks to="/cart">
              <StyledCartIcon badgeContent={totalCartItems} color="error">
                <StyledTyphography variant="h5" noWrap>
                  <LocalMallIcon />
                </StyledTyphography>
              </StyledCartIcon>
            </StyledLinks>
            {isLoggedIn ? (
              <Stack direction="row" spacing={5}>
                <StyledLinks to="/profile" style={{ textDecoration: "none" }}>
                  <Avatar
                    src={user?.image}
                    alt={user?.firstName}
                    style={{ width: 30, height: 30 }}
                  />
                </StyledLinks>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <StyledLinks
                  to="/login"
                  style={{ textDecoration: "none", marginTop: "5px" }}
                >
                  <StyledTyphography variant="h6" color="inherit" noWrap>
                    <HailIcon />
                  </StyledTyphography>
                </StyledLinks>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* First - Menu section */}
      <StyledDrawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
        <StyledList>
          {NAV_LINKS.map((item) => (
            <StyledListIcon key={item.id}>
              <StyledLinks to={item.url}>
                {item.icon && React.createElement(item.icon)}
              </StyledLinks>
            </StyledListIcon>
          ))}
          {isLoggedIn && (
            <>
              <StyledListIcon>
                <StyledLinks to="/users/borrowedBooks">
                  <AccountBoxIcon />
                </StyledLinks>
              </StyledListIcon>
              <StyledListIcon>
                <StyledLinks to="#" onClick={logoutHandler}>
                  <LogoutIcon />
                </StyledLinks>
              </StyledListIcon>
            </>
          )}
        </StyledList>
      </StyledDrawer>
    </>
  );
}
