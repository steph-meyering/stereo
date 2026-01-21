import React from "react";

class ThemeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.getTheme(),
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    // Apply theme on mount
    this.applyTheme(this.state.theme);
  }

  getTheme() {
    // Check localStorage first
    const stored = localStorage.getItem("theme");
    if (stored) return stored;

    // Fall back to OS preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  applyTheme(theme) {
    const root = document.documentElement;
    root.classList.remove("light-mode", "dark-mode");
    
    if (theme === "dark") {
      root.classList.add("dark-mode");
    } else if (theme === "light") {
      root.classList.add("light-mode");
    }
    
    localStorage.setItem("theme", theme);
  }

  toggleTheme() {
    const newTheme = this.state.theme === "light" ? "dark" : "light";
    this.setState({ theme: newTheme });
    this.applyTheme(newTheme);
  }

  render() {
    const { theme } = this.state;
    const isDark = theme === "dark";

    return (
      <button
        className="theme-toggle"
        onClick={this.toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          // Sun icon for light mode
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="4" fill="currentColor" />
            <line x1="10" y1="1" x2="10" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="17" x2="10" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="10" x2="3" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="3.5" y1="3.5" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="15" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="3.5" y1="16.5" x2="5" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="5" x2="16.5" y2="3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 10.5C16.8 14.6 13.4 18 9.3 18C5.8 18 2.9 15.6 2 12.3C1.9 11.9 2.3 11.5 2.7 11.6C3.6 11.9 4.5 12 5.5 12C9.6 12 13 8.6 13 4.5C13 3.5 12.8 2.6 12.6 1.7C12.5 1.3 12.9 0.9 13.3 1C16.4 2 18.5 5 17.5 8.5C17.3 9.2 17.2 9.8 17 10.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    );
  }
}

export default ThemeToggle;
