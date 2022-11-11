
type PlayerStatProps = {
    score: number,
    num: number,
    color: string
}

const PlayerStat = ({ score, num, color }: PlayerStatProps) => {
    return (
        <div className={`player-stat-single flex-1 flex flex-col flex-all-center ${color} text-grey`} style={{ padding: 15 }}>
            <span className="score-text">{score < 10 ? `0${score}` : score}</span>
            <hr className="full-width" />
            <span className="player-text">player {num}</span>
        </div>
    )
}

export default PlayerStat;