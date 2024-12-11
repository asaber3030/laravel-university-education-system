import "@/assets/css/home.scss";
import "@/assets/css/landing.scss";

import WelcomeImage from "../assets/images/bg-home.svg";
import Feature01 from "@/assets/images/student.svg";
import Feature02 from "@/assets/images/activity.png";
import Feature03 from "@/assets/images/quiz.png";
import Feature04 from "@/assets/images/answer.svg";

import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSignIn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const { auth } = usePage().props;

  return (
    <div className="welcome-page-container">
      <Head title="o-Edu for universities" />
      <div className="header">
        <h4>
          <Link>o-Edu</Link>
        </h4>
        <div className="links">
          {auth.user ? (
            <Link href={route("students.dashboard")}>
              <FontAwesomeIcon icon={faUser} /> @{auth.user.username}
            </Link>
          ) : (
            <>
              <Link href={route("login")}>
                <FontAwesomeIcon icon={faSignIn} /> Login
              </Link>
              <a
                href="https://www.linkedin.com/in/abdulrahman-saber/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Contact
              </a>
            </>
          )}
        </div>
      </div>

      <div className="page-content">
        <div className="text-desc">
          <h5>
            Welcome to o-Edu which stands for <b>Online Education</b> for
            University Students!
          </h5>
          <p>
            This education was created for universities to handle everything
            about students and their semesters!
          </p>

          <div className="features">
            <div className="feature">
              <img src={Feature01} alt="" />
              <h6>Student Problems Solved</h6>
            </div>
            <div className="feature">
              <img src={Feature02} alt="" />
              <h6>Friendly UI</h6>
            </div>
            <div className="feature">
              <img src={Feature03} alt="" />
              <h6>Quiz handler</h6>
            </div>
            <div className="feature">
              <img src={Feature04} alt="" />
              <h6>High Performance</h6>
            </div>
          </div>

          <div className="page-footer">
            {!auth && (
              <Link href={route("login")} className="btn btn-primary">
                Login
              </Link>
            )}
            <a
              className="btn btn-dark"
              href="https://www.linkedin.com/in/abdulrahman-saber/"
              target="_blank"
            >
              Contact us
            </a>
          </div>
        </div>

        <img className={"main-l"} src={WelcomeImage} alt="" />
      </div>
    </div>
  );
};

export default Welcome;
