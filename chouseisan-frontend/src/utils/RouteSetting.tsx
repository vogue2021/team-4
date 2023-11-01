import { Route, Routes, Link, Navigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import CreateComplete from "../components/CreateComplete";
import ViewEvent from "../components/ViewEvent";
export default function RouteSetting() {
  return (
    <>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/create_complete" element={<CreateComplete />} />
        <Route path="/view_event" element={<ViewEvent/>}/>
      </Routes>
    </>
  );
}
