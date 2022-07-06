import { EnterForm } from "./components/EnterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat } from "./components/Chat";
import { Context } from "./hooks/Context";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterForm />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}
export default App;
