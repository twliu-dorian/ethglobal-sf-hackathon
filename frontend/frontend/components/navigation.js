import Link from 'next/link';
import styles from './css/navigation.module.css';
import { useRouter } from 'next/router';
import Hamburger from './hamburger';
import { useState } from 'react';
import { signOut } from 'next-auth/react'; 

export default function Nav() {
    const router = useRouter();

   

    const navItems = [
        {
            href: '/',
            title: 'Home',
            icon: '/src/nav-icons/home-icon.svg',
            alt: 'Home',
        },
        {
            href: '/',
            title: 'Add',
            icon: '/src/nav-icons/add-edit-nav-icon.svg',
            alt: 'Add',
        },
        {
            href: '/restaurant-collection/settings',
            title: 'Settings',
            icon: '/src/nav-icons/settings-icon.svg',
            alt: 'Settings',
        },
        {
            href: '/about',
            title: 'About Us',
            icon: '/src/nav-icons/about-us-icon.svg',
            alt: 'About Us',
        },
        {
            href: '/logout',
            title: <div onClick={(e) => {
                e.preventDefault()
                router.push('/logout')
            }}>Logout</div>,
            icon: '/src/nav-icons/logout-icon.svg',
            alt: 'Logout',
        }
    ];


    return (
        <nav className={styles.nav}>
            <div>
                <img alt='ChainSplash Logo' src='/src/chainsplash-logo.png' className={styles.logo} id='logo' />
                <ul className={styles.navlist}>
                    {navItems.map(({ href, title, icon, alt }) => (
                        <li className={` ${styles.unselected} ${router.asPath === href && styles.selected}`} key={title}>
                            <Link href={href} title={alt}>
                                <a title={alt}>
                                    <div className={styles.icons}>
                                        {title}
                                        <img src={icon} alt={alt} />
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}