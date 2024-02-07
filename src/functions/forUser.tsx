import axios, { AxiosResponse } from "axios";
import { BorrowBooksResponse } from "../types/Book";

export const updateUser = async (
  id: string | undefined,
  data: Record<string, any>,
  accessToken: string | null
) => {
  try {
    const response = await axios.put(
      `https://nodejs-server-thjulia.vercel.app/api/v1/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        // Missing input or Invalid input fields
        const errorMessage = error.response.data.message;
        console.error("Error updating new user:", errorMessage);
        alert(
          "Unexpected error occurs. Please fulfill & double-check your inputs."
        );
      } else {
        console.error("Unexpected error updating new user:", error.message);
        alert(
          "Unexpected error occurs. Please fulfill & double-check your inputs."
        );
      }
    } else {
      console.error("Unexpected error updating new user:", error);
      alert(
        "Unexpected error occurs. Please fulfill &  double-check your inputs."
      );
    }
  }
};

export const addUser = async (data: Record<string, any>) => {
  try {
    const response = await axios.post(
      `https://nodejs-server-thjulia.vercel.app/api/v1/auth/signup`,
      data
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        // The server returned a 400 status, indicating an existing email
        const errorMessage = error.response.data.message;
        console.error("Error creating new user:", errorMessage);
        alert(errorMessage);
      } else {
        console.error("Unexpected error creating new user:", error.message);
        alert(
          "Unexpected error occurs. Please fulfill & double-check your inputs."
        );
      }
    } else {
      console.error("Unexpected error creating new user:", error);
      alert(
        "Unexpected error occurs. Please fulfill & double-check your inputs."
      );
    }
  }
};

export const borrowBooks = async (
  id: string | undefined,
  data: string[],
  accessToken: string | null
): Promise<string[]> => {
  try {
    const response: AxiosResponse<BorrowBooksResponse> = await axios.post(
      `https://nodejs-server-thjulia.vercel.app/api/v1/users/${id}/borrow`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { status, data: responseData } = response.data;

    if (status === "success") {
      const borrowedBooks = responseData.borrowedBooks || [];

      return borrowedBooks;
    } else {
      console.error("Unexpected error when borrowing books:", response.data);
      alert("Unexpected error occurs. Please try again.");
      return []; // Only return an empty array in case of an error
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        console.error("Unexpected error when borrowing books:", errorMessage);
        alert("Unexpected error occurs. Please try again.");
      } else {
        console.error("Unexpected error when borrowing books:", error.message);
        alert("Unexpected error occurs. Please try again.");
      }
    } else {
      console.error("Unexpected error when borrowing books:", error);
      alert("Unexpected error occurs. Please try again.");
    }

    return [];
  }
};

export const returnBooks = async (
  id: string | undefined,
  data: string[],
  accessToken: string | null
): Promise<string[]> => {
  try {
    const response: AxiosResponse<BorrowBooksResponse> = await axios.post(
      `https://nodejs-server-thjulia.vercel.app/api/v1/users/${id}/return`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { status, data: responseData } = response.data;

    if (status === "success") {
      const borrowedBooks = responseData.borrowedBooks || [];

      return borrowedBooks;
    } else {
      console.error("Unexpected error when returning books:", response.data);
      alert("Unexpected error occurs. Please try again.");
      return []; // Only return an empty array in case of an error
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        console.error("Unexpected error when returning books:", errorMessage);
        alert("Unexpected error occurs. Please try again.");
      } else {
        console.error("Unexpected error when returning books:", error.message);
        alert("Unexpected error occurs. Please try again.");
      }
    } else {
      console.error("Unexpected error when returning books:", error);
      alert("Unexpected error occurs. Please try again.");
    }

    return [];
  }
};
