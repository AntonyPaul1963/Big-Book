import { useEffect } from "react";
import Chat from "../../Components/Chatting/chat/Chat";
import Detail from "../Chatting/detail/Detail";
import List from "../Chatting/list/List";
import Notification from "../Chatting/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { useUserStore } from "../../Firebase/userStore";
import { useChatStore } from "../../Firebase/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  return (
    <div className="container">
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      <Notification />
    </div>
  );
};

export default App;