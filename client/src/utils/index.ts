export const redirect = (
  filmUrl: string,
  basePath: string,
  replaceKey: string,
  nav: (v: string) => void
) => {
  const id = filmUrl.match(/\d/g)?.join("");
  if (id) nav(basePath.replace(replaceKey, id));
};
