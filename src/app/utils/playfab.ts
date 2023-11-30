import fetch from "node-fetch";

const PLAYFAB_API = `https://${process.env.PLAYFAB_ENDPOINT}/Server/AuthenticateSessionTicket`;
const PLAYFAB_SECRET = process.env.PLAYFAB_SECRET || "";

export default async function validateSessionWithPlayFab(
  sessionTicket: string
): Promise<boolean> {
  const requestPayload: PlayFabAuthenticateSessionTicketRequest = {
    SessionTicket: sessionTicket,
  };

  try {
    const response = await fetch(PLAYFAB_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SecretKey": PLAYFAB_SECRET, // Ensure this is securely stored, not hard-coded.
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorData: PlayFabError = await response.json();
      console.error("Error validating session ticket:", errorData.errorMessage);
      return false;
    }

    const responseData: PlayFabAuthenticateSessionTicketResponse =
      await response.json();

    console.log(responseData);

    // Adjust based on the actual success criteria from PlayFab's response.
    return responseData.code === 200;
  } catch (error) {
    console.error("Exception during session validation:", error);
    return false;
  }
}
