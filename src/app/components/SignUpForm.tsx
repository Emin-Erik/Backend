"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Slider,
  SliderValue,
  Tooltip,
} from "@nextui-org/react";
import { z } from "zod";
import { FormDataSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { EyeSlashFilledIcon } from "./signUp_images/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./signUp_images/EyeFilledIcon";
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

  const plan = [
    {
      label: "Abnehmen",
      value: "Abnehmen",
      description: "The second most popular pet in the world",
    },
    {
      label: "Zunehmen",
      value: "Zunehmen",
      description: "The most popular pet in the world",
    },
    {
      label: "Gesunde Ernährung",
      value: "AnderGesunde Ernährunge",
      description: "The largest land animal",
    },
  ];

  const geschlechter = [
    {
      label: "Mann",
      value: "Mann",
      description: "The second most popular pet in the world",
    },
    {
      label: "Frau",
      value: "Frau",
      description: "The most popular pet in the world",
    },
    {
      label: "Andere",
      value: "Andere",
      description: "The largest land animal",
    },
  ];

  const [value, setValue] = React.useState<SliderValue>(100);
  const [weight, setWeight] = React.useState<string>("100");

  const handleChange = (newValue: SliderValue) => {
    if (isNaN(Number(newValue))) return;

    setValue(newValue);
    setWeight(newValue.toString());
  };

  const [value1, setValue1] = React.useState<SliderValue>(100);
  const [height, setHeight] = React.useState<string>("160");

  const handleChange1 = (newValue1: SliderValue) => {
    if (isNaN(Number(newValue1))) return;

    setValue1(newValue1);
    setHeight(newValue1.toString());
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
        {/* ------------------------------------------------ SEITE 2 ------------------------------------------------------------------------- */}
        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold text-center leading-7 text-white">
              Dein Plan
            </h2>
            <p className="mt-1 mb-8 text-sm text-center leading-6 text-gray-600">
              Gebe an unter welchen Vorraussetzungen du starten möchtest.
            </p>

            <div className="flex flex-col w-3/4 max-w-2xl mx-auto">
              <div className="sm:col-span-3">
                <div className="mt-2 flex justify-center items-center">
                  <Select
                    id="Geschlecht"
                    {...register("Geschlecht")}
                    isRequired
                    label="Dein Geschlecht"
                    placeholder="Wähle dein Geschlecht"
                    defaultSelectedKeys={["Mann"]}
                    className="max-w-lg"
                  >
                    {geschlechter.map((geschlecht) => (
                      <SelectItem
                        key={geschlecht.value}
                        value={geschlecht.value}
                      >
                        {geschlecht.label}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.Geschlecht?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Geschlecht.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-center items-center">
                <Select
                  id="Plan"
                  {...register("Plan")}
                  isRequired
                  label="Wähle deinen Plan"
                  placeholder="Dein Plan"
                  defaultSelectedKeys={["Abnehmen"]}
                  className="max-w-lg"
                >
                  {plan.map((plans) => (
                    <SelectItem key={plans.value} value={plans.value}>
                      {plans.label}
                    </SelectItem>
                  ))}
                </Select>
                {errors.Plan?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.Plan.message}
                  </p>
                )}
              </div>

              <div className="">
                <div className="mt-4 flex justify-center items-center">
                  <Slider
                    id="Gewicht"
                    {...register("Gewicht")}
                    label="Kilogrammgewicht"
                    size="sm"
                    step={1}
                    maxValue={200}
                    minValue={40}
                    color="success"
                    classNames={{
                      base: "max-w-lg",
                      label: "text-medium",
                    }}
                    // we extract the default children to render the input
                    renderValue={({ children, ...props }) => (
                      <output {...props}>
                        <Tooltip
                          className="text-tiny text-default-500 rounded-md"
                          content="Press Enter to confirm"
                          placement="left"
                        >
                          <input
                            className="px-1 py-0.5 w-14 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                            type="text"
                            aria-label="Kilogrammgewicht"
                            value={`${weight} kg`}
                            onChange={(event) => {
                              const value = event.target.value;
                              setWeight(value);
                            }}
                            onKeyDown={(event) => {
                              if (
                                event.key === "Enter" &&
                                !isNaN(Number(weight))
                              ) {
                                // Logik für Gewicht
                              }
                            }}
                          />
                        </Tooltip>
                      </output>
                    )}
                    value={value}
                    onChange={handleChange}
                  />
                  {errors.Gewicht?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Gewicht.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <div className="mt-4 flex justify-center items-center">
                  <Slider
                    id="Groeße"
                    {...register("Groeße")}
                    label="Körpergröße"
                    size="lg"
                    step={1}
                    maxValue={220}
                    minValue={120}
                    color="success"
                    classNames={{
                      base: "max-w-lg",
                      label: "text-medium",
                    }}
                    // we extract the default children to render the input
                    renderValue={({ children, ...props }) => (
                      <output {...props}>
                        <Tooltip
                          className="text-tiny text-default-500 rounded-md"
                          content="Gebe deine Größe in cm an"
                          placement="left"
                        >
                          <input
                            className="px-1 py-0.5 w-16 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                            type="text"
                            aria-label="Körpergröße"
                            value={`${height} cm`}
                            onChange={(event) => {
                              const value = event.target.value;
                              setHeight(value);
                            }}
                            onKeyDown={(event) => {
                              if (
                                event.key === "Enter" &&
                                !isNaN(Number(height))
                              ) {
                              }
                            }}
                          />
                        </Tooltip>
                      </output>
                    )}
                    value={value1}
                    onChange={handleChange1}
                  />
                  {errors.Groeße?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.Groeße.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-center items-center">
                <Slider
                  label="Wie oft treibst du Sport ?"
                  color="foreground"
                  size="lg"
                  step={1}
                  maxValue={7}
                  showSteps={true}
                  minValue={0}
                  marks={[
                    {
                      value: 1,
                      label: `kaum`,
                    },
                    {
                      value: 4,
                      label: `manchmal`,
                    },
                    {
                      value: 7,
                      label: `sehr oft`,
                    },
                  ]}
                  defaultValue={1}
                  className="max-w-lg"
                  id="Aktivitaet"
                  {...register("Aktivitaet")}
                  onChange={(value) => {
                    // Handle the value change here
                    console.log("Slider value changed:", value);
                  }}
                />
                {errors.Aktivitaet?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.Aktivitaet.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold text-center leading-7 text-white">
              Complete
            </h2>
            <p className="mt-1 mb-8 text-sm text-center leading-6 text-gray-600">
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
