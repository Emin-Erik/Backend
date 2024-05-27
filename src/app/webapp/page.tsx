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
  
</div>

  );
};

export default WebApp;
