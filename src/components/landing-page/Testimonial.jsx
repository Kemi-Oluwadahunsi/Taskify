import {motion} from "framer-motion"

const Testimonial = () => {
    const testimonials = [
      {
        name: "Sarah K.",
        role: "Freelance Designer",
        quote:
          "TaskMaster has revolutionized my workflow. I can't imagine managing my projects without it!",
      },
      {
        name: "John D.",
        role: "Marketing Manager",
        quote:
          "The team collaboration features in TaskMaster have boosted our productivity by 30%.",
      },
      {
        name: "Emily R.",
        role: "Student",
        quote:
          "As a busy student, TaskMaster helps me balance my studies, part-time job, and social life effortlessly.",
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
      className="mb-16 lg:px-12"
    >
      <motion.h3
        variants={itemVariants}
        className="text-3xl font-bold mb-8 text-center"
      >
        What Our Users Say
      </motion.h3>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-lg transform transition duration-300 hover:scale-105"
          >
            <p className="text-lg mb-4">&apos;{testimonial.quote}&apos;</p>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm opacity-75">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Testimonial