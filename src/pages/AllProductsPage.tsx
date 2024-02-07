import React, { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { getAllBooks, setAllBooks } from "../redux/reducers/booksReducer";
import { useAppDispatch } from "../hooks/useAppDispatch";
import styled from "@emotion/styled";
import { BookCard } from "../components/books/BookCard";

const CustomBox = styled(Box)({
  maxWidth: "auto",
  height: "auto",
  margin: "0 auto",
  padding: "16px",
});

const PaginationContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "16px",
});

const PageButton = styled(Button)({
  margin: "0 4px",
});

export const AllProductsPage = () => {
  const { books, loading } = useAppSelector((state) => state.book);
  const itemsPerPage = 12;
  const totalPages: number = books.length / itemsPerPage + 1;
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getAllBooks());

      if (getAllBooks.fulfilled.match(result)) {
        const { payload: allBooks } = result;
        dispatch(setAllBooks(allBooks));
      } else {
        alert(
          "Oops! An error occurred while fetching the item. Please rerfresh again."
        );
      }
    };

    fetchData();
  }, [dispatch, currentPage, totalPages]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedBooks = books.slice(startIndex, endIndex);

  /*HANDLE LOADING DATA ... */
  if (loading || !books || books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "1300px",
      }}
    >
      <CustomBox sx={{ minWidth: "1200px" }}>
        <Grid container spacing={5}>
          {displayedBooks.map((book) => (
            <Grid key={book._id} item xs={12} sm={7} md={3} lg={3} xl={2}>
              <BookCard
                key={book._id}
                image={book.image}
                title={book.title}
                _id={book._id}
                authors={book.authors}
                genres={book.genres}
                publisher={book.publisher}
                publishedDate={book.publishedDate}
                isbn={book.isbn}
                status={book.status}
              />
            </Grid>
          ))}
        </Grid>
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index + 1}
              variant="outlined"
              color={currentPage === index + 1 ? "primary" : "inherit"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      </CustomBox>
    </Box>
  );
};
