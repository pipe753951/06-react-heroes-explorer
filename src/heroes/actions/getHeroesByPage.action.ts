import heroApi from "../api/hero.api";

const getHeroesByPage = async () => {
  const { data } = await heroApi.get("/");

  console.log({ data });

  return data;
};

export default getHeroesByPage;
