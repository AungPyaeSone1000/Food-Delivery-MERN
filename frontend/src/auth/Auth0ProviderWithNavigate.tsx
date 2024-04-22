import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0__CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0__AUDIENCE;

  if (!domain || !clientID || !redirectUri || !audience) {
    throw new Error("Unable to initialise Auth");
  }

  const onRedirectCallBack = () => {
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderWithNavigate;
