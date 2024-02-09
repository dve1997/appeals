import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeaderAppeals from "../headerAppeals/HeaderAppeals";
import FooterAppeals from "../footerAppeals/FooterAppeals";
import ErrorPage from "../pages/errorPage/ErrorPage";
import TitleAppealsPage from "../pages/titleAppealsPage/TitleAppealsPage";
import CreateAppealPage from "../pages/createAppealPage/CreateAppealPage";
import InfoAppealPage from "../pages/infoAppealPage/InfoAppealPage";

import "./App.scss";

function App() {
  return (
    <div className="appeals__wrapper">
      <div className="appeals__conteiner">
        <Router>
          <main className="appeals__main">
            <header className="appeals__header">
              <HeaderAppeals />
            </header>
            <section className="appeals__section">
              <Routes>
                <Route path="/" element={<TitleAppealsPage />} />
                <Route path="/create" element={<CreateAppealPage />} />
                <Route path="/info/:infoId" element={<InfoAppealPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </section>
            <footer className="appeals__footer">
              <FooterAppeals />
            </footer>
          </main>
        </Router>
      </div>
    </div>
  );
}

export default App;
