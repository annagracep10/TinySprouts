import React, { useState } from 'react';
import CreateUser from '../components/CreateUser';
import UpdateUser from '../components/UpdateUser';
import UserList from '../components/UserList';
import PlantList from '../components/PlantList';
import CreatePlant from '../components/CreatePlant';
import UpdatePlant from '../components/UpdatePlant';
import PlanterList from '../components/PlanterList';
import CreatePlanter from '../components/CreatePlanter';
import UpdatePlanter from '../components/UpdatePlanter';
import SeedList from '../components/SeedList';
import CreateSeed from '../components/CreateSeed';
import UpdateSeed from '../components/UpdateSeed';
import "../styles/AdminDashboard.css";
import FileUpload from '../components/FileUpload';

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('UserList');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedPlanter, setSelectedPlanter] = useState(null);
  const [selectedSeed, setSelectedSeed] = useState(null);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'UserList':
        return <UserList setSelectedComponent={setSelectedComponent} setSelectedUser={setSelectedUser} />;
      case 'CreateUser':
        return <CreateUser setSelectedComponent={setSelectedComponent}  />;
      case 'UpdateUser':
        return <UpdateUser user={selectedUser} setSelectedComponent={setSelectedComponent}  />;
      case 'PlantList':
        return <PlantList setSelectedComponent={setSelectedComponent} setSelectedPlant={setSelectedPlant} />;
      case 'CreatePlant':
        return <CreatePlant setSelectedComponent={setSelectedComponent} />;
      case 'UpdatePlant':
        return <UpdatePlant plant={selectedPlant} setSelectedComponent={setSelectedComponent} />;
      case 'PlanterList':
        return <PlanterList setSelectedComponent={setSelectedComponent} setSelectedPlanter={setSelectedPlanter} />;
      case 'CreatePlanter':
        return <CreatePlanter setSelectedComponent={setSelectedComponent}  />;
      case 'UpdatePlanter':
        return <UpdatePlanter planter={selectedPlanter} setSelectedComponent={setSelectedComponent} />;
      case 'SeedList':
        return <SeedList setSelectedComponent={setSelectedComponent} setSelectedSeed={setSelectedSeed} />;
      case 'CreateSeed':
        return <CreateSeed setSelectedComponent={setSelectedComponent} />;
      case 'UpdateSeed':
        return <UpdateSeed seed={selectedSeed} setSelectedComponent={setSelectedComponent} />;
      case 'FileUpload':
        return <FileUpload setSelectedComponent={setSelectedComponent}/>;
      default:
        return <UserList setSelectedComponent={setSelectedComponent} setSelectedUser={setSelectedUser} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <button onClick={() => setSelectedComponent('UserList')}>User List</button>
        <button onClick={() => setSelectedComponent('CreateUser')}>Create User</button>
        <button onClick={() => setSelectedComponent('PlantList')}>Plants</button>
        <button onClick={() => setSelectedComponent('CreatePlant')}>Create Plant</button>
        <button onClick={() => setSelectedComponent('PlanterList')}>Planters</button>
        <button onClick={() => setSelectedComponent('CreatePlanter')}>Create Planter</button>
        <button onClick={() => setSelectedComponent('SeedList')}>Seeds</button>
        <button onClick={() => setSelectedComponent('CreateSeed')}>Create Seed</button>
        <button onClick={() => setSelectedComponent('FileUpload')}>Image Upload</button>
      </div>
      <div className="main-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

