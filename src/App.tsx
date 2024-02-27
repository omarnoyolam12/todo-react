import { motion } from "framer-motion";
import { Todo } from "./components";

import darkWeb from "./images/bg-desktop-dark.jpg";
// import lighWeb from "./images/bg-desktop-light.jpg";
// import darkMovil from "./images/bg-mobile-dark.jpg";
// import lighMovil from "./images/bg-mobile-light.jpg";

function App() {

  return (
    <section className="w-full h-screen relative">
      <motion.figure
        className="w-full relative"
        style={{
          backgroundImage: `url(${darkWeb})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
        initial={{ height: 0 }}
        animate={{ height: "33%" }}
        transition={{ duration: 1 }}
      >
      </motion.figure>

      <Todo />
    </section>
  )
}

export default App
