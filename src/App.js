import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FindEmail from "./pages/FindEmail";
import FindPassword from "./pages/FindPassword";
import StudyList from "./pages/StudyList";
import StopWatch from "./pages/StopWatch";
import StudyDetail from "./pages/StudyDetail";
import MemberList from "./pages/MemberList";
import MakeStudy from "./pages/MakeStudy";
import Mypage from "./pages/Mypage";
import EditStudy from "./pages/EditStudy";
import Modal from "./components/Modal";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/findemail" component={FindEmail} />
        <Route exact path="/findpassword" component={FindPassword} />
        <Route exact path="/studylist" component={StudyList} />
        <Route exact path="/stopwatch" component={StopWatch} />
        <Route exact path="/studydetail/:study_id" component={StudyDetail} />
        <Route exact path="/memberlist/:study_id" component={MemberList} />
        <Route exact path="/makestudy" component={MakeStudy} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/editstudy/:study_id" component={EditStudy} />
        <Route exact path="/modal" component={Modal} />
        <Route exact path="/edituser" component={EditUser} />
      </Switch>
    </Router>
  );
}

export default App;
