import React from "react";
import ReactDOM from "react-dom";
import App from "./App";   

// Cargar variables de entorno desde el archivo .env
// dotenv.config();

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

// const theme = extendTheme({ colors });

ReactDOM.render(
<React.StrictMode>
 <App />
</React.StrictMode>,
document.getElementById('app')
);
