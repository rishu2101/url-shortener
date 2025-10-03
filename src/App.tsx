import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";

const App: React.FC = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/:code" element={<Redirect />} />
		</Routes>
	</Router>
);

export default App;
