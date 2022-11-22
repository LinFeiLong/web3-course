import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // On comment le StrictMode pour pouvoir faire des console.log
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
