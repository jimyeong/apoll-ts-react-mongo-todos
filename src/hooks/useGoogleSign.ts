import { useEffect, useState } from "react";

export function useGoogleSignIn() {
  const [accessToken, setAccessToken] = useState<null | string>();
  const [error, setError] = useState({ error: false, message: "" });
  function handleCredentialResponse(response: {
    error?: string;
    credential?: string;
  }) {
    if (response.error) {
      // Handle errors (e.g., user cancellation, network issues)
      console.error("Error signing in:", response.error);
      setError({ error: true, message: response.error });
    } else {
      console.log("@@response", response);
      setAccessToken(response.credential);
    }
  }
  useEffect(() => {
    // @ts-ignore comment
    google.accounts.id.initialize({
      client_id:
        "974453546502-1f3bglv0mh3aj0cnop61ui2l6qbnjddb.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    // @ts-ignore comment
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", ux_mode: "redirect" } // customization attributes
    );
    // @ts-ignore comment
    google.accounts.id.prompt();

    return () => {};
  }, []);
  return { accessToken, error };
}
