import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
    const [current, setCurrent] = useState(0);
    const images = [
        {
            src: "https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-boao-asia-forum-blue-technology-asia-landmark-silhouette-poster-image_206448.jpg",
            title: "Discussion on Current Events",
            description: "Engage in thoughtful discussions on the latest news, events, and happenings around the world. Share your perspectives, opinions, and insights with the community."
        },
        {
            src: "https://e0.pxfuel.com/wallpapers/122/831/desktop-wallpaper-light-blue-light-blue-pattern.jpg",
            title: "Community Updates and Announcements",
            description: "Stay informed about important updates, announcements, and changes within the community. From new features to upcoming events, this is your source for the latest information."
        },
        {
            src: "https://img.freepik.com/premium-photo/dark-blue-abstract-background_401927-344.jpg",
            title: "Creative Corner",
            description: "Unleash your creativity and share your artistic endeavors with fellow members. Whether it's writing, photography, art, or music, this is the place to showcase your talents and inspire others."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [current]);

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    return (
        <div className="relative">
            <div className="max-w-screen-xl mx-auto">
                {images.map((slide, index) => (
                    <div key={index} className={`${index === current ? 'block' : 'hidden'} relative w-full bg-white`}>
                        <img src={slide.src} alt="Travel Image" className="w-full h-96 object-cover" />
                        <div className="absolute top-0 left-0 w-full h-full bg-purple-900 bg-opacity-70 flex justify-center items-center flex-col text-white p-4">
                            <h1 className="text-4xl font-bold">{slide.title}</h1>
                            <p className="text-xl mt-2">{slide.description}</p>
                        </div>
                    </div>
                ))}
                <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-900 text-white px-4 py-2 rounded-full focus:outline-none ml-4">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-900 text-white px-4 py-2 rounded-full focus:outline-none mr-4">
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    );
}

export default HomePage;
