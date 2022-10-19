import Popular from "../component/Popular";
import Regular from "../component/Regular";
import {motion} from "framer-motion";

function Home() {
  return (
    <motion.div
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    >
        <Popular/>
        <Regular/>
    </motion.div>
  )
}

export default Home