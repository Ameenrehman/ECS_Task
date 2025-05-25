import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Button } from 'antd';
import RecipeDetailPageSKR from './RecipeDetailPageSKR';

const { Meta } = Card;

const RecipeExplorerSKR = () => {
  const [searchQuerySKR, setSearchQuerySKR] = useState('');
  const [recipesSKR, setRecipesSKR] = useState([]);
  const [selectedRecipeSKR, setSelectedRecipeSKR] = useState(null);
  
  // Define API credentials as constants
  const APP_ID_SKR = 'bc18c00e';
  const APP_KEY_SKR = '0e587224e152f47ddaf723ab207c4443';

  // Function to handle recipe search
  const handleSearchSKR = async () => {
    try {
      const response = await axios.get(`https://api.edamam.com/search?q=${searchQuerySKR}&app_id=${APP_ID_SKR}&app_key=${APP_KEY_SKR}`);
      setRecipesSKR(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Function to handle viewing recipe details
  const handleViewDetailsSKR = (recipe) => {
    setSelectedRecipeSKR(recipe.recipe);
  };

  // Function to handle going back to recipe explorer
  const handleGoBackSKR = () => {
    setSelectedRecipeSKR(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Search Input and Button */}
      {!selectedRecipeSKR && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Input
            placeholder="Search for recipes"
            value={searchQuerySKR}
            onChange={(e) => setSearchQuerySKR(e.target.value)}
            style={{ width: '300px', marginRight: '10px' }}
          />
          <Button type="primary" onClick={handleSearchSKR}>Search</Button>
        </div>
      )}

      {/* Display Recipe Cards or Recipe Detail Page */}
      {selectedRecipeSKR ? (
        <RecipeDetailPageSKR recipeSKR={selectedRecipeSKR} onGoBack={handleGoBackSKR} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {recipesSKR.map(recipe => (
            <Card
              key={recipe.recipe.uri}
              hoverable
              style={{ width: 240, margin: '10px' }}
              cover={<img alt={recipe.recipe.label} src={recipe.recipe.image} />}
            >
              <Meta title={recipe.recipe.label} description={recipe.recipe.source} />
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button type="primary" onClick={() => handleViewDetailsSKR(recipe)}>View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeExplorerSKR;
