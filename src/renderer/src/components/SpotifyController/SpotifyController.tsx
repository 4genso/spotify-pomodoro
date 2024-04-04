import { useState, useEffect } from "react";
import {
  AuthorizationCodeWithPKCEStrategy,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";

const clientId: string = import.meta.env["RENDERER_VITE_CLIENT_ID"]!;
const redirectUrl: string = import.meta.env["RENDERER_VITE_REDIRECT_URL"]!;
const scope: string[] = [
  "app-remote-control",
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
];

function SpotifyController({ isPlaying, isFocus }): JSX.Element {
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);

  useEffect(() => {
    handleLogin();
  }, []);

  useEffect(() => {
    if (sdk) {
      getDeviceID().then((deviceID) => {
        console.log(deviceID);
        if (isPlaying && isFocus) {
          sdk!.player.startResumePlayback(deviceID);
        } else {
          sdk!.player.pausePlayback(deviceID);
        }
      });
    }
  }, [isPlaying, isFocus]);

  function getActiveDeviceID(devices): string {
    return devices.find((device) => {
      return device.is_active === true;
    }).id;
  }

  async function getDeviceID(): Promise<string> {
    const devices = await sdk!.player.getAvailableDevices();
    return getActiveDeviceID(devices.devices);
  }

  async function handleLogin() {
    const auth = new AuthorizationCodeWithPKCEStrategy(
      clientId,
      redirectUrl,
      scope,
    );
    const newSdk = new SpotifyApi(auth);

    const { authenticated } = await newSdk.authenticate();

    if (authenticated) {
      setSdk(() => newSdk);
    }
  }

  function handleLogout() {
    if (sdk) {
      sdk.logOut();
      localStorage.clear();
      setSdk(null);
    }
  }

  return (
    <>
      <button
        className="text-xs bg-transparent hover:bg-green text-white py-2 px-4 rounded"
        onClick={sdk ? handleLogout : handleLogin}
      >
        {sdk ? "Logout" : "Login"}
      </button>
    </>
  );
}

export default SpotifyController;
