import './style.css';
import Icon from '../ui/Icon';

export default function Career() {
    return (
        <>

            {/* Hero Section */}
            <section className="hero">
                <div className="background-slider">
                    <div
                        className="background-slide"
                        data-desktop="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        data-mobile="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    ></div>
                    <div
                        className="background-slide"
                        data-desktop="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        data-mobile="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    ></div>
                    <div
                        className="background-slide"
                        data-desktop="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        data-mobile="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    ></div>
                </div>
                <div className="hero-overlay"></div>
            </section>

            {/* Current Positions Section */}
            <section id="current-positions" className="current-positions">
                <div className="container">
                    <div className="section-header">
                        <h2>Current Positions</h2>
                        <p>
                            Explore our open positions and find the perfect role for your career
                            growth
                        </p>
                    </div>

                    {/* Job Search and Filters */}
                    <div className="job-filters">
                        <div className="search-container">
                            <div className="search-box">
                                <Icon name="icon-search" size={16} />
                                <input
                                    type="text"
                                    id="job-search"
                                    placeholder="Search jobs by title, department, or keywords..."
                                />
                            </div>
                        </div>
                        <div className="filter-options">
                            <select id="department-filter">
                                <option value="">All Departments</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Operations">Operations</option>
                                <option value="Finance">Finance</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="IT">IT</option>
                            </select>
                            <select id="location-filter">
                                <option value="">All Locations</option>
                                <option value="New York">New York</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="Chicago">Chicago</option>
                                <option value="Remote">Remote</option>
                                <option value="Toronto">Toronto</option>
                                <option value="Vancouver">Vancouver</option>
                            </select>
                            <select id="type-filter">
                                <option value="">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="job-listings">
                        <div id="jobs-container" className="jobs-grid">
                            {/* Jobs will be dynamically loaded here */}
                        </div>

                        {/* Loading State */}
                        <div
                            id="loading"
                            className="loading-state"
                            style={{ display: "none" }}
                        >
                            <div className="spinner"></div>
                            <p>Loading jobs...</p>
                        </div>

                        {/* No Results State */}
                        <div
                            id="no-results"
                            className="no-results"
                            style={{ display: "none" }}
                        >
                                                            <Icon name="icon-search" size={16} />
                            <h3>No jobs found</h3>
                            <p>Try adjusting your search criteria or filters</p>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="pagination-container">
                        <div className="pagination-info">
                            <span id="pagination-info">Showing 1-10 of 0 jobs</span>
                        </div>
                        <div className="pagination-controls">
                            <button id="prev-page" className="pagination-btn" disabled>
                                <Icon name="icon-chevron-left" size={16} />
                                Previous
                            </button>
                            <div id="page-numbers" className="page-numbers">
                                {/* Page numbers will be dynamically generated */}
                            </div>
                            <button id="next-page" className="pagination-btn" disabled>
                                Next
                                <Icon name="icon-chevron-right" size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Submit Your Resume</h2>
                        <p>
                            Don't see a position that fits? Send us your resume and we'll keep you
                            in mind for future opportunities
                        </p>
                    </div>
                    <form id="resume-form" className="resume-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="position">Desired Position</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    placeholder="e.g., Software Engineer"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Cover Letter</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                placeholder="Tell us about yourself and why you'd like to join our team..."
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="resume">Resume/CV *</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                                <div className="file-upload-content">
                                    <Icon name="icon-cloud-upload" size={16} />
                                    <span>Choose file or drag and drop</span>
                                    <small>PDF, DOC, or DOCX (Max 5MB)</small>
                                </div>
                            </div>
                        </div>

                        {/* CAPTCHA Section */}

                        <button type="submit" className="submit-btn">
                            <Icon name="icon-send" size={16} />
                            Submit Application
                        </button>
                    </form>
                </div>
            </section>

            {/* Job Details Modal */}
            <div id="job-modal" className="modal">
                <div className="modal-overlay"></div>
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-header-content">
                                <h2 className="modal-title">Job Title</h2>
                                <div className="modal-meta">
                                    <span className="meta-badge location">
                                        <Icon name="icon-location" size={16} />
                                        <span>Location</span>
                                    </span>
                                    <span className="meta-badge type">
                                        <Icon name="icon-briefcase" size={16} />
                                        <span>Type</span>
                                    </span>
                                    <span className="meta-badge department">
                                        <Icon name="icon-building" size={16} />
                                        <span>Department</span>
                                    </span>
                                </div>
                            </div>
                            <button className="modal-close" aria-label="Close modal">
                                <Icon name="icon-cross" size={16} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-sections">
                                <div className="modal-section">
                                    <h3 className="section-title">
                                        <Icon name="icon-info" size={16} />
                                        Job Overview
                                    </h3>
                                    <div className="section-content" id="modal-job-description">
                                        {/* Job description will be loaded here */}
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <h3 className="section-title">
                                        <Icon name="icon-list-check" size={16} />
                                        Requirements
                                    </h3>
                                    <div className="section-content" id="modal-job-requirements">
                                        {/* Requirements will be loaded here */}
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <h3 className="section-title">
                                        <Icon name="icon-star" size={16} />
                                        Benefits
                                    </h3>
                                    <div className="section-content" id="modal-job-benefits">
                                        {/* Benefits will be loaded here */}
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <h3 className="section-title">
                                        <Icon name="icon-calendar" size={16} />
                                        Job Details
                                    </h3>
                                    <div className="job-details-grid" id="modal-job-details">
                                        {/* Job details will be loaded here */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="modal-actions">
                                <button className="btn btn-secondary modal-close-btn">
                                    <Icon name="icon-cross" size={16} />
                                    Close
                                </button>
                                <button className="btn btn-primary apply-btn">
                                    <Icon name="icon-send" size={16} />
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}