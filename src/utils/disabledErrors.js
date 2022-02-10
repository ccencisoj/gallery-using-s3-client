const errorBackut = console.error;

console.error = (error)=> {
  if(!(error.includes(["prop on a DOM element.", 
    "If you intentionally want it to appear",
    "in the DOM as a custom attribute"].join(" "))))
    errorBackut(error);
}