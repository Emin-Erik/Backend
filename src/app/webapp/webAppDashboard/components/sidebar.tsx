import { Progress } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
export function Sidebar() {
  return (
    <div className={"pb-12"}>
      <div className="py-4 pt-10">
        <div className="px-3 py-2 border border-black rounded-lg bg-lime-950">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Deine Werte
          </h2>
          <div className="h-[25rem]">
            <div className="flex flex-col items-center gap-6 w-1/2 justify-start max-w-md mt-4 ml-4">
              <Progress
                size="md"
                label="Kalorien"
                color="default"
                aria-label="Loading..."
                value={70}
              />
              <Progress
                size="sm"
                label="Zucker"
                color="primary"
                aria-label="Loading..."
                value={70}
              />
              <Progress
                size="sm"
                label="Salz"
                color="secondary"
                aria-label="Loading..."
                value={70}
              />
              <Progress
                size="sm"
                label="Kohlenhydrate"
                color="success"
                aria-label="Loading..."
                value={70}
              />
              <Progress
                size="sm"
                label="Protein"
                color="warning"
                aria-label="Loading..."
                value={70}
              />
              <Progress
                size="sm"
                label="Fett"
                color="danger"
                aria-label="Loading..."
                value={70}
              />
            </div>
          </div>
        </div>
        <div className="py-2 border border-black rounded-lg bg-lime-950">
          <h2 className="relative ml-4 text-lg font-semibold tracking-tight">
            Dein Plan
          </h2>
          <div className="h-[34rem] w-px-1 ">
            <div className="w-full flex flex-row flex-wrap gap-4 ml-2 mt-2">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px]"
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px]"
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px]"
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px]"
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px]"
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
