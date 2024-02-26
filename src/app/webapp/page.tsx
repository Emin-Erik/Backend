import WebPage from "./webAppDashboard/page";
import WebAppNavbarNew from "./webAppNavBar/webAppNavbar_new";

const WebApp = () => {
  return (
    <div
  className="bg-cover h-screen w-screen"
  style={{
    backgroundImage: 'url("https://wallpapercave.com/wp/wp8207303.jpg")',
  }}
>
  <WebAppNavbarNew />
  <WebPage />
  {/** Footer */}
  <div className="absolute bottom-0 left-0 right-0">
    <div className="mx-auto w-full max-w-screen-xl px-6">
    <div className="h-12 rounded-lg bg-black/25 drop-shadow-2xl flex items-center justify-center absolute bottom-0 left-0 right-0">
  © Axiom 2024
</div>

    </div>
  </div>
</div>

  );
};

export default WebApp;
