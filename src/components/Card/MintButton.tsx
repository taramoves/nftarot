// import React, { useState } from 'react';
// import { getRandomCard } from '../utils/cardUtils';
// import { supabase } from '../utils/supabase'; // Assume you have this set up
// import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// interface MintButtonProps {
//   deckId: string;
//   walletAddress: string; // Add this prop
// }

// export function MintButton({ deckId, walletAddress }: MintButtonProps) {
//   const [selectedCard, setSelectedCard] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const createReading = async (cardId: string) => {
//     const { data, error } = await supabase
//       .from('readings')
//       .insert([
//         {
//           reading_id: uuidv4(),
//           wallet_address: walletAddress,
//           deck_id: deckId,
//           card_id: cardId,
//           nft_id: uuidv4(), // Generate a unique NFT ID
//           created_at: new Date().toISOString(),
//         }
//       ]);

//     if (error) throw error;
//     return data;
//   };

//   const handleMintClick = async () => {
//     setIsLoading(true);
//     try {
//       const card = await getRandomCard(deckId);
//       if (card) {
//         setSelectedCard(card);
//         console.log('Selected card for minting:', card);
        
//         // Create reading in the database
//         await createReading(card.card_id);
        
//         // Here is where you would call your NFT minting function
//         // For now, we'll just log a message
//         console.log('NFT minted successfully!');
//       }
//     } catch (error) {
//       console.error('Error during minting process:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleMintClick} disabled={isLoading}>
//         {isLoading ? 'Minting...' : 'Mint Random Card'}
//       </button>
//       {selectedCard && (
//         <div>
//           <h3>Selected Card: {selectedCard.card_name}</h3>
//           <p>{selectedCard.card_read_main}</p>
//           {/* Display more card info as needed */}
//         </div>
//       )}
//     </div>
//   );
// }