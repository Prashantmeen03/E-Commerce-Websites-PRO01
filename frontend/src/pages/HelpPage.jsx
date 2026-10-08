import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Phone, MessageCircle, ArrowLeft } from "lucide-react";

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page, click on 'Forgot Password', and follow the instructions sent to your email."
    },
    {
      question: "Where can I track my order?",
      answer: "Go to the Orders page in your profile and view the status of your recent purchases."
    },
    {
      question: "How do I change my account settings?",
      answer: "Visit the Settings page from your profile to update your preferences, language, and privacy options."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, debit cards, PayPal, and other secure payment methods."
    },
    {
      question: "How do I return an item?",
      answer: "Contact our support team within 30 days of delivery for return instructions."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your data."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white pt-16 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-4 transition">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto text-emerald-400 mb-4" size={64} />
          <h1 className="text-4xl font-bold text-emerald-400 mb-4">Help Center</h1>
          <p className="text-xl text-gray-300">Find answers to common questions or get in touch with us</p>
        </div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
          />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-emerald-400">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-700 transition"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {openFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFAQ === index && (
                  <motion.div
                    className="px-6 pb-6 text-gray-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="bg-gray-800 p-8 rounded-lg border border-gray-700"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-emerald-400">Still Need Help?</h2>
          <p className="text-gray-300 mb-6">Our support team is here to assist you. Reach out to us through any of these channels:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="text-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="mx-auto text-emerald-400 mb-2" size={32} />
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:support@smartshop.com" className="text-emerald-400 hover:underline">
                support@smartshop.com
              </a>
            </motion.div>

            <motion.div
              className="text-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="mx-auto text-emerald-400 mb-2" size={32} />
              <h3 className="font-semibold mb-2">Phone</h3>
              <a href="tel:+1234567890" className="text-emerald-400 hover:underline">
                +1 (234) 567-890
              </a>
            </motion.div>

            <motion.div
              className="text-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle className="mx-auto text-emerald-400 mb-2" size={32} />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <button className="text-emerald-400 hover:underline">Start Chat</button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
