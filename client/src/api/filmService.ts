import { api } from ".";

/**
 * Manages Films calls
 */
class FilmsService {
  async getFilms(): Promise<Paginator<Film[]>> {
    const resp = await api.get("films");
    return resp.data;
  }
}

export const filmsService = new FilmsService();
