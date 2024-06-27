import { supabase } from './supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export interface Card {
  card_id: string;
  deck_id: string;
  card_name: string;
  image_url: string;
  card_read_main: string;
}

function constructFullImageUrl(partialUrl: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${partialUrl}`;
}

export async function getRandomCard(deckId: string): Promise<Card | null> {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('card_id, deck_id, card_name, image_url, card_read_main')
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

    // Construct the full image URL
    randomCard.image_url = constructFullImageUrl(randomCard.image_url);

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
      .select('card_id, deck_id, card_name, image_url, card_read_main')
      .eq('card_id', cardId)
      .single();

    if (error) {
      console.error('Error fetching card by ID:', error);
      return null;
    }

    if (data) {
      // Construct the full image URL
      data.image_url = constructFullImageUrl(data.image_url);
    }

    return data;
  } catch (error) {
    console.error('Error in getCardById:', error);
    return null;
  }
}