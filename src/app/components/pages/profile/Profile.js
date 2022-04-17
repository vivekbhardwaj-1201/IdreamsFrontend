import { useEffect, useState } from "react";
import { adminApi } from "../../../utils/admin.api";
import Preloader from "../../common/actions/Preloaders/Preloader";
import Card from "../../common/UI/Card/Card";
import classes from './Profile.module.css';
const Profile = () => {
    const [userData, setUserData] = useState();
    const [loading,setLoading ] = useState(true);

    useEffect(() => {
        async function fetchProfile(){ 
            try {
                const res = await adminApi.getProfile();
                console.log(res);
                setLoading(false);
                if(res.data.isSuccess){
                    setUserData(res.data.Data); 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile();
    },[])
    return (
        <>
        <Preloader customLoading = {loading}/>
        <Card className = {classes.profile}>
            <h2 style = {{ textAlign : 'center'}}>Profile</h2>
            <p><b>Name:</b> {userData?.firstname} {userData?.lastname}</p>
            <p><b>Email Address:</b> {userData?.email}</p>
            <p><b>Phone Number:</b> {userData?.phone}</p>
        </Card>
        </>
    )
}

export default Profile;