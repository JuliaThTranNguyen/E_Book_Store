import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { removeFromCart } from "../../redux/reducers/cartReducer";
import { CartItem } from "../../types/Cart";

const StyledImage = styled("img")({
  width: "60px",
  height: "80px",
});

const StyledSelectedBox = styled(Box)({
  color: "#c2061f",
  textAlign: "center",
  fontSize: "1.2rem",
});

interface DisplayItemsProps {
  book: CartItem;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  isCartEmpty: boolean;
}

export const DisplayItems = ({
  book,
  selected,
  onSelect,
  onRemove,
  isCartEmpty,
}: DisplayItemsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleReviewBookData = async () => {
    // Navigate to the details page when the image is clicked
    navigate(`/books/${book.isbn}`, {
      state: {
        bookData: {
          image: book.image,
          title: book.title,
          _id: book._id,
          authors: book.authors,
          genres: book.genres,
          publisher: book.publisher,
          isbn: book.isbn,
          status: book.status,
          publishedDate: book.publishedDate,
        },
      },
    });
  };

  return (
    <>
      <Box
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: { xs: "310px", md: "255px" },
        }}
      >
        <Box>
          {isCartEmpty === false ? (
            <CardActions>
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                  marginBottom={1}
                  border={"1px solid grey"}
                >
                  {/* Optional Selected Option */}
                  <Box
                    width="20px"
                    height="20px"
                    border="1px solid #ccc"
                    marginRight="16px"
                    marginLeft={"16px"}
                    onClick={onSelect}
                    style={{
                      cursor: "pointer",
                      backgroundColor: selected ? "#f5ece9" : "transparent",
                    }}
                  >
                    {selected && <StyledSelectedBox>✓</StyledSelectedBox>}
                  </Box>

                  {/* Item Details */}
                  <Button onClick={handleReviewBookData}>
                    <StyledImage src={book.image} alt={book.title} />
                  </Button>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      maxWidth: { xs: "115px", md: "145px" },
                      maxHeight: "400px",
                    }}
                  >
                    <Typography variant="subtitle1" marginBottom={1}>
                      {book.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      display={"flex"}
                      gap={1}
                      color={"grey"}
                    >
                      {" "}
                      <b>ISBN:</b> {book.isbn}
                    </Typography>
                    <Typography variant="caption" color="grey">
                      <i>Status: {book.status}</i>
                    </Typography>
                  </CardContent>

                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      onClick={() => {
                        dispatch(removeFromCart(String(book._id)));
                        onRemove(); // Call onRemove prop
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </CardActions>
          ) : (
            <CardActions>
              <Stack direction="row" spacing={1}>
                <Button size="small" onClick={() => navigate(`/`)}>
                  <ContentPasteSearchIcon />
                </Button>
              </Stack>
            </CardActions>
          )}
        </Box>
      </Box>
    </>
  );
};
