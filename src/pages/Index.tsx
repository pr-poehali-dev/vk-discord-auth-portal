import { useState } from "react";
import Layout from "@/components/Layout";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import AdminsPage from "./AdminsPage";
import LeadersPage from "./LeadersPage";
import DeputiesPage from "./DeputiesPage";
import ActivitiesPage from "./ActivitiesPage";
import RequestsPage from "./RequestsPage";
import ProfilePage from "./ProfilePage";

export default function Index() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "register": return <RegisterPage />;
      case "admins": return <AdminsPage />;
      case "leaders": return <LeadersPage />;
      case "deputies": return <DeputiesPage />;
      case "activities": return <ActivitiesPage />;
      case "requests": return <RequestsPage />;
      case "profile": return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <Layout activePage={page} onNavigate={setPage}>
      {renderPage()}
    </Layout>
  );
}
