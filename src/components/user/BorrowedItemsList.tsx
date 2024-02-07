import React, { useState } from "react";

import styled from "@emotion/styled";
import { Box, Button, CardContent, Typography } from "@mui/material";

import { Author } from "../../types/Author";
import { Genre } from "../../types/Genre";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { removeBorrowedItemsFromCart } from "../../redux/reducers/accountManagementReducer";

const BorrowedBookItem = styled(Box)({
  maxWidth: "md",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  marginBottom: "16px",
  border: "1px solid grey",
});

const StyledIcons = styled(Button)({
  paddingRight: "45px",
  paddingBottom: "50px",
  color: "#ed0c1f",
});

interface BorrowedBookListProps {
  book: {
    _id: string;
    isbn: string;
    title: string;
    image: string;
    publisher: string;
    publishedDate: string;
    status: string;
    borrowDate: string;
    borrowerId: string;
    returnDate: string;
    authors: Author[];
    genres: Genre[];
  };

  onSelect?: (bookId: string) => void;
}

export const BorrowedBookList: React.FC<BorrowedBookListProps> = ({
  book,

  onSelect,
}) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(false);

  const handleToggleSelect = () => {
    setSelected((prevSelected) => !prevSelected);

    if (onSelect) {
      onSelect(book._id);
    }
  };

  const handleReturn = () => {
    dispatch(removeBorrowedItemsFromCart(book._id));
  };

  const formattedBorrowDate = new Date(book.borrowDate).toLocaleDateString();
  const formattedReturnDate = new Date(book.returnDate).toLocaleDateString();

  return (
    <Box
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: { xs: "215px", md: "255px" },
      }}
    >
      <BorrowedBookItem>
        {/* Optional Selected Option */}
        <Box
          width="20px"
          height="20px"
          border="1px solid #ccc"
          marginRight="16px"
          marginLeft="25px"
          onClick={handleToggleSelect}
          style={{
            cursor: "pointer",
            backgroundColor: selected ? "#bce6c7" : "transparent",
          }}
          color={"transparent"}
        >
          <StyledIcons size="small" onClick={handleReturn}>
            {selected && "✓"}
          </StyledIcons>
        </Box>

        <CardContent
          sx={{ flexGrow: 1, maxWidth: { xs: "190px", md: "210px" } }}
        >
          <Typography variant="subtitle1">{book.title}</Typography>
          <Typography variant="body2" display={"flex"} gap={1} color={"grey"}>
            {" "}
            <b>ISBN:</b> {book.isbn}
          </Typography>
          <Typography variant="body2" display={"flex"} gap={1} color={"grey"}>
            <b>Borrowed on:</b> {formattedBorrowDate}
          </Typography>
          <Typography variant="body2" display={"flex"} gap={1} color={"grey"}>
            <b>Return by:</b> {formattedReturnDate}
          </Typography>
        </CardContent>
      </BorrowedBookItem>
    </Box>
  );
};
