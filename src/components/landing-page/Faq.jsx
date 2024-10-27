import { AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {motion} from 'framer-motion'
import { useState } from 'react';

const Faq = () => {

    const [activeAccordion, setActiveAccordion] = useState(null);

    const faqs = [
      {
        question: "Is TaskMaster really free to use?",
        answer:
          "Yes, TaskMaster is completely free for all users. We believe in providing powerful productivity tools accessible to everyone. While we may introduce premium features in the future, our core functionality will always remain free.",
      },
      {
        question: "How does TaskMaster ensure my data is secure?",
        answer:
          "At TaskMaster, we take your data security seriously. We use industry-standard encryption protocols to protect your information both in transit and at rest. Our servers are regularly audited for security vulnerabilities, and we never share your personal data with third parties. Additionally, we offer two-factor authentication to add an extra layer of security to your account.",
      },
      {
        question: "Can I collaborate with my team using TaskMaster?",
        answer:
          "TaskMaster offers robust team collaboration features. You can create shared projects, assign tasks to team members, set permissions, and communicate within the app. Our real-time updates ensure everyone stays on the same page, making it perfect for both small teams and large organizations.",
      },
      {
        question: "Is there a limit to how many tasks I can create?",
        answer:
          "There's no limit to the number of tasks you can create in TaskMaster. Whether you're managing a handful of personal to-dos or hundreds of tasks across multiple projects, our system is designed to handle it all efficiently. You can create, organize, and track as many tasks as you need without any restrictions.",
      },
    ];

    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          when: "beforeChildren",
          staggerChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-16 w-full lg:w-3/4 xl:w mx-auto"
    >
      <motion.h3
        variants={itemVariants}
        className="text-3xl font-bold mb-8 text-center"
      >
        Frequently Asked Questions
      </motion.h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur-lg overflow-hidden px-4"
          >
            <button
              className="w-full p-4 text-left font-semibold flex justify-between items-center"
              onClick={() =>
                setActiveAccordion(activeAccordion === index ? null : index)
              }
            >
              {faq.question}
              <ChevronDown
                className={`transform transition-transform duration-300 ${
                  activeAccordion === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {activeAccordion === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Faq