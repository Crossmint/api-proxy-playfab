const crossmintBaseUrl = process.env.CROSSMINT_API_URL;

const crossmintAPIHeaders = {
  "accept": "application/json",
  "content-type": "application/json",
  "x-client-secret": process.env.CROSSMINT_CLIENT_SECRET!,
  "x-project-id": process.env.CROSSMINT_PROJECT_ID!,
};

const callCrossmintAPI = async (endpoint: string, options: { method: "POST", body: any }) => {
  const url = `${crossmintBaseUrl}/${endpoint}`;
  const { body, method } = options;
  const response = await fetch(url, {
    body: JSON.stringify(body),
    method,
    headers: crossmintAPIHeaders
  });
  const json = await response.json();
  return json;
};

export { callCrossmintAPI };
