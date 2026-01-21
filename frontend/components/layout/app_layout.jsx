import React from "react";

class AppLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app-layout">
        {children}
      </div>
    );
  }
}

export default AppLayout;
