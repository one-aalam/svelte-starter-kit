export const sticky = (elm: HTMLElement) =>  {
    const sticky = elm.offsetTop;
    const scrollCallBack = () => {
        if (window.pageYOffset > sticky) {
            elm.classList.add("top-0")
            elm.classList.add("sticky")
        } else {
            elm.classList.remove("sticky")
            elm.classList.remove("top-0")
        }
    };
    window.addEventListener("scroll", scrollCallBack)

    return {
        destroy() {
            window.removeEventListener("scroll", scrollCallBack);
        }
    };
}
