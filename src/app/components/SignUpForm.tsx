"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Slider } from "@nextui-org/react";
import { z } from "zod";
import { FormDataSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import GewichtSlider from "./signUp/GewichtSlider";
import GroeßeSlider from "./signUp/GroeßeSlider";
import GeschlechtSelection from "./signUp/GeschlechtSelection";
import PlanSelection from "./signUp/PlanSelection";
import BewegungSelection from "./signUp/BewegungSelection";
import React from "react";
import { EyeSlashFilledIcon } from "./signUp/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./signUp/EyeFilledIcon";
import { GrFormNext } from "react-icons/gr";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Meine Informationen",
    fields: ["Name", "Email", "Password"],
  },
  {
    id: "Step 2",
    name: "Mein Plan",
    fields: ["Geschlecht", "Gewicht", "Groeße", "Plan", "Zeit"],
  },
  { id: "Step 3", name: "Complete" },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const GrFormNextMirror = () => {
    return <GrFormNext style={{ transform: "scaleX(-1)" }} />;
  };

  return (
    <section className="absolute inset-0 flex flex-col justify-between p-24">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-primary-50 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-primary-50 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-primary-50 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-primary-50">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className="mt-12 py-6" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold text-center leading-7 text-white">
              Persönliche Informationen
            </h2>
            <p className="mt-1 mb-8 text-sm text-center leading-6 text-gray-600">
              Teile uns deine Informationen mit.
            </p>
            <div className="lg:grid lg:place-content-around lg:grid-col-2 lg:gap-4">
              <div className="sm:col-span-1 lg:col-span-2">
                <div className="mt-2">
                  <Input
                    type="text"
                    id="Name"
                    {...register("Name")}
                    color="success"
                    variant="bordered"
                    label="Name"
                    placeholder="Schreibe deinen Namen rein"
                  />
                  {errors.Name?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-2">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="deineMail@.com"
                    variant="bordered"
                    color={"success"}
                    id="email"
                    {...register("Email")}
                    autoComplete="email"
                  />
                  {errors.Email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1 lg:col-span-2">
                <div className="mt-2">
                  <Input
                    label="Passwort"
                    color="success"
                    variant="bordered"
                    id="Password"
                    {...register("Password")}
                    placeholder="Gebe dein Passwort ein"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="primary-50"
                  />
                  {errors.Password?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-2">
                  <Input
                    label="Passwort bestätigen"
                    color="success"
                    variant="bordered"
                    id="Password2"
                    {...register("Password2")}
                    placeholder="Bestätige dein Passwort ein"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="primary-50"
                  />
                  {errors.Password2?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Password2.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-white">
              Dein Plan
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
              Gebe an unter welchen Vorraussetzungen du starten möchtest.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:grid lg:place-content-center lg:grid-col-2 lg:gap-4">
              <div className="sm:col-span-3">
                <label
                  htmlFor="Geschlecht"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Geschlecht
                </label>
                <div className="mt-2 lg:col-span-2">
                  <GeschlechtSelection />
                  {errors.Geschlecht?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Geschlecht.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-2">
                  <GewichtSlider />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <div className="mt-2">
                  <GroeßeSlider />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <PlanSelection />
                </div>
              </div>
              <div className="mt-2">
                <BewegungSelection />
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <Button
              onClick={prev}
              disabled={currentStep === 0}
              className="bg-primary-100 text-primary-foreground"
              startContent={<GrFormNextMirror />}
            >
              Zurück
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="bg-primary-100 text-primary-foreground"
              endContent={<GrFormNext />}
            >
              Weiter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
