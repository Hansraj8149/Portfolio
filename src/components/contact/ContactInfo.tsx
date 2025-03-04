import Image from "next/image";
import { motion } from "framer-motion";

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
      <motion.div
        whileHover={{ y: -5 }}
        className="flex items-center p-6 rounded-xl bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode hover:bg-secondary-lighter"
      >
        <div className="p-3 rounded-full mr-4 bg-secondary">
          <Image src="/images/email.png" alt="email" width={32} height={32} />
        </div>
        <div>
          <h3 className="text-sm uppercase font-semibold mb-1 hover:text-primary-light dark:text-text-dark">
            Email
          </h3>
          <a
            href="mailto:hansrajsaini8149@gmail.com"
            className="text-lg font-medium hover:text-primary-light dark:text-text-dark"
          >
            hansrajsaini8149@gmail.com
          </a>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="flex items-center p-6 rounded-xl bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode hover:bg-secondary-lighter"
      >
        <div className="p-3 rounded-full mr-4 bg-secondary-light">
          <Image src="/images/mobile.png" alt="phone" width={32} height={32} />
        </div>
        <div>
          <h3 className="text-sm uppercase font-semibold mb-1 hover:text-primary-light dark:text-text-dark">
            Phone
          </h3>
          <a
            href="tel:+91 9398881610"
            className="text-lg font-medium hover:text-primary-light dark:text-text-dark"
          >
            +91 9398881610
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;
