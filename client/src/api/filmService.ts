import { api } from ".";

/**
 * Manages Films calls
 */
class FilmsService {
  async getFilms(search: string): Promise<Paginator<Film[]>> {
    const resp = await api.get("films", { params: { search } });
    return resp.data;
  }
  async getFilmById(filmId: string): Promise<Film> {
    const resp = await api.get("films/" + filmId);
    return resp.data;
  }
}

export const filmsService = new FilmsService();
