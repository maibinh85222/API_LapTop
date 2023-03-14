import useAuth from "../hooks/useAuth";


const Admin = () => {

    const {auth} = useAuth();

    console.log("auth trong admin " + auth.roles);

    return (
        <h2>Hello word</h2>

    )
}

export default Admin;