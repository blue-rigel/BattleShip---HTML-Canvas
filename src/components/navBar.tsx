import "../styles/navBar.css";

const NavBar = () => {
  return (
    <div className="navbar flex flex-row">
      <div className="blackbox wider flex-1" />
      <input type="text" />
      <div className="greybox flex-1" />
      <div className="blackbox" />
      <div className="blackbox only-desktop" />
      <div className="blackbox only-desktop" />
    </div>
  );
};

export default NavBar;
