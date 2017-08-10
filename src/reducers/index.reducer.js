function reducer(state,action){
    switch (action.type){
        case "test":state.test = "12345";break;
        default : state.test = "test";
    }
}