import { createBrowserRouter } from "react-router-dom";

import FilmsList from "../pages/film/list";
import ErrorPage from "../pages/error";
import CharactersPage from "../pages/character/list";
import CharacterPage from "../pages/character";
import FilmPage from "../pages/film";
import { PathsEnum } from "../utils/enums";

const router = createBrowserRouter([
  {
    path: PathsEnum.home,
    element: <FilmsList />,
    errorElement: <ErrorPage />,
  },
  {
    path: PathsEnum.film,
    element: <FilmPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PathsEnum.characters,
    element: <CharactersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PathsEnum.character,
    element: <CharacterPage />,
    errorElement: <ErrorPage />,
  },
]);

export { router };
