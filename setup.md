# How to create a E-Commerce Application using Raact,Typescript, Redux Toolkit, RTK Query, Material UI.
-------------------------------------------------------
## Step 1: Create a New TypeScript App with Redux Template
```
npx create-react-app my-app --template redux-typescript
```
</br>
Replace my-app with your desired project name.

## Step 2: Install Material-UI, SASS, and RTK Query Dependencies

```
cd my-app
```
</br>
Install Material-UI, SASS, and RTK Query dependencies:
```
npm install @mui/material @emotion/react @emotion/styled sass @reduxjs/toolkit react-query
```
</br>

## Step 3: Set Up Material-UI Theme and Styles

You can create a custom Material-UI theme in a separate file, e.g., theme.ts.
```
// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Customize your theme here
});

export default theme;
```
</br>

## Step 4: Configure SASS for Styling

Create a SASS file, e.g., styles.scss, for your global styles. Import this file in your main TypeScript file (usually index.tsx or App.tsx) to apply the styles globally.
```
/* src/styles.scss */
body {
  font-family: 'Roboto', sans-serif;
  // Add your global styles 
}
```
</br>
Import the SASS file in your index.tsx or App.tsx:
```
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss'; // Import your SASS file
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

``
</br>

## Step 5: Set Up RTK Query

Create an API service using RTK Query. You can define your endpoints, queries, and mutations in a separate file, e.g., api.ts.
```
// src/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Replace '/api' with your API base URL
  endpoints: (builder) => ({
    // Define your endpoints here
  }),
});

export const { useGetQuery } = api;
```
</br>

## Step 6: Use RTK Query Hooks in Components

Now, you can use the generated hooks from RTK Query in your components to fetch data from your API.

```
// src/components/ExampleComponent.tsx
import React from 'react';
import { useGetQuery } from '../api';

const ExampleComponent = () => {
  const { data, isLoading, isError } = useGetQuery('exampleEndpoint');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return <div>{data}</div>;
};

export default ExampleComponent;
```
</br>

## Step 7: Start the Development Server

Start your development server:

```
npm start
```
</br>

## Step 8: Start the Deployment Server

Complete the final testing on your local machine 
```
npm test
```

Fix all of the nescessary requirements, test cases. REady to launch the final product.
[Visit the Vercel website for more information regarding publishing a React app using the Vercel server.](https://vercel.com/guides/deploying-react-with-vercel)