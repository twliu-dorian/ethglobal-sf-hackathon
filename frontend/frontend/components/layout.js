import Head from 'next/head';
import styles from './css/layout.module.css';
import Nav from './navigation';
import Image from 'next/image';
import Link from 'next/link';

export const siteTitle = 'FoodCodex';

export default function Layout({ children, home, homeOther }) {
    return (
        <div className={` ${styles.container} ${(home || homeOther) && styles.containerhome}`}>
            <Head>
                <link rel="icon" href="/src/foodcodex-icon.png" />
                <meta
                    name="description"
                    content="Document experiences at different restaurants"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img alt='FoodCodex Logo' src='/src/foodcodex-logo.png' className={styles.homelogo} />
                    </>
                ) : (<></>)} 
                {homeOther ? (
                    <>
                        <Link href='/' title='Home'>
                            <img src="/src/nav-icons/home-icon.svg" alt='Home Button' className={styles.home} />
                        </Link>
                        <img alt='FoodCodex Logo' src='/src/foodcodex-logo.png' className={styles.homelogo} />
                    </>
                ) : (<></>)}
            </header>
            {!home && !homeOther && (
                <Nav className={styles.nav} />
            )}
            <main className={styles.main}>{children}</main>
            {(home || homeOther) && (
                <div className={styles.background}>
                    <Image 
                        src="/src/home-background.svg"
                        alt="Home Background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
            )}
            {!home && !homeOther && (
                <div className={styles.background}>
                    <Image 
                        src="/src/logged-in-background-faint.png"
                        alt="Background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
            )}
        </div>
    );
}