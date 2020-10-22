import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faAngellist, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

class UserSidebar extends React.Component {
  constructor(props){
    super(props)
  }
  
  render() {
    let user = this.props.user;
    
    // bioDiv only generated on user show page, not when this component is used in 
    // song show sidebar component
    let bioDiv = !!user ? (
      <div className="sidebar-section">
        About me:
        <div className="section-content">{user.about}</div>
      </div>
    ) : null
    return (
      <div className="sidebar-main">
        <div className="sidebar">
          {bioDiv}
          <div className="sidebar-section">
            Get in touch:
            <div className="section-content">
              <a href="https://stephmeyering.com">stephmeyering.com</a> <br />
              <a
                href="https://www.linkedin.com/in/steph-meyering/"
                target="_blank"
                rel="noopener noreferer"
              >
                <FontAwesomeIcon
                  className="sidebar-social-icon"
                  icon={faLinkedin}
                />
              </a>
              <a
                href="https://angel.co/u/steph-meyering"
                target="_blank"
                rel="noopener noreferer"
              >
                <FontAwesomeIcon
                  className="sidebar-social-icon"
                  icon={faAngellist}
                />
              </a>
              <a
                href="https://github.com/steph-meyering"
                target="_blank"
                rel="noopener noreferer"
              >
                <FontAwesomeIcon
                  className="sidebar-social-icon"
                  icon={faGithub}
                />
              </a>
              <a
                href="mailto:stephane.meyering@gmail.com"
                target="_blank"
                rel="noopener noreferer"
              >
                <FontAwesomeIcon
                  className="sidebar-social-icon"
                  icon={faEnvelope}
                />
              </a>
            </div>
          </div>

          <div className="sidebar-section"></div>
          <div className="sidebar-section"></div>
          <div className="sidebar-section"></div>
        </div>
      </div>
    );
  }
}

export default UserSidebar;
