import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { Author } from "../types/Author";
import { Genre } from "../types/Genre";
import { Book } from "../types/Book";
import { useAppSelector } from "../hooks/useAppSelector";
import { RootStateType } from "../redux/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToCart } from "../redux/reducers/cartReducer";

const StyledMainSection = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin-top: "200px";
  align-items: flex-start;
  min-height: "350px";

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledReturnIcon = styled(Box)({
  color: "grey",
  marginRight: 15,
  marginTop: 15,
});

const StyledButton = styled(Button)({
  color: "grey",
});

const StyledImageContainer = styled(Grid)`
  border: 2px solid #496e54;
  flexdirection: column;
  display: flex;
  padding: 16px;
  max-width: 400px;
  height: 100%;
  margin-right: 20px;
  width: 100%;

  @media (max-width: 300px) {
    align-items: center; /* Center items */
    margin-bottom: 20px; /* Add margin at the bottom */
    height: 278px;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const StyledContentContainer = styled(Grid)`
  flex: 1;
  min-height: 100%;
  border: 2px solid #496e54;
  background-color: ${(props) =>
    (props.theme as Theme).palette.mode === "dark" ? "#224029" : "#5b8c66"};
  padding: 16px;
  @media (min-width: 300px) {
    width: 100%;

    gap: 4;
  }
`;

const StyledContentBody = styled(Grid)`
  flex: 1;
  margin-top: 25px;
`;

const StyledLabel = styled("span")({
  marginBottom: "8px",
  fontWeight: "bold",
});

const StyledTypography = styled(Typography)`
  margin-top: 10px;
`;

const StyledButtonContainer = styled(Grid)`
  margin-top: 20px;
`;

export const SingleProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state: RootStateType) => state.cart);
  const bookData: Book = location.state?.bookData || {};

  const handleAddtoCart = () => {
    if (bookData.status === "available") {
      const foundIndex = cart.findIndex((item) => item._id === bookData._id);

      if (foundIndex === -1) {
        dispatch(
          addToCart({
            _id: bookData._id,
            isbn: bookData.isbn,
            title: bookData.title,
            image: bookData.image,
            publisher: bookData.publisher,
            publishedDate: bookData.publishedDate,
            status: bookData.status,
            authors: bookData.authors,
            genres: bookData.genres,
          })
        );
      } else {
        alert("This book is already added to your cart");
      }
    } else {
      alert("This book is not available for loan");
    }
    navigate("/cart", { state: { bookData } });
  };

  const handleArrowClick = () => {
    navigate("/books");
  };

  return (
    <StyledMainSection>
      <StyledImageContainer item>
        <StyledReturnIcon>
          <StyledButton onClick={handleArrowClick}>
            <KeyboardDoubleArrowLeftIcon />
          </StyledButton>
        </StyledReturnIcon>
        <img src={bookData.image} alt={bookData.title} />
      </StyledImageContainer>

      <StyledContentContainer item>
        <StyledTypography variant="h6">
          <b>{bookData.title}</b>
        </StyledTypography>
        <StyledContentBody>
          <StyledTypography>
            <StyledLabel>ISBN:</StyledLabel> {bookData.isbn}
          </StyledTypography>
          <StyledTypography>
            <StyledLabel>Publisher:</StyledLabel> {bookData.publisher}
          </StyledTypography>

          <StyledTypography>
            <StyledLabel>Authors: </StyledLabel>{" "}
            {bookData.authors?.map((author: Author) => author.name).join(", ")}
          </StyledTypography>
          <StyledTypography>
            <StyledLabel>Genres:</StyledLabel>{" "}
            {bookData.genres?.map((genre: Genre) => genre.title).join(", ")}
          </StyledTypography>
          <StyledTypography>
            <StyledLabel>Status:</StyledLabel> {bookData.status}
          </StyledTypography>
        </StyledContentBody>

        <StyledButtonContainer>
          <Button
            onClick={handleAddtoCart}
            variant="contained"
            style={{ color: "white", backgroundColor: "#44754f" }} // Adjust the background color as needed
          >
            <AddShoppingCartIcon />
            Add to Cart
          </Button>
        </StyledButtonContainer>
      </StyledContentContainer>
    </StyledMainSection>
  );
};
