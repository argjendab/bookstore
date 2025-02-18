import React, { useEffect, useState } from 'react';
import slide1 from '../imgs/clean code.png';
import slide2 from '../imgs/Algorithms-Robert-Sedgewick-Kevin-Wayne-Photoroom.png';
import slide3 from '../imgs/elloquent.jpg';
import { Link } from 'react-router-dom';

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Array of slides, each containing an image and text
  const slides = [
    { image: slide1, text: `A seminal book written by Robert C. Martin, commonly known as Uncle Bob. Published in 2008, it has become a cornerstone for software developers aiming to improve the quality of their code. The book provides practical advice, principles, and best practices for writing code that is clean, maintainable, and efficient.`, name: `Clean Code` },
    { image: slide2, text: `A highly regarded textbook written by Robert Sedgewick and Kevin Wayne. It is one of the most comprehensive and widely used resources for learning and understanding algorithms and data structures. The book is known for its clear explanations, practical examples, and emphasis on real-world applications.`, name: `Algorithms, 4th Edition` },
    { image: slide3, text: `A widely acclaimed book that serves as an introduction to programming and JavaScript. It is known for its clear, engaging writing style and its focus on teaching not just the syntax of JavaScript, but also the fundamental concepts of programming.`, name: `Elloquent Javascript` }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev => (prev < (slides.length - 1)) ? prev += 1 : 0));
    }, 3500);

    return () => clearInterval(interval);

  }, [slides.length]);

  return (
    <div className='overflow-hidden'>
      <div className='flex transition-transform duration-1000' style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className='flex-none w-full'>
            <div className='flex gap-16 justify-center items-center mx-60 my-[90px]'>
              <img src={slide.image} alt={`Slide ${index + 1}`} className='w-[500px] h-[600px]' />
              <div className='mx-10 flex flex-col'>
                <h1 className="text-3xl my-12">Most read books</h1>
                <h1 className='text-2xl my-2'>{slide.name}</h1>
                <p>{slide.text}</p>
                <Link to="/shop" className='bg-blue-900 hover:bg-blue-950 w-1/6 py-3 px-5 rounded-lg text-white text-center my-16'>Check more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex gap-0 w-full justify-center'>
        <button onClick={() => setActiveSlide(0)} disabled={activeSlide === 0} className='mx-1.5 text-blue-900 text-7xl disabled:opacity-50'><i className="fa-solid fa-minus"></i></button>
        <button onClick={() => setActiveSlide(1)} disabled={activeSlide === 1} className='mx-1.5 text-blue-900 text-7xl disabled:opacity-50'><i className="fa-solid fa-minus"></i></button>
        <button onClick={() => setActiveSlide(2)} disabled={activeSlide === 2} className='mx-1.5 text-blue-900 text-7xl disabled:opacity-50'><i className="fa-solid fa-minus"></i></button>
      </div>
    </div>
  );
}

export default Slider;
