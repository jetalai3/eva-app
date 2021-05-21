const fetchResponse = async (url: string) => {
    const response = await fetch(url);
    if (response.ok) {
        const jsonValue = await response.json();
        return jsonValue;
    } else {
        throw new Error(`Failed to fetch url: ${url}`);
    };
};

export default fetchResponse;
