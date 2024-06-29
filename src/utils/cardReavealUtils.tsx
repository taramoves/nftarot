import { getCardByIndex, Card as CardType } from "./cardUtils";

export async function fetchCardData(cardId: string): Promise<{
  cardData: CardType | null;
  error: string | null;
}> {
  if (typeof cardId !== "string") {
    console.error("cardId is not a string:", cardId);
    return { cardData: null, error: "Invalid card ID" };
  }

  try {
    console.log("Fetching card with ID:", cardId);
    const index = parseInt(cardId, 10);
    if (isNaN(index)) {
      console.error("cardId is not a valid number:", cardId);
      return { cardData: null, error: "Invalid card index" };
    }

    const deckId = "d8a4f60f-f3bf-44df-9218-7a10e4dfdf46";
    const card = await getCardByIndex(deckId, index);
    console.log("Fetched card:", card);

    if (card) {
      console.log("Image URL:", card.image_url);
      return { cardData: card, error: null };
    } else {
      console.error("No card found for index:", index);
      return { cardData: null, error: "Failed to fetch card data" };
    }
  } catch (err) {
    console.error("Error in fetchCard:", err);
    return {
      cardData: null,
      error: "An error occurred while fetching the card",
    };
  }
}
