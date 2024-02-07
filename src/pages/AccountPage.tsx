import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";

import { RootStateType } from "../redux/store";
import { returnBooks } from "../functions/forUser";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  currentUser,
  getUserProfile,
  isUserLoggedIn,
} from "../redux/reducers/authReducer";
import { BorrowedBookList } from "../components/user/BorrowedItemsList";

export const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const isLoggedIn: boolean = useAppSelector(isUserLoggedIn);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const accessToken = useAppSelector(
    (state: RootStateType) => state.auth.access_Token
  );

  // Redirect to the homepage if the user is not authenticated
  useEffect(() => {
    console.log("No access token found.");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSelectItem = (bookId: string) => {
    setSelectedItems((prevSelectedItems: string[]) => {
      if (prevSelectedItems.includes(bookId)) {
        return prevSelectedItems.filter((id) => id !== bookId);
      } else {
        return [...prevSelectedItems, bookId];
      }
    });
  };

  const handleReturnBooks = async () => {
    try {
      await returnBooks(user?._id, selectedItems, accessToken);
      alert("Returns are being processed. Please wait a moment...");
      await dispatch(getUserProfile());

      setSelectedItems([]);
    } catch (error) {
      console.error("Error returning books:", error);
    }
  };

  const handleBackHomePage = () => {
    navigate("/");
  };

  return (
    <Box
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        widows: "65vw",
        minWidth: "65vw",
      }}
    >
      <Container>
        <Grid
          item
          xs={12}
          sx={{
            marginBottom: 3,
            marginTop: 3,
            textAlign: { xs: "center", md: "left" },
            display: "flex",
            alignItems: "center",
            color: "#7a877d",
          }}
        >
          <Typography variant="h5" sx={{ marginRight: 1 }}>
            Your Books
          </Typography>
          <ChecklistRtlIcon fontSize="small" />
        </Grid>

        {user?.borrowedBooks && user.borrowedBooks.length > 0 ? (
          <Grid container spacing={1}>
            {/* List of Borrowed Books */}
            <Grid item xs={12} md={5}>
              <Typography
                variant="body1"
                color={"grey"}
                sx={{ marginBottom: { xs: 2, md: 2 } }}
              >
                Total borrowed Books: {user.borrowedBooks.length}
              </Typography>
              <Paper elevation={3}>
                <Container
                  style={{
                    maxHeight: "400px",
                    overflowY: "scroll",
                    maxWidth: "525px",
                  }}
                >
                  {user.borrowedBooks.map((book) => (
                    <BorrowedBookList
                      key={book._id}
                      book={book}
                      onSelect={handleSelectItem}
                    />
                  ))}
                </Container>
              </Paper>
            </Grid>

            {/* List of Return Books */}
            <Grid item xs={12} md={5} sx={{ marginTop: { xs: 2, md: 0 } }}>
              <Box
                borderLeft={{ xs: "none", md: "1px solid #a3c9ae" }}
                borderTop={{ xs: "1px solid #a3c9ae", md: "none" }}
                paddingLeft={{ xs: 0, md: 4 }}
                paddingRight={{ xs: 0, md: 4 }}
                marginBottom={{ xs: 2, md: 0 }}
                marginTop={{ xs: 2, md: 0 }}
              >
                <Typography
                  variant="body1"
                  color={"grey"}
                  sx={{
                    marginBottom: 3,
                    marginLeft: { xs: 0, md: 0 },
                    marginTop: { xs: 2, md: 0 },
                  }}
                >
                  Return List
                </Typography>
                <Paper elevation={3}>
                  <Container
                    style={{
                      maxHeight: "400px",
                      overflowY: "scroll",
                      maxWidth: "525px",
                    }}
                  >
                    {selectedItems.map((bookId) => {
                      const selectedBook = user?.borrowedBooks?.find(
                        (book) => book._id === bookId
                      );
                      if (selectedBook) {
                        return (
                          <BorrowedBookList
                            key={selectedBook._id}
                            book={selectedBook}
                          />
                        );
                      }
                      return null;
                    })}
                  </Container>

                  {/* Return Button */}
                  {selectedItems.length > 0 && (
                    <Box textAlign="center" marginTop={2} paddingBottom={5}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReturnBooks}
                      >
                        Return Selected Books
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" color={"grey"}>
            No borrowed books found.
          </Typography>
        )}

        {/* Bottom Section */}
        <Box textAlign="center" marginTop={4}>
          {/* Button to visit homepage */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBackHomePage}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
