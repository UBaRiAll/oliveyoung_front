import { useState } from 'react';
import oliveyoung_logo from './assets/oliveyoung_logo.png';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [responseData, SetResponseData] = useState(null);

  const API_ENDPOINT = 'https://zrrqxyvg1e.execute-api.ap-northeast-2.amazonaws.com/back/api/buy';

  const handlePurchase = () => {
    const data = {
      name: 'John Doe',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
      price: 100,
      quantity: 1
    };

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // 여기에서 필요한 경우 추가적인 작업 수행
        SetResponseData(data)
      })
      .catch(error => {
        console.error('Error:', error);
        // 에러 처리 로직 추가
      });
  };

  return (
    <>
      <div>
        <img src={oliveyoung_logo} className="logo oliveyoung" alt="Oliveyoung logo" />
      </div>
      <h1>올리브영</h1>
      <div className="card">
        <button onClick={() => {
          setCount(count + 1);
          handlePurchase();
        }}>
          구매 {count}
        </button>
        <p>
          구매버튼을 눌러 api요청을 보내세요
        </p>
      </div>
      <div className='card'>
        {responseData && (
          <div>
            <p>구매가 완료되었습니다.</p>
            <p>주문번호: {responseData.idx}</p>
            <p>이름: {responseData.name}</p>
            <p>전화번호: {responseData.phone}</p>
            <p>주소: {responseData.address}</p>
            <p>가격: {responseData.price}</p>
            <p>수량: {responseData.quantity}</p>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Cloudwave Ubariall
      </p>
    </>
  );
}

export default App;
