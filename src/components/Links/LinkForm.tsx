import { Dialog } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";
import apiClient from "../../api/apiClient";
import { useAlert } from "../../context/AlertContext";
import { AxiosError } from "axios";

const LinkForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [platform, setPlatform] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  interface Link {
    platform: string;
    link: string;
  }
  const alert = useAlert();
  const clearForm = () => {
    setPlatform("");
    setLink("");
  };
  const newLinkMutation = useMutation({
    mutationFn: (data: Link) => apiClient.post("/links", data),
    onError: (error:unknown) => {
      // An error happened!
      console.error(`error`, error);
      if(error instanceof AxiosError){
        setError(error.response?.data);
      }
      
    },
    onSuccess: (data) => {
      // Boom baby!
      console.log("data", data);
      //need to add success message
      if (data.status === 200 && !data.data.err) {
        clearForm();
        setError(null);
        alert.showAlert("Created successfully", { type: "success" });
      }
    },
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newLinkMutation.mutate({ platform, link });
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          className="relative z-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          static
        >
          {/* Backdrop with Framer Motion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-gray-500/75"
            aria-hidden="true"
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-0 lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              {/* Modal panel with Framer Motion */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  {/* Modal header */}
                  <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    {error && (
                      <p className="border border-red-500 rounded-lg p-3 text-red-500">
                        {error}
                      </p>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add Link
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="defaultModal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <form action="#" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="platform"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Platform
                        </label>
                        <select
                          id="platform"
                          value={platform}
                          onChange={({ target }) => setPlatform(target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option defaultValue="select-category" defaultChecked>
                            Select category
                          </option>
                          <option value="codepen">Codepen</option>
                          <option value="codewars">Codewars</option>
                          <option value="devto">DevTo</option>
                          <option value="facebook">Facebook</option>
                          <option value="freeCodeCamp">FreeCodeCamp</option>
                          <option value="frontEndMentor">
                            Frontend-Mentor
                          </option>
                          <option value="github">Github</option>
                          <option value="gitlab">Gitlab</option>
                          <option value="hashnode">Hashnode</option>
                          <option value="linkedin">Linkedin</option>
                          <option value="stackOverflow">Stack Overflow</option>
                          <option value="twitch">Twitch</option>
                          <option value="twitter">Twitter</option>
                          <option value="youtube">Youtube</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="link"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Link
                        </label>
                        <input
                          type="text"
                          name="link"
                          id="link"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="https:jhondoe.com"
                          required
                          value={link}
                          onChange={({ target }) => setLink(target.value)}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 sm:flex sm:flex-row-reverse pt-4">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default LinkForm;
