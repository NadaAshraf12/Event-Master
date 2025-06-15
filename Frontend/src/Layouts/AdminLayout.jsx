import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-sm-3 col-md-2">
          <SideBar />
        </div>

     
        <div className="col-xs-12 col-sm-9 col-md-10 bg-light" style={{ minHeight: '100vh' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
