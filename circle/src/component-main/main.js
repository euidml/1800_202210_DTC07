import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../component-global/firebase";
import PhotoCardSwipe from "./mainProfileCards";

// render "main" page.
function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  // check if user is logged in
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    //render swiping photo cards
    <div className="dashboard">
      <PhotoCardSwipe />
    </div>
  );
}
export default Dashboard;
