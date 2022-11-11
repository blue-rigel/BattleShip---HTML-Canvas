import "../styles/win.css";

const Win = () => {
  return (
    <div className="win flex flex-1 flex-col">
      <p>You Win!</p>
      <button className="bg-yellow" onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
};

export default Win;
