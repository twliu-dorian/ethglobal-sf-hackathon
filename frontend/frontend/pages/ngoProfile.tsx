import React from 'react';
import styles from '../styles/StreamerProfile.module.css';
import StreamerCard from '../components/StreamerCard';

interface Streamer {
  id: number;
  name: string;
  price: string;
  description: string;
  imageSrc: string;
  logoSrc: string;
}

const streamers: Streamer[] = [
  {
    id: 1,
    name: "Bob",
    price: "$13.99",
    description: "text filler HAHAHHAH",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ce41458-dd47-4ba8-a874-5a9701770993?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e",
    logoSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/588b94b2e0dd9af4b63278763cae9103905416695cd2c811071b4702546a2048?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e"
  },
  {
    id: 2,
    name: "Tim",
    price: "$3.99",
    description: "text filler HAHAHHAH",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/eef017a381633e8adfd3b2bdfb7fd4f24682202f2f05867c3d14a767b922de08?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e",
    logoSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/588b94b2e0dd9af4b63278763cae9103905416695cd2c811071b4702546a2048?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e"
  },
  {
    id: 3,
    name: "Joseph",
    price: "$2.99",
    description: "text filler HAHAHHAH",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ade980af-e298-4d79-b8cb-17c22daabdba?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e",
    logoSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/588b94b2e0dd9af4b63278763cae9103905416695cd2c811071b4702546a2048?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e"
  },
  {
    id: 4,
    name: "Steven",
    price: "$5.99",
    description: "text filler HAHAHHAH",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8a5070e9-d8f8-4a11-ac98-3bfbb39e6d14?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e",
    logoSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/588b94b2e0dd9af4b63278763cae9103905416695cd2c811071b4702546a2048?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e"
  },
  {
    id: 5,
    name: "Alice",
    price: "$7.99",
    description: "text filler HAHAHHAH",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/297124c6-739b-4822-b2cb-9c92e7de5bc8?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e",
    logoSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/588b94b2e0dd9af4b63278763cae9103905416695cd2c811071b4702546a2048?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e"
  },
  {
    id: 6,
    name: "Brian",
    price: "$4.99",
    description: "text filler HAHAHHAH",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6df0d4c6-bc5d-4071-8ed6-19e9cbcb31c5?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e",
    logoSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/588b94b2e0dd9af4b63278763cae9103905416695cd2c811071b4702546a2048?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e"
  }
];

const StreamerProfile: React.FC = () => {
  return (
    <section className={styles.streamerProfile}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb5626eda1a3c87e894330dfe19d8a345648c90155ae4b7e5a8aef05d023ce14?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e" alt="Streamer Profile Header" className={styles.headerImage} />
      <div className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>Streamer Profile</h1>
        <div className={styles.filterContainer}>
          <nav className={styles.categoryList}>
            <span className={styles.activeCategory}>MUSIC</span>
            <span>TECHNOLOGY</span>
            <span>NGO</span>
            <span>KPOP</span>
            <span>ROBOTICS</span>
          </nav>
          <div className={styles.sortContainer}>
            <span className={styles.sortLabel}>
              Sort by <span className={styles.activeCategory}>Rating</span>
            </span>
            <span className={styles.sortIcon} aria-hidden="true"></span>
          </div>
        </div>
        <div className={styles.streamerGrid}>
          {streamers.reduce((rows, streamer, index) => {
            if (index % 2 === 0) rows.push([]);
            rows[rows.length - 1].push(streamer);
            return rows;
          }, [] as Streamer[][]).map((row, rowIndex) => (
            <div key={rowIndex} className={styles.streamerRow}>
              {row.map((streamer) => (
                <div key={streamer.id} className={styles.streamerColumn}>
                  <StreamerCard streamer={streamer} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StreamerProfile;