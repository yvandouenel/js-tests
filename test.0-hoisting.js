a();
function a() {
    let z = 1;
    b();
    function b() {
        //console.log(z);
        //console.log(z + y); // z est connu mais pas y, il n'est même pas "undefined" mais "is not defined"
    }
    let y = 2;
}

