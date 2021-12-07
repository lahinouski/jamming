import React from 'react';
import './PlaylistList.css';
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem';

class PlaylistList extends React.Component {
    componentDidMount() {
        this.props.getUserPlayLists();
    }

    render() {
        return (
            <div className="PlaylistList">
                <h2>Local PlayLists:</h2>
                {this.props.playlistList.map(playlistItem => {
                    return (
                        <PlaylistListItem
                            playlistItem={playlistItem}
                            key={playlistItem.playlistId}
                            deletePlaylist={this.props.deletePlaylist}
                        />
                    );
                })}
            </div>
        );
    }
}

export default PlaylistList;
