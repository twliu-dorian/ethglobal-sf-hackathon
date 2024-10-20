import React from 'react';
import styles from '../styles/StreamerProfile.module.css';

interface StreamerCardProps {
  streamer: {
    name: string;
    price: string;
    description: string;
    imageSrc: string;
    logoSrc: string;
  };
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer }) => {
  return (
    <article className={styles.streamerCard}>
      <div className={styles.streamerImageContainer}>
        <img src={streamer.imageSrc} alt={`${streamer.name}'s profile`} className={styles.streamerImage} />
        <img src={streamer.logoSrc} alt={`${streamer.name}'s logo`} className={styles.streamerLogo} />
      </div>
      <div className={styles.streamerInfo}>
        <h2 className={styles.streamerName}>{streamer.name}</h2>
        <p className={styles.streamerPrice}>{streamer.price}</p>
        <p className={styles.streamerDescription}>{streamer.description}</p>
        <div className={styles.actionContainer}>
          <button className={styles.donateButton}>Donate</button>
          <button className={styles.watchLaterButton}>Watch Later</button>
        </div>
      </div>
    </article>
  );
};

export default StreamerCard;