import { useEffect, useRef, useState } from "react";
import NavBar from "./components/navBar";
import PlayerStat from "./components/playerStat";
import Win from "./components/win";
import shipTypes from "./constant/shipTypes";
import "./styles/main.css";
import { coordinatesToString, drawGridOnCanvas } from "./utils";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [moves, setMoves] = useState<string[]>([]);

  const [score, setScore] = useState<{ [key: string]: number }>({
    carrier: 0,
    battleship: 0,
    cruiser: 0,
    submarine: 0,
    destroyer: 0,
  });

  const layout = [
    { ship: "carrier", positions: ["2|9", "3|9", "4|9", "5|9", "6|9"] },
    { ship: "battleship", positions: ["5|2", "5|3", "5|4", "5|5"] },
    { ship: "cruiser", positions: ["8|1", "8|2", "8|3"] },
    { ship: "submarine", positions: ["3|0", "3|1", "3|2"] },
    { ship: "destroyer", positions: ["0|0", "1|0"] },
  ];

  useEffect(() => {
    canvasRef?.current && drawGridOnCanvas(canvasRef.current);
  }, []);

  const canvasClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const heightFactor = rect.height / 10;
      const widthFactor = rect.width / 10;
      const x = Math.trunc((event.clientX - rect.left) / widthFactor);
      const y = Math.trunc((event.clientY - rect.top) / heightFactor);
      const xy = coordinatesToString(x, y);
      if (!moves.includes(xy)) {
        const ctx = canvasRef.current.getContext("2d");
        const img = new Image();
        let hit = false;
        for (let ships of layout) {
          if (ships.positions.includes(xy)) {
            hit = true;
            setScore({ ...score, [ships.ship]: score[ships.ship] + 1 });
            setPlayerScore(playerScore + 1);
          }
        }
        img.src = hit ? "/images/Hit.png" : "/images/Miss.png";
        img.onload = () => {
          ctx?.drawImage(img, x * 100, y * 100);
        };

        setMoves([...moves, xy]);
      }
    }
  };

  if (playerScore === 17) {
    return <Win />;
  }

  return (
    <>
      <NavBar />
      <div className="battleship-container">
        <div className="scoreboard flex flex-col flex-1">
          <div className="player-stat flex flex-row">
            <PlayerStat score={playerScore} num={1} color="bg-yellow" />
            <PlayerStat score={0} num={2} color="bg-green" />
          </div>
          <table>
            <tbody>
              {Object.entries(shipTypes).map(([shipType, details], index) => (
                <tr key={index}>
                  <td>
                    <img src={`/images/${details.img}`} width={200} />
                  </td>
                  <td className="score-hit">
                    {Array(details.size)
                      .fill(0)
                      .map((_, index) =>
                        score[shipType] < index + 1 ? (
                          <img
                            src="/images/Miss small.png"
                            key={index}
                            width={20}
                            className="dots"
                          />
                        ) : (
                          <img
                            src="/images/Hit small.png"
                            key={index}
                            width={20}
                            className="dots"
                          />
                        )
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="gameboard">
          <canvas
            ref={canvasRef}
            width={1000}
            height={1000}
            onClick={canvasClick}
          />
        </div>
      </div>
    </>
  );
};

export default App;
