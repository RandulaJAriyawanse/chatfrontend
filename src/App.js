import "./App.css";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="chat-main fixed right-6 bottom-6 bg-base-100 shadow-xl rounded-2xl overflow-hidden">
      <div className="chat-outer">
        <Chat />
      </div>
    </div>
  );
}

export default App;
