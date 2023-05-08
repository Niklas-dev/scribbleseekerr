"use client";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import GoogleButton from "react-google-button";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      loginGoogle(tokenResponse.access_token);
    },
  });

  const login = () => {
    fetch("http://127.0.0.1:8000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: userName,
        password: password,
        grant_type: "password",
        client_id: "7p1Mb54OHl4baJ5KfTAUEp4atqKiInvn8lkRLYSo",
        client_secret:
          "0uNhvxXietC3P7SbfylnVkwGqLh00Sg0Uo57R0xHAC5NB9jeID3STCbOisT5mVsgFUrUeFq90aOgjut9xLUhxfTYPqvPstxT0bIhDlniyZc8X7IFNorBTrmZIIx28UZi",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error;
        }
      })
      .then((data) => {
        localStorage.setItem("refresh_token", data["refresh_token"]);
        localStorage.setItem("access_token", data["access_token"]);
        console.table(data);
      });
  };

  const loginGoogle = (key: string) => {
    fetch("http://127.0.0.1:8000/auth/convert-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: key,
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_id: "7p1Mb54OHl4baJ5KfTAUEp4atqKiInvn8lkRLYSo",
        client_secret:
          "0uNhvxXietC3P7SbfylnVkwGqLh00Sg0Uo57R0xHAC5NB9jeID3STCbOisT5mVsgFUrUeFq90aOgjut9xLUhxfTYPqvPstxT0bIhDlniyZc8X7IFNorBTrmZIIx28UZi",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error;
        }
      })
      .then((data) => {
        localStorage.setItem("refresh_token", data["refresh_token"]);
        localStorage.setItem("access_token", data["access_token"]);
        console.table(data);
      });
  };

  const fetchTest = () => {
    fetch("http://127.0.0.1:8000/users/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error;
        }
      })
      .then((data) => {
        localStorage.setItem("refresh_token", data["refresh_token"]);
        localStorage.setItem("access_token", data["access_token"]);
        console.table(data);
      });
  };

  const responseMessage = (response: any) => {
    console.log(response);

    loginGoogle(response.credential);
  };
  const errorMessage = () => {
    console.log("error");
  };
  return <main className="p-4"></main>;
}
