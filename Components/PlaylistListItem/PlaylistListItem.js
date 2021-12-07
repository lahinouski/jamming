import React from 'react';
import './PlaylistListItem.css';

class PlaylistListItem extends React.Component {
	constructor(props) {
		super(props);
		this.delete = this.delete.bind(this);
	}

	delete() {
		this.props.deletePlaylist(this.props.playlistItem);
	}

	render() {
		return (
			<div className="PlaylistItem" onClick={this.delete}>
				<h3>{this.props.playlistItem.playlistName}</h3>
				<h2>Delete</h2>
			</div>
		);
	}
}

export default PlaylistListItem;
