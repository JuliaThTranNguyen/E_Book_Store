import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Author } from "../../types/Author";
import { Genre } from "../../types/Genre";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addToCart } from "../../redux/reducers/cartReducer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootStateType } from "../../redux/store";

const StyledCard = styled(Card)({
  maxWidth: "200px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const StyledImage = styled(CardMedia)({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderTopLeftRadius: "26px",
  borderTopRightRadius: "26px",
});

const StyledInnerContainer = styled(CardContent)({
  minHeight: "120px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: "6px",
});

const StyledActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid #e0e0e0",
  padding: "4px",
});

const StyledLink = styled(Button)({
  color: "grey",
});

interface BookProps {
  image: string;
  title: string;
  _id: string;
  authors: Author[];
  genres: Genre[];
  isbn: string;
  publisher: string;
  publishedDate: string;
  status: string;
}

export const BookCard: React.FC<BookProps> = ({
  image,
  title,
  _id,
  authors,
  genres,
  publisher,
  isbn,
  status,
  publishedDate,
}) => {
  const cart = useAppSelector((state: RootStateType) => state.cart);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddtoCart = () => {
    if (status === "available") {
      const foundIndex = cart.findIndex((item) => item._id === _id);

      if (foundIndex === -1) {
        dispatch(
          addToCart({
            _id,
            isbn,
            title,
            image,
            publisher,
            publishedDate,
            status,
            authors,
            genres,
          })
        );
      } else {
        // Book already in the cart, show error message
        alert("This book is already added to your cart");
      }
    } else {
      // Book not available for loan, show error message
      alert("This book is not available for loan");
    }
  };

  const handleArrowClick = () => {
    navigate(`/books/${isbn}`, {
      state: {
        bookData: {
          image,
          title,
          _id,
          authors,
          genres,
          publisher,
          isbn,
          status,
          publishedDate,
        },
      },
    });
  };

  return (
    <StyledCard>
      <StyledLink onClick={handleArrowClick}>
        <StyledImage image={image} title={title} />
      </StyledLink>

      <StyledInnerContainer>
        <Typography variant="body2" color="inherit" mb={2}>
          <b>{title}</b>
        </Typography>
        <Typography variant="body2" color="#476b50">
          <i>
            <b>Status:</b> {status}
          </i>
        </Typography>
      </StyledInnerContainer>
      <StyledActions>
        <Button size="small" onClick={handleAddtoCart}>
          <AddShoppingCartIcon />
        </Button>
        <StyledLink onClick={handleArrowClick}>
          <DoubleArrowIcon />
        </StyledLink>
      </StyledActions>
    </StyledCard>
  );
};
