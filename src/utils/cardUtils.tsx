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

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomCard = data[randomIndex];

    console.log('Fetched random card:', randomCard);

    return randomCard;
  } catch (error) {
    console.error('Error in getRandomCard:', error);
    return null;
  }
}

export async function getCardById(cardId: string): Promise<Card | null> {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('card_id, deck_id, card_name, file_name, card_read_main')
      .eq('card_id', cardId)
      .single();

    if (error) {
      console.error('Error fetching card by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getCardById:', error);
    return null;
  }
}