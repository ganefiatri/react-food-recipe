import { useEffect, useState } from "react";
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';

function Popular() {

const [popular, setPopular] = useState([]);

useEffect(() =>{
    getPopular();
},[]);

const getPopular  = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
        setPopular(JSON.parse(check));
    }else{
        const api = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/recipes-length/?limit=5`);
        const data = await api.json();
        localStorage.setItem("popular", JSON.stringify(data.results))
        console.log(data.results)
        setPopular(data.results)
    }
    
}

  return (
    <div>
        <Wrapper
         animate={{opacity:1}}
         initial={{opacity:0}}
         exit={{opacity:0}}
         transition={{duration:0.5}}
        >
            <h3>Popular Recipe</h3>
            <Splide options={{
                perPage:3,
                arrows:false,
                pagination: false,
                drag: "free",
                gap: "5rem"
                }}>
            {popular.map((recipe)=> {
            return (
                <SplideSlide key={recipe.key}>
                    <Card>
                        <Link to={"/recipes/" + recipe.key}>
                            <p>{recipe.title}</p>
                            <img src={recipe.thumb} alt={recipe.title} />
                            <Gradient />
                        </Link>
                    </Card>
                </SplideSlide>
                );
            })}
            </Splide>
        </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled(motion.div)`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Popular