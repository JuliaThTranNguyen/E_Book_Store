import axios from "axios";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { RootStateType } from "../redux/store";
import { getUserProfile } from "../redux/reducers/authReducer";
import { clearCart, removeFromCart } from "../redux/reducers/cartReducer";
import { DisplayItems } from "../components/cart/DisplayItems";
import CheckoutModal from "../components/cart/CheckoutModal";
import { borrowBooks } from "../functions/forUser";

export const CartPage = () => {
  const cart = useAppSelector((state: RootStateType) => state.cart);
  const user = useAppSelector((state: RootStateType) => state.auth);
  const accessToken = useAppSelector(
    (state: RootStateType) => state.auth.access_Token
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resetSelectedItems = () => {
    setSelectedItems([]);
  };

  useEffect(() => {
    resetSelectedItems();
  }, [cart]);

  /*HANDLE SELECTED OPTION FOR EACH ITEM IN CART */
  // Retrieve selected items from localStorage
  const storedSelectedItems = localStorage.getItem("selectedItems");
  const initialSelectedItems: number[] = storedSelectedItems
    ? JSON.parse(storedSelectedItems)
    : [];
  const [selectedItems, setSelectedItems] =
    useState<number[]>(initialSelectedItems);

  const handleSelectItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const removeFromCartAndUpdate = (itemId: string, index: number) => {
    dispatch(removeFromCart(itemId));

    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = prevSelectedItems.map((itemIndex) =>
        itemIndex > index ? itemIndex - 1 : itemIndex
      );

      return updatedSelectedItems.filter((item) => item !== index);
    });
  };

  const getTotalSelectedItems = () => {
    return selectedItems.length;
  };

  // Save selected items to localStorage when the component unmounts
  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  /*HANDLE CHECKING OUT - CHECKOUT MODAL */
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleOpenCheckoutModal = () => {
    if (getTotalSelectedItems() === 0) {
      alert("Error: No items selected for checkout");
      return;
    }
    setCheckoutModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setCheckoutModalOpen(false);
  };

  const handleProceedToCheckout = async () => {
    if (getTotalSelectedItems() === 0) {
      alert("Error: No items selected for checkout");
      return;
    }

    try {
      const bookIdsToBorrow = selectedItems.map((index) => cart[index]._id);
      await borrowBooks(user?.user?._id, bookIdsToBorrow, accessToken);

      dispatch(clearCart());
      await dispatch(getUserProfile());
      navigate("/users/borrowedBooks");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.message;
          console.error("Unexpected error when borrowing books:", errorMessage);
          alert("Unexpected error occurs. Please try again.");
        } else {
          console.error(
            "Unexpected error when borrowing books:",
            error.message
          );
          alert("Unexpected error occurs. Please try again.");
        }
      } else {
        console.error("Unexpected error when borrowing books:", error);
        alert("Unexpected error occurs. Please try again.");
      }
    }
  };

  const handleRemoveFromCheckout = (index: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item !== index)
    );

    if (selectedItems.length === 1) {
      handleCloseCheckoutModal();
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
      }}
    >
      <Container>
        {/* Top Section */}
        <Box textAlign="center" color={"grey"} marginBottom={4}>
          <ShoppingCartIcon fontSize="large" />
          <Typography variant="h5">Welcome to the Cart Page</Typography>
        </Box>

        {/* Main Section */}
        <Grid container spacing={4}>
          {/* Display Items Section */}
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h6" color={"grey"}>
                Your Cart
              </Typography>
              <Box sx={{ overflowY: "auto", maxHeight: "400px" }}>
                {cart.map((cartItem, index) => (
                  <DisplayItems
                    book={cartItem}
                    key={cartItem._id}
                    isCartEmpty={false}
                    selected={selectedItems.includes(index)}
                    onSelect={() => handleSelectItem(index)}
                    onRemove={() =>
                      removeFromCartAndUpdate(String(cartItem._id), index)
                    }
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Checkout Section */}
          <Grid item xs={12} md={4}>
            <Box
              borderLeft={{ xs: "none", md: "1px solid #a3c9ae" }}
              borderTop={{ xs: "1px solid #a3c9ae", md: "none" }}
              paddingLeft={{ xs: 1, md: 3 }}
              paddingRight={{ xs: 1, md: 0 }}
              marginBottom={{ xs: 2, md: 0 }}
              marginTop={{ xs: 2, md: 0 }}
            >
              {/* Checkout Box */}
              <Box
                color={"grey"}
                marginBottom={{ xs: 2, md: 2 }}
                marginTop={{ xs: 2, md: 2 }}
                onClick={() => getTotalSelectedItems()}
              >
                <Typography variant="h6">Checkout</Typography>
                <Typography variant="subtitle1">
                  Total Items: {getTotalSelectedItems()}
                </Typography>
              </Box>
              {/* Checkout Button */}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenCheckoutModal}
                fullWidth={true} // Make the button take full width on smartphones
              >
                Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box textAlign="center" marginTop={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBackHomePage}
          >
            Continue Shopping
          </Button>
        </Box>

        {/* Render the CheckoutModal */}
        <CheckoutModal
          open={isCheckoutModalOpen}
          onClose={handleCloseCheckoutModal}
          onProceed={handleProceedToCheckout}
          selectedItems={cart.filter((_, index) =>
            selectedItems.includes(index)
          )}
          onRemove={handleRemoveFromCheckout}
        />
      </Container>
    </Box>
  );
};
