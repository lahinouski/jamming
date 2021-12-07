import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    } else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <img src={this.props.track.artwork} alt={this.props.track.name + ' album artwork'} />
          <div className="Track-data">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          <div className="audio-player">
            <audio src={this.props.track.sample} type="audio/ogg" controls />
          </div>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
