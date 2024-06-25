import React, { useState } from 'react';
import { getRandomCard } from '../utils/cardUtils';

interface MintButtonProps {
  deckId: string;
}

export function MintButton({ deckId }: MintButtonProps) {
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const handleMintClick = async () => {
    const card = await getRandomCard(deckId);
    if (card) {
      setSelectedCard(card);
      console.log('Selected card for minting:', card);
      // Here is where you would call your minting function
    }
  };

  
  return (
    <div>
      <button onClick={handleMintClick}>Mint Random Card</button>
      {selectedCard && (
        <div>
          <h3>Selected Card: {selectedCard.card_name}</h3>
          <p>{selectedCard.card_read_main}</p>
          {/* Display more card info as needed */}
        </div>
      )}
    </div>
  );
}