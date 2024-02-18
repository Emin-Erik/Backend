import WebPage from "./webAppDashboard/page";
import WebAppNavbar from "./webAppNavBar/WebAppNavbar";

const WebApp = () => {
  return (
    <div
      className="bg-cover"
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp8207303.jpg")',
      }}
    >
      <WebAppNavbar />
      <WebPage />
    </div>
  );
};

export default WebApp;
