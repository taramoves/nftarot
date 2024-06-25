import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

interface Deck {
  deck_id: string;
  deck_name: string;
  description: string;
}

export default function DeckList() {
  const [deck, setDeck] = useState<Deck | null>(null);

  useEffect(() => {
    async function fetchDeck() {
      const { data, error } = await supabase
        .from('decks')
        .select('deck_id, deck_name, description')
        .eq('deck_id', 'd8a4f60f-f3bf-44df-9218-7a10e4dfdf46')
        .single();

      if (error) {
        console.error('Error fetching deck:', error);
      } else {
        setDeck(data);
        console.log('Fetched deck:', data);
      }
    }

    fetchDeck();
  }, []);

  return null; // This component doesn't render anything
}