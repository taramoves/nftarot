import { supabase } from './supabase';

export interface Card {
  card_id: string;
  deck_id: string;
  card_name: string;
  file_name: string;
  card_read_main: string;
}

export async function getRandomCard(deckId: string): Promise<Card | null> {
  try {
    // Fetch all cards for the given deck
    const { data, error } = await supabase
      .from('cards')
      .select('card_id, deck_id, card_name, file_name, card_read_main')
      .eq('deck_id', deckId);

    if (error) {
      console.error('Error fetching cards:', error);
      return null;
    }

    if (!data || data.length === 0) {
      console.error('No cards found for the deck');
      return null;
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * data.length);

    // Select the random card
    const randomCard = data[randomIndex];

    console.log('Fetched random card:', randomCard);

    return randomCard;
  } catch (error) {
    console.error('Error in getRandomCard:', error);
    return null;
  }
}