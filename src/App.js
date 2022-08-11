import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

const App = () => {
  const fileRef = useRef();
  const [file, setFile] = useState();
  const [url] = useState(() => (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_API_DEV_SERVER_URL : process.env.REACT_APP_API_SERVER_URL);

  const showFile = async (e) => {
    e.preventDefault();
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    console.log(url);
  }, [url]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('gregFile', file);

    console.log(`${url}/upload`);

    fetch(`${url}/upload`, {
      method: 'post',
      body: formData,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.json();
        }
        else {
          throw new Error('Bad response!');
        }
      })
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App">
      <input ref={fileRef} type="file" onChange={(e) => showFile(e)} />
      <br />
      <button type="Submit" onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
  );
}

export default App;
