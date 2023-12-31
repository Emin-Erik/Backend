"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Lottie from "lottie-react";
import animation from "@/app/components/signUp_images/animation_404.json";

const NotFound = () => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="max-w-2xl mx-auto text-center lg:mt-32">
        <h2 className="mt-10 text-2xl font-semibold text-center leading-relaxed text-white">
          Entschuldigung, die Seite konnte nicht gefunden werden.
        </h2>
        <Lottie animationData={animation} style={style} loop={false} />
        <p className="mt-5 mb-8 text-md text-center leading-relaxed text-gray-500">
          Die angeforderte Seite existiert nicht oder wurde verschoben. Bitte
          verwenden Sie den untenstehenden Button, um zur Startseite
          zurückzukehren.
        </p>
        <Link href={"/"}>
          <Button color="primary">Bring mich zurück</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
