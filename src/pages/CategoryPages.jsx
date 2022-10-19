import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

function CategoryPages() {

    const [category, setCategory] = useState([]);
    let params = useParams();

    const getCategory = async (name) => {
        const data = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/category/recipes/${name}`);
        const recipes = await data.json();
        setCategory(recipes.results);
    }

    useEffect(() => {
        getCategory(params.type)
    },[params.type]);

  return (
    <Grid
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
    >
        {category.map((item)=>{
            return (
                <Card key={item.key}>
                    <Link to={"/recipes/" + item.key}>
                        <img src={item.thumb} alt={item.title} />
                        <h4>{item.title}</h4>
                    </Link>
                </Card>
            )
        })}
    </Grid>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled(motion.div)`
    img{
        width: 100%;
        border-radius: 2rem;

    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`;

export default CategoryPages