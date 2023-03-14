

const getToken = () => {
    return localStorage.getItem("authorization");
}

export const getRefreshToken = () => {
    return localStorage.getItem("refresh-token");
}


export default getToken;