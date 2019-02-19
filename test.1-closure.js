/* const getPwd = (function() {
    const pwd = "123";
    return function(){
      return pwd;
    }
  })();
  console.log(getPwd()); */
  const module1 = (function() {
    let pwd = "123";
    function getPwd(){
      return pwd;
    }
    function setPwd(newpwd) {
      pwd = newpwd;
    }
    return {
      "getPwd": getPwd,
      "setPwd": setPwd
    }
  })();
  console.log(module1.getPwd());
  module1.setPwd("456");
  console.log(module1.getPwd());