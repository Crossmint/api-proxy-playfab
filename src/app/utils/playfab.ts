import fetch from "node-fetch";

const PLAYFAB_API = `https://${process.env.PLAYFAB_ENDPOINT}/Server/AuthenticateSessionTicket`;
const PLAYFAB_SECRET = process.env.PLAYFAB_SECRET || "";

export default async function validateSessionWithPlayFab(
  sessionTicket: string
): Promise<any> {
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
      return {
        error: true,
        message: errorData.errorMessage
      }
    }

    const responseData: PlayFabAuthenticateSessionTicketResponse =
      await response.json();

    //console.log('responseData', responseData);

    return responseData;
  } catch (error) {
    console.error("Exception during session validation:", error);
    return {
      error: true,
      message: 'failed to authenticate session ticket'
    }
  }
}
