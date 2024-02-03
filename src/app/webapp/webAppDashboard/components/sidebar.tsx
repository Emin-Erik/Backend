import { Progress } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
export function Sidebar() {
  return (
    <div className={"pb-12"}>
      <div className="py-4 pt-10">
        <div
          className="px-3 py-2 border border-black rounded-lg bg-cover"
          style={{
            backgroundImage:
              'url("https://wallpapercave.com/wp/wp8207303.jpg")',
          }}
        >
          <div className="h-[25rem]">
            <div className="flex flex-col items-center gap-6 w-1/2 justify-start max-w-md  ml-4">
              <div className="px-4 ml-14 mt-4 w-48">
                <Progress
                  label="Kalorien:"
                  size="m"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md  border-default",
                    indicator: "bg-gradient-to-r from-green-800 to-red-400",
                    label: "tracking-wider font-medium text-white",
                  }}
                  value={4000}
                  maxValue={10000}
                  color="warning"
                  showValueLabel={true}
                  className="max-w-md"
                />
              </div>
              <div className="flex flex-col ml-16 w-52 mt-2">
                <Progress
                  size="sm"
                  label="Zucker"
                  color="warning"
                  aria-label="Loading..."
                  value={70}
                  className="mt-2"
                />
                <Progress
                  size="sm"
                  label="Salz"
                  color="warning"
                  aria-label="Loading..."
                  value={60}
                  className="mt-6"
                />
                <Progress
                  size="sm"
                  label="Fette"
                  color="danger"
                  aria-label="Loading..."
                  value={95}
                  className="mt-6"
                />
                <Progress
                  size="sm"
                  label="Kohlenhydrate"
                  color="success"
                  aria-label="Loading..."
                  value={40}
                  className="mt-6"
                />
                <Progress
                  size="sm"
                  label="Nährstoffe"
                  color="primary"
                  aria-label="Loading..."
                  value={10}
                  className="mt-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 border border-black rounded-lg bg-lime-950">
          <h2 className="relative mt-4 ml-4 text-lg font-semibold tracking-tight">
            Dein Plan
          </h2>
          <div className="h-[32.05rem] w-px-1 ">
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
