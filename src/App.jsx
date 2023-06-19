import { useEffect, useState } from 'react';
import './App.css';
import Message from './components/Message';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [sort, setSort] = useState();
  const [loader, setLoader] = useState(false);
  let lastId = 0;

  //--------------------------Функции---------------------------

  const sortDateUp = (a, b) => {
    console.log(0);
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  };

  const sortDateDown = (a, b) => {
    console.log(1);
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  };

  const sortDate = () => {
    setLoader(true);
    setMessages((setState) => setState.sort(sort === 0 ? sortDateUp : sortDateDown));
    setLoader(false);
  }

  const fetchMessages = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post('http://a0830433.xsph.ru/', {
        actionName: 'MessagesLoad',
        messageId: 0,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { Messages } = data;
      const id = Messages[Messages.length - 1].id;
      lastId = id;
      setMessages(Messages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const fetchNewMessage = async () => {
    try {
      const response = await axios.post('http://a0830433.xsph.ru/', {
        actionName: 'MessagesLoad',
        messageId: lastId,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { Messages } = response.data;
      const data = Messages[0];
      const id = data.id;
      if (data) {
        setMessages((prevState) => [...prevState, data]);
        lastId = id;
        console.log(1);
      } else {
        lastId = id + 1;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  //--------------------------Запросы--------------------------- 

  useEffect(() => {
    if (!localStorage.getItem('ids')) {
      localStorage.setItem('ids', JSON.stringify([]));
    }

    if (messages.length === 0) {
      fetchMessages()
    }

    sortDate()

    const interval = setInterval(() => {
      fetchNewMessage();
    }, 5000);
    return () => clearInterval(interval);
  }, [sort]);

  let messagesBlock = messages.map((item, index) => <Message key={index} message={item} />);
  // С id`шниками выводит ошибки поэтому использую index

  return (
    <>
      <div className="App">
        <div style={{ marginLeft: 309, marginBottom: 20 }}>
          <button onClick={() => setSort(0)}>По возростанию</button>
          <button onClick={() => setSort(1)}>По убыванию</button>
        </div>
        {loader ? <>loading</> : messagesBlock}
      </div>
    </>
  );
}

export default App;
