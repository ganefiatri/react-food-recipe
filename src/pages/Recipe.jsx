import React from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {motion} from "framer-motion";

function Recipe() {

  const [recipe, setRecipe] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  const getRecipe = async (name) => {
      const data = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/recipe/${name}`);
      const recipes = await data.json();
      setRecipe(recipes.results);
  }

  useEffect(() => {
      getRecipe(params.name)
  },[params.name]);

return (
  <DetailWrapper
  animate={{opacity:1}}
  initial={{opacity:0}}
  exit={{opacity:0}}
  transition={{duration:0.5}}
  >
    <div>
        <h2>{recipe.title}</h2>
        <img src={recipe.thumb} alt={recipe.title} />
    </div>
    <Info>
      <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instruction</Button>
      <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
      {activeTab === 'instructions' && (
        <div>
          <h4 dangerouslySetInnerHTML={{__html: recipe.desc}}></h4>
          <h4 dangerouslySetInnerHTML={{__html: recipe.step}}></h4>
        </div>
      )}
      {activeTab === 'ingredients' && (
        <ul>
          <li>{recipe.ingredient}</li>
        </ul>
      )}
      
    </Info>
  </DetailWrapper>
)
}

const DetailWrapper = styled(motion.div)`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  img{
    width:500px;
    border-radius: 2rem;

}
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul{
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  margin-bottom:1rem;
`

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe