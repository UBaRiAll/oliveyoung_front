import { useState } from 'react';
import oliveyoung_logo from './assets/oliveyoung_logo.png';
import './App.css';

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [responseData, SetResponseData] = useState(null);

  const API_ENDPOINT = 'https://zrrqxyvg1e.execute-api.ap-northeast-2.amazonaws.com/back/api/buy';
  const KINESIS_API_ENDPOINT = 'https://zrrqxyvg1e.execute-api.ap-northeast-2.amazonaws.com/back/run_data_processing';

  const handlePurchase = (productNum) => {
    let data;
    switch (productNum) {
      case 1:
        data = {
          name: 'ADY',
          phone: '123-456-7890',
          address: '123 Main St, City, Country',
          price: 100,
          quantity: 1,
          item_id: "maskpack_24",
          item_name: "아누아 어성초 77 진정 마스크팩 10매",
        };
        break;
      case 2:
        data = {
          name: 'Jane Smith',
          phone: '444-555-6666',
          address: '456 Oak Ave, Townsville, Canada',
          price: 15,
          quantity: 2,
          item_id: "handcream_19",
          item_name: "닥터자르트 세라마이딘 크림",
        };
        break;
      case 3:
        data = {
          name: 'Alice Johnson',
          phone: '777-888-9999',
          address: '789 Pine St, Metropolis, UK',
          price: 20,
          quantity: 1,
          item_id: "lotion_63",
          item_name: "일리윤 세라마이드 아토 로션",
        };
        break;
      default:
        break;
    }

    console.log(JSON.stringify(data));

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

      // //키네시스에도 동일 정보 보내기
      fetch(KINESIS_API_ENDPOINT, {
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
          return response;
        })
        .then(data => {
          console.log('Kinesis POST OK', data);
          // 여기에서 필요한 경우 추가적인 작업 수행
        })
        .catch(error => {
          console.error('Kinesis Error:', error);
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
          setCount1(count1 + 1);
          handlePurchase(1);
        }}>
          마스크팩 구매 {count1}
        </button>
        <button onClick={() => {
          setCount2(count2 + 1);
          handlePurchase(2);
        }}>
          핸드크림 구매 {count2}
        </button>
        <button onClick={() => {
          setCount3(count3 + 1);
          handlePurchase(3);
        }}>
          로션 구매 {count3}
        </button>
        
      </div>
      <p>
          구매버튼을 눌러 api요청을 보내세요
        </p>
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
