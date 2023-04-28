import { api } from ".";

/**
 * Manages character calls
 */
class CharacterService {
  async getCharacters(): Promise<Paginator<Character[]>> {
    const resp = await api.get("people");
    return resp.data;
  }
  async getCharacterById(characterId: string): Promise<Character> {
    const resp = await api.get("people/" + characterId);
    return resp.data;
  }
}

export const characterService = new CharacterService();
