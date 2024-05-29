import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "./SearchForm";

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>Search</h1>
    </header>
    <main>
      <SearchForm />
    </main>
  </div>
);

export default App;
