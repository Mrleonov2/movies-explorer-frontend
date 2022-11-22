import { useLayoutEffect, useState } from "react";
function getBroserWidth() {
  const [width, setWidth] = useState(1280);
  useLayoutEffect(() => {
    const getWidth = () => {
      setWidth(window.innerWidth);
    };

    function resizeHandler(func, ms) {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          func.apply(this, arguments);
        }, ms);
      };
    }
    const resizedWidth = resizeHandler(getWidth, 1000);
    window.addEventListener("resize", resizedWidth);
    getWidth();
    return () => {
      window.removeEventListener("resize", resizedWidth);
    };
  }, []);
  return width;
}
export default getBroserWidth;
