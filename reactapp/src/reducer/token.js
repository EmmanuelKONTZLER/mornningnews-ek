export default function(token = "", action) {
    if(action.type == 'addToken') {
        console.log("ok token in reducer", action.token)
        return action.token;
    }else {
        console.log("token ko")
        return token;
    }
}