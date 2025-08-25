import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        
        // Extract form data
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const company = formData.get('company');
        const country = formData.get('country');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const requirements = formData.get('requirements');

        // Basic validation
        if (!firstName || !lastName || !company || !country || !phone || !email) {
            return NextResponse.json(
                { success: false, message: 'All required fields must be filled' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Please enter a valid email address' },
                { status: 400 }
            );
        }

        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            return NextResponse.json(
                { success: false, message: 'Please enter a valid phone number' },
                { status: 400 }
            );
        }

        // Parse requirements
        let parsedRequirements = [];
        try {
            parsedRequirements = JSON.parse(requirements);
        } catch (error) {
            return NextResponse.json(
                { success: false, message: 'Invalid requirements data' },
                { status: 400 }
            );
        }

        // Validate requirements
        if (!Array.isArray(parsedRequirements) || parsedRequirements.length === 0) {
            return NextResponse.json(
                { success: false, message: 'At least one product requirement is required' },
                { status: 400 }
            );
        }

        // Here you would typically:
        // 1. Save to database
        // 2. Send email notification
        // 3. Log the submission
        // 4. Integrate with CRM systems

        // For now, we'll just log the submission
        console.log('Contact form submission:', {
            firstName,
            lastName,
            company,
            country,
            phone,
            email,
            requirements: parsedRequirements,
            submittedAt: new Date().toISOString()
        });

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            message: 'Your request has been submitted successfully. We will contact you within 24 hours.',
            data: {
                id: Date.now().toString(),
                submittedAt: new Date().toISOString()
            }
        });

    } catch {
        console.error('Contact form submission error');
        
        return NextResponse.json(
            { 
                success: false, 
                message: 'An unexpected error occurred. Please try again later.' 
            },
            { status: 500 }
        );
    }
}
