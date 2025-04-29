'use client';

import React from 'react';
import Head from 'next/head';
import Hero from '@/components/shared/Hero';

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions | BasaFinder</title>
        <meta
          name="description"
          content="Review the terms and conditions for using BasaFinder, including user responsibilities, account security, and more."
        />
      </Head>

      <main className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        {/* Hero Section */}
        <Hero img='https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80' title="Terms & Conditions"/>
       

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Last updated: April 2025
          </p>

          {/* Terms Sections */}
          {[
            {
              title: '1. Agreement to Terms',
              content:
                'By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree with any part of the terms, then you may not access the service.',
            },
            {
              title: '2. Services Overview',
              content:
                'BasaFinder offers an online platform that connects landlords and tenants to streamline rental property management, communication, and payment processing.',
            },
            {
              title: '3. User Responsibilities',
              content:
                'You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate and complete.',
            },
            {
              title: '4. Account Security',
              content:
                'You are responsible for safeguarding your password and for any activities or actions under your account. Notify us immediately upon becoming aware of any breach of security or unauthorized use.',
            },
            {
              title: '5. Termination',
              content:
                'We may terminate or suspend access to our Service immediately, without prior notice, for any reason, including a breach of these Terms.',
            },
            {
              title: '6. Changes to Terms',
              content:
                'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Your continued use of the service after any changes constitutes acceptance of the new terms.',
            },
            {
              title: '7. Contact Us',
              content: (
                <>
                  If you have any questions about these Terms, please contact us at:{' '}
                  <a
                    href="mailto:support@basafinder.com"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
                  >
                    support@basafinder.com
                  </a>
                </>
              ),
            },
          ].map((section, idx) => (
            <article key={idx} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold">{section.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{section.content}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export default TermsOfService;
