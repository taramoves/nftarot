import { supabase } from './supabase';

export async function uploadImageToSupabase(file: File, deckId: string): Promise<string> {
  const filePath = `${deckId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from('card-images')  // Replace with your bucket name
    .upload(filePath, file);

  if (error) throw error;
  return data.path;
}

export function getSupabaseImageUrl(filePath: string): string {
  const { data } = supabase.storage
    .from('card-images')  // Replace with your bucket name
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}