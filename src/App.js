import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Recipe from "./Recipe";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

export default function App() {
  const YOUR_APP_ID = "20ff102f";
  const YOUR_APP_KEY = "8ede286cb731691585f3356f763bb02b";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipe();
  }, [query]);
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value)
  };
  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      <Paper
        onSubmit={updateQuery}
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          margin: "10px auto",
          alignItems: "center",
          width: 400
        }}
      >
        <InputBase
          type="text"
          value={search}
          onChange={updateSearch}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for Recipe"
          inputProps={{ "aria-label": "search for Recipe" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* <form onSubmit={updateQuery}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">Search</button>
      </form> */}
      <Grid container>
        {recipes.map((recipe) => (
          <Grid item xs={3}>
            <Recipe
              key={recipe.recipe.lable}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
