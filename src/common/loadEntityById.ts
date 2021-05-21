import fetchResponse from "./fetchResponse";

async function loadEntityById<T extends { id: number }>(url: string, id: number): Promise<T> {
    const inititalValue = await fetchResponse(url + id);
    return { ...inititalValue, id: id };
};

export default loadEntityById;
