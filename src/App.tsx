import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import { useState } from "react";

import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { ThemeContext } from "./contexts/ThemeContext";
import ThemeDisplay from "./components/ThemeDisplay";
import { AllProductsPage } from "./pages/AllProductsPage";
import { SingleProductPage } from "./pages/SingleProductPage";
import MaterialUISwitch from "./components/UISwitch";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import HeaderTop from "./components/headers/HeaderTop";
import { CartPage } from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { AccountPage } from "./pages/AccountPage";
import Contact from "./components/contact/Contact";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setIsDarkTheme) {
      setIsDarkTheme(event.target.checked);
    }
  };

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <ThemeDisplay>
          <CssBaseline />
          <HeaderTop />
          <Navbar />

          <main className="main-container">
            <Container sx={{ p: 0 }} maxWidth="lg">
              <MaterialUISwitch
                defaultChecked={isDarkTheme}
                onChange={handleSwitchChange}
              />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<AllProductsPage />} />
                <Route path="/books">
                  <Route path=":id" element={<SingleProductPage />} />
                </Route>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/users/borrowedBooks" element={<AccountPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Container>
          </main>

          <Footer />
        </ThemeDisplay>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};

export default App;
