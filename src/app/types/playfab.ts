type PlayFabAuthenticateSessionTicketRequest = {
  SessionTicket: string;
};

type PlayFabAuthenticateSessionTicketResponse = {
  code: number;  // You can expand this based on PlayFab's actual response fields.
  // ... other fields
};

type PlayFabError = {
  code: number;
  status: string;
  error: string;
  errorCode: number;
  errorMessage: string;
  errorDetails?: { [key: string]: string[] };
};
