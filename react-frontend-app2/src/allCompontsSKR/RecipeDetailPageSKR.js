import React from 'react';

const recipeSKRDetailPageSKR = ({ recipeSKR }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' ,  }} >
      {/* Display recipeSKR details */}
      <h1 style={{ textAlign: 'center',backgroundColor: '#1890ff', padding: '20px 0' }}>{recipeSKR.label}</h1>
      <img src={recipeSKR.image} alt={recipeSKR.label} style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }} />
      <p style={{ textAlign: 'center', marginTop: '10px', marginBottom: '5px' }}>Source: {recipeSKR.source}</p>
      <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '5px' }}>Ingredients:</p>
      {/* Check if ingredients exist before mapping over them */}
      {recipeSKR.ingredients && recipeSKR.ingredients.length > 0 ? (
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          {recipeSKR.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients found</p>
      )}
    </div>
  );
};

export default recipeSKRDetailPageSKR;
