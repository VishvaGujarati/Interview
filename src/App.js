import "./App.css";
import RoutData from "./router/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RoutData />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "text-[14px]",
          style: {
            background: "#313049",
            color: "#FFFFFF",
          },
        }}
      />
    </>
  );
}

export default App;
