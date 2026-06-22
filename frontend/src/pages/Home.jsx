import "../styles/Home.css";
import Navbar from "../components/Navbar";
import PromptInput from "../components/PromptInput";
// import PipelineStatus from "../components/PipelineStatus";
import OutputPanel from "../components/OutputPanel";
import FeaturesSection from "../components/FeaturesSection";
import PipelineDashboard from "../components/PipelineDashboard";
import Footer from "../components/Footer"; // Import Footer

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-container">
        {/* Hero Header */}
        <section className="hero-section" aria-label="Hero">
          <div className="hero-content">
            <h1 className="hero-title">
              AI App Compiler
              <span className="hero-badge">Beta</span>
            </h1>
            <p className="hero-subtitle">
              Transform natural language into executable software blueprints.
            </p>
          </div>
        </section>

        {/* MAIN WORKSPACE */}
        <section className="workspace-section" aria-label="Workspace">
          <div className="workspace-grid">
            {/* LEFT PANEL */}
            <div className="workspace-panel panel-left">
              <div className="panel-header">
                <span className="panel-icon">💬</span>
                <h2 className="panel-title">Prompt Input</h2>
                <span className="panel-status status-active">Active</span>
              </div>
              <PromptInput />
            </div>

            {/* RIGHT PANEL */}
            <div className="workspace-panel panel-right">
              <div className="panel-header">
                <span className="panel-icon">📄</span>
                <h2 className="panel-title">Output</h2>
                <span className="panel-status status-ready">Ready</span>
              </div>
              <OutputPanel />
            </div>
          </div>
        </section>

        {/* PIPELINE DASHBOARD */}
        <section className="dashboard-section" aria-label="Pipeline Dashboard">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-icon">⚡</span>
              <h2 className="section-title">Pipeline Dashboard</h2>
            </div>
            <span className="section-badge">Live</span>
          </div>
          <div className="dashboard-wrapper">
            {/* <PipelineStatus /> */}
            <PipelineDashboard />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="features-section" aria-label="Features">
          <div className="features-header">
            <h2 className="features-title">Key Features</h2>
            <p className="features-subtitle">
              Everything you need to build AI-powered applications
            </p>
          </div>
          <FeaturesSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;