import heroApi from "../api/hero.api";

const getHeroesByPage = async () => {
  const { data } = await heroApi.get("/");

  return data;
};

export default getHeroesByPage;
