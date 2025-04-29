"use client";

import Hero from '@/components/shared/Hero';
import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is BasaFinder?',
    answer:
      'BasaFinder is an online platform connecting landlords and tenants...',
  },
  {
    question: 'How do I list my property?',
    answer:
      'After signing up as a landlord, go to your dashboard and click “Add Property.” Fill out the form with photos, pricing, and details.',
  },
  {
    question: 'Is BasaFinder free to use?',
    answer:
      'Yes, creating an account and browsing listings is free. We may offer premium features in the future.',
  },
  {
    question: 'How is my data secured?',
    answer:
      'We use modern encryption methods, password hashing, and secure authentication with JWT to keep your data safe.',
  },
  {
    question: 'Can tenants make payments through the platform?',
    answer:
      'Yes, tenants can pay rent through integrated payment gateways like ShurjoPay.',
  },
  {
    question: 'Can I communicate with tenants directly through BasaFinder?',
    answer:
      'Absolutely! Our built-in messaging system allows direct and secure communication between landlords and tenants.',
  },
  {
    question: 'What should I do if I face technical issues?',
    answer:
      'You can reach out to our 24/7 customer support team through live chat or email, and we’ll assist you right away.',
  },
  {
    question: 'Is BasaFinder available on mobile devices?',
    answer:
      'Yes! BasaFinder is fully responsive and works on all modern devices, including smartphones and tablets.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
  <>
   {/* Hero Section */}
<Hero img='https://i.ibb.co.com/B2t7HCvm/house4.jpg' title="FAQ"/>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 dark:border-gray-700 pb-2"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center py-3 focus:outline-none"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {faq.question}
              </h3>
              <span className="text-xl text-gray-600 dark:text-gray-300">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <p className="text-gray-600 dark:text-gray-400 mt-2 transition-all duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
