import React from 'react';
import styles from './LifeCycle.module.css';
import { ReactComponent as Spinner } from 'assets/atom-spinner.svg';

export const API_ENDPOINT = 'https://randomuser.me/api/?results=5';

export class LifeCycle extends React.Component {
  /* 
  클래스 필드 ------------------------------------------------------------------- */

  // this.clearId
  clearId = -1;

  /* 
  render 단계 ---------------------------------------------------------------- */

  state = {
    // 로딩 중인가요? (데이터 패치 요청????)
    isLoading: false,
    // 통신 결과가 도착했나요? (데이터???)
    data: [], // null
    // 오류는 어떤 정보(상태 코드, 메시지)를 가지고 있나요?
    error: null,
    // 혹시 오류가 발생했나요?
    hasError: false,
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Spinner title="로딩 중..." />
        </div>
      );
    }

    return (
      <>
        <button
          type="button"
          onClick={() => this.fetchRandomPeople(API_ENDPOINT)}
        >
          다양한 사람들을 보고 싶어요!
        </button>

        {/* <ul>
          <li></li>
        </ul> */}
      </>
    );
  }

  /* commit 단계 ---------------------------------------------------------------- */

  // React + Firebase 클라우드 Backend (Serverless) : AWS
  // - 인증(회원가입, 로그인, SNS 로그인)
  // - 파이어스토어 (데이터베이스: JSON 데이터 구조)
  // - 스토리지 (이미지, 에셋 업로드 → URL)
  // - 호스팅 (서비스, FTP → 무료 웹 호스팅)

  async fetchRandomPeople(endpoint) {
    // Random User API 서버에 요청
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      this.setState({
        data: data.results,
      });
    } catch (error) {
      this.setState({
        error: {
          message: error.message,
        },
        hasError: true,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    // 3번째 사이드 이펙트
    // 이벤트 구독/취소
    // 예) 접속 중인 친구의 온라인 상태 여부 감지하는 이벤트 함수 연결(구독)
    //    접속 중인 친구의 온라인 상태 여부 감지하는 이벤트 함수 연결 해제(취소)

    // 타이머(특정 주기마다 확인하는 이벤트 함수 시뮬레이션)
    this.clearId = setInterval(() => {
      console.log('친구야 접속 중이니?');
    }, 1500);

    // this.fetchRandomPeople(API_ENDPOINT);

    const lifecycleElement = document.querySelector('.LifeCycle');
    const selectMeInput = document.getElementById('select-me');

    if (lifecycleElement) {
      lifecycleElement.addEventListener('click', (e) => {
        e.target.style.cssText = `
        background: skyblue;
        color: darkblue;
        font-size: 3rem;
        padding: 20px;
      `;

        setTimeout(() => {
          selectMeInput.value = '나! 선택받았어~~';
          selectMeInput.select();
        }, 1500);
      });

      lifecycleElement.addEventListener('keyup', (e) => {
        if (e.key.toLowerCase().includes('enter')) {
          lifecycleElement.click();
        }
      });
    }
  }

  componentDidUpdate() {
    console.log('우리 컴포넌트가 변경되었어요~');
  }

  // 구독 중인 이벤트 취소(unsubscription)
  componentWillUnmount() {
    console.log('컴포넌트 언마운트 전에 실행됩니다.');

    clearInterval(this.clearId);
    console.log('구독 중인 친구 접속 감지 이벤트를 해제했습니다.');
  }
}
