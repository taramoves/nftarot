import { supabase } from './supabase';

interface Card {
  card_id: string;
  card_name: string;
  card_read_main: string;
  image_url: string;
  // Add any other fields your cards table has
}

export async function getRandomCard(deckId: string): Promise<Card | null> {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('card_id, card_name, card_read_main, file_name')
      .eq('deck_id', deckId)
      //.order('RANDOM()')
      .limit(1)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching random card:', error);
    return null;
  }
}