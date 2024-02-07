import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CartItem } from "../../types/Cart";
import { DisplayItems } from "./DisplayItems";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
  onRemove: (index: number) => void;
  selectedItems: CartItem[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  onClose,
  onProceed,
  onRemove,
  selectedItems,
}) => {
  return (
    <Box
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "65vw",
      }}
    >
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Checkout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to loan these {selectedItems.length} book(s)?
          </DialogContentText>
          {/* Display selected items */}
          {selectedItems.map((cartItem, index) => (
            <DisplayItems
              key={cartItem._id}
              book={cartItem}
              selected={true}
              onSelect={() => {}}
              onRemove={() => onRemove(index)}
              isCartEmpty={false}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onProceed} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckoutModal;
