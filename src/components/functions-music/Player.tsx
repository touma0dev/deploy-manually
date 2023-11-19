import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './style/player.css';
import filesLocation from './style/path_routes_files';

function Player() {
  const [volume, setVolume] = useState(50);
  const [selectedFile, setSelectedFile] = useState('rabetão-9d.mp4a');
  const [name, setName] = useState('Mc Lan :Rabetão 8D');
  const [img, setImg] = useState('0.jpg');
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const volumeContainer = document.querySelector('.rhap_volume-container');
    if (volumeContainer) {
      volumeContainer.setAttribute('aria-valuenow', volume);
    }
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [volume, active, isPlaying]);

  const handleKeyPress = (e) => {
    if (e.code === 'Space' && active !== null && active < filesLocation.length) {
      const index = active;
      const path = filesLocation[index]?.path;
      if (path) togglePlay();}};
  const togglePlay = () => {
    const audioPlayer = document.querySelector('.component-musica audio');
    if (audioPlayer) isPlaying ? audioPlayer.pause() : audioPlayer.play();
  };
  const handleEnded = () => {
    const nextIndex = active !== null && active + 1 < filesLocation.length ? active + 1 : null;
    if (nextIndex !== null) {
      const nextFile = filesLocation[nextIndex];
      const nextFilePath = nextFile.path;
      const nextName = nextFile.index;
      const nextImage = nextFile.img;
      setActive(nextIndex);
      setSelectedFile(nextFilePath);
      setName(nextName);
      setImg(nextImage);
    }
  };
  const handleListItemClick = (index) => {
    const name_file = filesLocation[index].index;
    const image = filesLocation[index].img;
    const selectedFilePath = filesLocation[index].path;
    setSelectedFile(selectedFilePath);
    setName(name_file);
    setImg(image);
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <main className='container-player flex-container'   >
      <div className='container-player container-player-extra'>
        <h1 className='tittle-musica'>{name }</h1>
        <img src={img} alt="mc-8d" />

        <AudioPlayer
          className='component-musica'
          autoPlay
          src={selectedFile}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          volume={volume / 100}
          onEnded={handleEnded}
        />
      </div>
      <div className='container-player'>
        <ul className='container-playlist'>
          {filesLocation.map((file, index) => (
            <li className={index === active ? 'active' : ''} key={index} onClick={() => handleListItemClick(index)}>
              <p>{file.index}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Player;
