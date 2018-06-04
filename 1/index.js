
class Matrix extends React.Component {
  renderBlock(i) {
    return (
      <button className="block" onClick={() => this.props.onClick(i)}>
        {this.props.current.blockValues[i]}
      </button>
    );
  }
  render() {
    return (
      <div className="matrix">
        <div className="block-row">
          {this.renderBlock(0)}
          {this.renderBlock(1)}
          {this.renderBlock(2)}
        </div>
        <div className="block-row">
          {this.renderBlock(3)}
          {this.renderBlock(4)}
          {this.renderBlock(5)}
        </div>
        <div className="block-row">
          {this.renderBlock(6)}
          {this.renderBlock(7)}
          {this.renderBlock(8)}
        </div>
      </div>
    );
  }
}

class Info extends React.Component {
  render() {
    const bodyArr = this.props.body.map((value, index) => {
      return (
        <button className="info-button" onClick={() => this.props.onClick(index)} key={index}>{value}</button>
      );
    });
    return (
      <div className="info">
        <div className="infoHead">
          {this.props.title}
        </div>
        <div className="infoBody">
          {bodyArr}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          blockValues: Array(9).fill(null)
        }
      ],
      stopNumber: 0,
      xIsNext: true
    };
  }
  winner() {
    const current = this.state.history[this.state.stopNumber].blockValues;
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winnerLines.length; i++) {
      const [a, b, c] = winnerLines[i];
      if (current[a] && current[b] === current[a] && current[c] === current[a]) {
        return current[a];
      }
    }
    return null;
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stopNumber + 1);
    const current = history[history.length - 1];
    const blockValues = current.blockValues.slice();
    if (blockValues[i] || this.winner()) {
      return;
    }
    blockValues[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        blockValues: blockValues
      }]),
      stopNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(index) {
    this.setState({
      stopNumber: index,
      xIsNext: (index % 2) ===0
    });
  }
  render() {
    const current = this.state.history[this.state.stopNumber];
    const winner = this.winner();
    let title;
    if (winner) {
      title = '获胜者是: ' + winner;
    } else {
      title = '下一步的类型: ' + (this.state.xIsNext ? "X" : "O");
    }
    const body = this.state.history.map((value, index) => {
      // value: 每一项的object， index：第几项 
      const desc = index ? '前往第' + index + '步' : '游戏开始';
      return desc;
    });
    return (
      <div>
        <Matrix current={current} onClick={i => this.handleClick(i)} />
        <Info title={title} body={body} onClick={i=> this.jumpTo(i)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('example')
);