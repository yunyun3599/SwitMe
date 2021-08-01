import axios from "axios";
import { USER_SERVER } from "../config";

const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const GET_TOTAL_TIME = "GET_TOTAL_TIME";
const GET_RANK = "GET_RANK";
const GET_RANK_STUDY = "GET_RANK_STUDY";
const RECOMMENDED_STUDY = "RECOMMENDED_STUDY";
const GET_STUDYLIST_ALL = "GET_STUDYLIST_ALL";
const GET_STUDYLIST = "GET_STUDYLIST";
const GET_STUDYDETAIL = "GET_STUDYDETAIL";
const GET_ISMEMBER = "GET_ISMEMBER";
const JOIN_STUDY = "JOIN_STUDY";
const LEAVE_STUDY = "LEAVE_STUDY";
const MAKE_STUDY = "MAKE_STUDY";
const GET_MESSAGES = "GET_MESSAGES";
const GET_CHATLIST = "GET_CHATLIST";
const GET_USER_INFO = "GET_USER_INFO";
const GET_USER_STUDY = "GET_USER_STUDY";
const GET_USER_STOPWATCH = "GET_USER_STOPWATCH";
const EDIT_STUDY = "EDIT_STUDY";
const GET_MEMBER = "GET_MEMBER";
const WARN_MEMBER = "WARN_MEMBER";
const ADD_STOPWATCH = "ADD_STOPWATCH";
const GET_TIMER_LIST = "GET_TIMER_LIST";
const EDIT_TIMER = "EDIT_TIMER";
const DELETE_STOPWATCH = "DELETE_TIMER";
const SAVE_STOPWATCH = "SAVE_STOPWATCH";
const USER_MAKE_CHAT = "USER_MAKE_CHAT";
const LEADER_MAKE_CHAT = "LEADER_MAKE_CHAT";
const EDIT_USER = "EDIT_USER";
const FIND_PASSWORD = "FIND_PASSWORD";

//로그인, 회원가입 관련
export const login = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/auth/login`, dataToSubmit)
    .then((response) => {
      return new Promise(function (resolve, reject) {
        let idx = response.headers["user_idx"];
        resolve(idx);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return {
    type: LOGIN,
    payload: request,
  };
};

//비밀번호 찾기
export const find_password = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/user/email/find`, dataToSubmit)
    .then((response) => response.data)
    .catch((error) => {});
  return {
    type: FIND_PASSWORD,
    payload: request,
  };
};

export const signup = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/user/email/send`, dataToSubmit)
    .then((response) => response.data)
    .catch((error) => {});
  return {
    type: SIGNUP,
    payload: request,
  };
};

//메인페이지 관련
export const getTotalTime = (id) => {
  const request = axios
    .get(`${USER_SERVER}/main/mytime/${id}`)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: GET_TOTAL_TIME, payload: request };
};

export const getRanking = () => {
  const request = axios
    .get(`${USER_SERVER}/main/rank/individual`)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: GET_RANK, payload: request };
};

export const getRankingstudy = () => {
  const request = axios
    .get(`${USER_SERVER}/main/rank/study`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) console.log(error.response);
    });
  return { type: GET_RANK_STUDY, payload: request };
};

export const recommendedStudy = () => {
  const request = axios
    .get(`${USER_SERVER}/main/recomstudy`)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: RECOMMENDED_STUDY, payload: request };
};

//회원정보 수정
export const editUser = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/api/mypage/user_update/`, dataToSubmit)
    .then((request) => request.data)
    .catch((error) => {});
  return {
    type: EDIT_USER,
    payload: request,
  };
};

//모든 스터디 리스트 불러오기
export const getStudylistAll = () => {
  const request = axios
    .get(`${USER_SERVER}/list/alllist`)
    .then((request) => request.data)
    .catch((error) => {});
  return { type: GET_STUDYLIST_ALL, payload: request };
};

//검색된 스터디 리스트 불러오기
export const getStudylist = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/list/array`, dataToSubmit)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: GET_STUDYLIST, payload: request };
};

//스터디 세부사항 불러오기
export const getStudydetail = (id) => {
  const request = axios
    .get(`${USER_SERVER}/list/array/study/${id}`)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: GET_STUDYDETAIL, payload: request };
};

//스터디 가입여부 확인
export const getIsMember = (user_idx, study_idx) => {
  const request = axios
    .get(`${USER_SERVER}/list/array/status/${user_idx}/${study_idx}`)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: GET_ISMEMBER, payload: request };
};

//스터디 가입
export const joinStudy = (user_id, study_id) => {
  const request = axios
    .post(`${USER_SERVER}/list/array/join/${user_id}/${study_id}`)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: JOIN_STUDY, payload: request };
};

//스터디 탈퇴
export const leaveStudy = (user_id, study_id) => {
  const request = axios
    .delete(`${USER_SERVER}/list/array/leave/${user_id}/${study_id}`)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: LEAVE_STUDY, payload: request };
};

//스터디 개설
export const makestudy = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/list/array/enroll`, dataToSubmit)
    .then((request) => request.data)
    .catch((error) => {});
  return {
    type: MAKE_STUDY,
    payload: request,
  };
};

//메세지 내역 다 가져오기
export const getMessages = (room_idx) => {
  const request = axios
    .get(`${USER_SERVER}/api/chat/room/${room_idx}`)
    .then((request) => request.data)
    .catch((error) => {});
  return { type: GET_MESSAGES, payload: request };
};

//채팅 리스트 다 가져오기
export const getChatlist = (user_idx) => {
  console.log(`${USER_SERVER}/api/chat/room_list/${user_idx}`);
  const request = axios
    .get(`${USER_SERVER}/api/chat/room_list/${user_idx}`)
    .then((request) => request.data)
    .catch((error) => {});
  return { type: GET_CHATLIST, payload: request };
};

//마이페이지
//사용자 정보 가져오기
export const getUserInfo = (user_idx) => {
  const request = axios
    .get(`${USER_SERVER}/api/mypage/user/${user_idx}`)
    .then((request) => request.data)
    .catch((error) => {});
  return { type: GET_USER_INFO, payload: request };
};

//사용자가 가입한 스터디 가져오기
export const getUserStudy = (user_idx) => {
  const request = axios
    .get(`${USER_SERVER}/api/mypage/study_list/${user_idx}`)
    .then((request) => request.data)
    .catch((error) => {});
  return { type: GET_USER_STUDY, payload: request };
};

//사용자 스톱워치 내역 가져오기
export const getUserStopwatch = (user_idx) => {
  const request = axios
    .get(`${USER_SERVER}/api/mypage/timer_log/${user_idx}`)
    .then((request) => request.data)
    .catch((error) => {});
  return { type: GET_USER_STOPWATCH, payload: request };
};

//스터디 수정
export const editstudy = (study_id, dataToSubmit) => {
  const request = axios
    .put(`${USER_SERVER}/list/array/fix/${study_id}`, dataToSubmit)
    .then((request) => request.data)
    .catch((error) => {});
  return {
    type: EDIT_STUDY,
    payload: request,
  };
};

//스터디 멤버리스트 불러오기
export const getMember = (study_id) => {
  const request = axios
    .get(`${USER_SERVER}/api/study/members/${study_id}`)
    .then((request) => request.data)
    .catch((error) => {});
  return {
    type: GET_MEMBER,
    payload: request,
  };
};

//스터디원 경고 주기
export const warnMember = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/api/study/members/warning`, dataToSubmit)
    .then((response) => response.payload)
    .catch((error) => {
      console.log("error");
    });
  return {
    type: WARN_MEMBER,
    payload: request,
  };
};

//스톱워치 기능
export const addStopwatch = (user_idx, dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/timer/add/${user_idx}`, dataToSubmit)
    .then((response) => response.data)
    .catch((error) => {});
  return {
    type: ADD_STOPWATCH,
    payload: request,
  };
};

export const getTimerList = (user_idx) => {
  const request = axios
    .get(`${USER_SERVER}/timer/list/${user_idx}`)
    .then((response) => response.data)
    .catch((error) => {});
  return {
    type: GET_TIMER_LIST,
    payload: request,
  };
};

export const editTimer = (timer_idx, dataToSubmit) => {
  const request = axios
    .put(`${USER_SERVER}/timer/edit/${timer_idx}`, dataToSubmit)
    .then((response) => response.data)
    .catch((error) => {});
  return {
    type: EDIT_TIMER,
    payload: request,
  };
};

export const deleteTimer = (timer_idx) => {
  const request = axios
    .delete(`${USER_SERVER}/timer/delete/${timer_idx}`)
    .then((response) => response.data)
    .catch((error) => {
      return null;
    });
  return {
    type: DELETE_STOPWATCH,
    payload: request,
  };
};

export const saveTimer = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/timer/save`, dataToSubmit)
    .then((response) => response.data)
    .catch((error) => {});
  return {
    type: SAVE_STOPWATCH,
    payload: request,
  };
};

//스터디원이 채팅 걸 때
export const userMakeChat = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/api/chat/makeroom/user`, dataToSubmit)
    .then((response) => response.data)
    .catch((error) => {});
  return { type: USER_MAKE_CHAT, payload: request };
};

export const leaderMakeChat = (dataToSubmit) => {
  const request = axios
    .post(`${USER_SERVER}/api/chat/makeroom/leader`, dataToSubmit)
    .then((response) => response.data)
    .catch((error) => {
      return {};
    });
  return { type: LEADER_MAKE_CHAT, payload: request };
};

const actions = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuth: "true" };
    default:
      return state;
  }
};

export default actions;
