import api from ".";

export const getDataForPath = async (url: string) => {
  if (!url) throw new Error("provide url");
  try {
    // axios provides an object which include data key. The json which has been sent from backend will be inside the data key.
    const resp = await api?.get(url);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};
