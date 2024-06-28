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

export async function getCardByIndex(deckId: string, index: number): Promise<Card | null> {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('card_id, deck_id, card_name, image_url, card_read_main')
      .eq('deck_id', deckId)
      .eq('index', index)
      .single();

    if (error) {
      console.error('Error fetching card:', error);
      return null;
    }

    if (!data) {
      console.error('No card found at the specified index');
      return null;
    }

    // Construct the full image URL
    data.image_url = constructFullImageUrl(data.image_url);

    console.log('Fetched card:', data);

    return data;
  } catch (error) {
    console.error('Error in getCardByIndex:', error);
    return null;
  }
}

export function generateRandomIndex(): number {
  const minIndex = 0;
  const maxIndex = 5;
  return Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
}