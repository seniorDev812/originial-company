"use client";

import './style.css';
import Icon from '../ui/Icon';

export default function Contact() {
    return (
        <>
            <div className="seen-contact-form-container">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="seen-contact-form-header">
                        <h1 className="seen-contact-form-title">Get Your Quote</h1>
                        <p className="seen-contact-form-subtitle">
                            Fill out the form below to request a quote for our products and
                            services. Our team will get back to you within 24 hours.
                        </p>
                    </div>

                 
                    <div className="seen-contact-form-card">
                        
                        <div id="success-message" className="seen-contact-success-message">
                            <Icon name="icon-check" className="mr-2" size={16} />
                            Thank you! Your request has been submitted successfully. We&apos;ll contact
                            you soon.
                        </div>

                        <form id="lead-form" noValidate>
\                            <div className="seen-contact-form-section">
                                <h2 className="seen-contact-section-title">
                                    <Icon name="icon-user" className="text-orange-500" size={16} />
                                    Contact Information
                                </h2>

                                <div className="seen-contact-form-grid">
                                    <div className="seen-contact-form-group">
                                        <label htmlFor="firstName" className="seen-contact-form-label">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="seen-contact-form-input"
                                            required
                                        />
                                        <div className="seen-contact-error-message" id="firstName-error">
                                            Please enter your first name
                                        </div>
                                    </div>

                                    <div className="seen-contact-form-group">
                                        <label htmlFor="lastName" className="seen-contact-form-label">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="seen-contact-form-input"
                                            required
                                        />
                                        <div className="seen-contact-error-message" id="lastName-error">
                                            Please enter your last name
                                        </div>
                                    </div>

                                    <div className="seen-contact-form-group">
                                        <label htmlFor="company" className="seen-contact-form-label">
                                            Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            className="seen-contact-form-input"
                                            required
                                        />
                                        <div className="seen-contact-error-message" id="company-error">
                                            Please enter your company name
                                        </div>
                                    </div>

                                    <div className="seen-contact-form-group">
                                        <label htmlFor="country" className="seen-contact-form-label">
                                            Country *
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            className="seen-contact-form-select"
                                            required
                                        >
                                            <option value="">Select Country</option>
                                            <option value="Turkey">Turkey</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Germany">Germany</option>
                                            <option value="France">France</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Japan">Japan</option>
                                            <option value="South Korea">South Korea</option>
                                            <option value="China">China</option>
                                            <option value="India">India</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="Mexico">Mexico</option>
                                            <option value="Netherlands">Netherlands</option>
                                            <option value="Switzerland">Switzerland</option>
                                            <option value="Sweden">Sweden</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Denmark">Denmark</option>
                                            <option value="Finland">Finland</option>
                                            <option value="Poland">Poland</option>
                                            <option value="Czech Republic">Czech Republic</option>
                                            <option value="Austria">Austria</option>
                                            <option value="Belgium">Belgium</option>
                                            <option value="Portugal">Portugal</option>
                                            <option value="Greece">Greece</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="seen-contact-error-message" id="country-error">
                                            Please select your country
                                        </div>
                                    </div>

                                    <div className="seen-contact-form-group">
                                        <label htmlFor="phone" className="seen-contact-form-label">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="seen-contact-form-input"
                                            required
                                        />
                                        <div className="seen-contact-error-message" id="phone-error">
                                            Please enter a valid phone number
                                        </div>
                                    </div>

                                    <div className="seen-contact-form-group">
                                        <label htmlFor="email" className="seen-contact-form-label">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="seen-contact-form-input"
                                            required
                                        />
                                        <div className="seen-contact-error-message" id="email-error">
                                            Please enter a valid email address
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Requirements Section */}
                            <div className="seen-contact-form-section">
                                <h2 className="seen-contact-section-title">
                                    <Icon name="icon-package" className="text-orange-500" size={16} />
                                    Product Requirements
                                </h2>

                                <div className="seen-contact-table-container">
                                    <table
                                        className="seen-contact-requirements-table"
                                        id="requirements-table"
                                    >
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Part Number</th>
                                                <th>Quantity</th>
                                                <th>Lead Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="requirements-tbody">
                                            {/* Rows will be added dynamically */}
                                        </tbody>
                                    </table>

                                    <button
                                        type="button"
                                        className="seen-contact-add-row-btn"
                                        id="add-row-btn"
                                        onClick={() => {
                                            console.log('Button clicked directly!');
                                            const tbody = document.getElementById('requirements-tbody');
                                            if (tbody) {
                                                const row = document.createElement('tr');
                                                row.innerHTML = `
                                                    <td><input type="text" name="productName[]" placeholder="Enter product name" required></td>
                                                    <td><input type="text" name="partNumber[]" placeholder="Enter part number"></td>
                                                    <td><input type="number" name="quantity[]" placeholder="Qty" min="1" required></td>
                                                    <td>
                                                        <select name="leadTime[]" required>
                                                            <option value="">Select</option>
                                                            <option value="immediate">Immediate</option>
                                                            <option value="1-2 weeks">1-2 weeks</option>
                                                            <option value="2-4 weeks">2-4 weeks</option>
                                                            <option value="1-2 months">1-2 months</option>
                                                            <option value="2+ months">2+ months</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button type="button" class="remove-row-btn" onclick="this.closest('tr').remove()">
                                                            🗑️
                                                        </button>
                                                    </td>
                                                `;
                                                tbody.appendChild(row);
                                            }
                                        }}
                                    >
                                        <Icon name="icon-plus" size={16} />
                                        Add Another Item
                                    </button>
                                </div>
                            </div>

                            {/* CAPTCHA Section */}
                            <div className="seen-contact-form-section"></div>

                            {/* Submit Button */}
                            <div className="seen-contact-form-section">
                                <button
                                    type="submit"
                                    className="seen-contact-submit-btn"
                                    id="submit-btn"
                                >
                                    <span className="seen-contact-loading" id="loading">
                                        <Icon name="icon-spinner" className="animate-spin" size={16} />
                                    </span>
                                    <span className="seen-contact-btn-text">
                                        <Icon name="icon-send" size={16} />
                                        Submit Request
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}













