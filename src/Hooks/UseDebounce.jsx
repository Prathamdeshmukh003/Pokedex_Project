function UseDebounce(callBack,delay=500){
    let timerId;

    return (...args)=>{
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            callBack(...args);
        },delay);
    }

}

export default UseDebounce;