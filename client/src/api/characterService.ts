import { api } from ".";

/**
 * Manages character calls
 */
class CharacterService {
  async getCharacters(
    search: string,
    page: number
  ): Promise<Paginator<Character[]>> {
    const resp = await api.get("people", { params: { search, page } });
    return resp.data;
  }
  async getCharacterById(characterId: string): Promise<Character> {
    const resp = await api.get("people/" + characterId);
    return resp.data;
  }
}

export const characterService = new CharacterService();
