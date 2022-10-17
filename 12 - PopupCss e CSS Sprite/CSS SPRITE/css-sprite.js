document.addEventListener("DOMContentLoaded", () => {

    let foglioStile = document.styleSheets[0];
    let regole = foglioStile.cssRules;
    let numRegole = regole.length;

    numLi = document.querySelectorAll("ul.background li").length;

    let  spostamentoX = 0;

    //APPROCCIO BACKGROUND IMAGE E BACKGROUND POSITION

    for (let indiceLi = 1; indiceLi <= numLi; indiceLi++) {

        numRegole = foglioStile.insertRule(
            `ul.background li:nth-of-type(${indiceLi}) {
                background-position: ${spostamentoX}px -168px;
            }`, numRegole);

        numRegole = foglioStile.insertRule(
            `ul.background li:nth-of-type(${indiceLi}):hover {
                background-position: ${spostamentoX}px -84px;
                transition: 0.4s
            }`, numRegole);
        
        spostamentoX -= 84;
    }

    //APPROCCIO TAG IMG E OBJECT FIT OBJECT POSITION

    spostamentoX = 0;

    for (let indiceLi = 1; indiceLi <= numLi; indiceLi++) {

        numRegole = foglioStile.insertRule(
            `ul.object li:nth-of-type(${indiceLi}) img {
                object-position: ${spostamentoX}px -168px;
            }`, numRegole);

        numRegole = foglioStile.insertRule(
            `ul.object li:nth-of-type(${indiceLi}):hover img {
                object-position: ${spostamentoX}px -84px;
                transition: 0.4s
            }`, numRegole);
        
        spostamentoX -= 84;
    }

});
