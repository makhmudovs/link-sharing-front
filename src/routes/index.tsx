import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../auth";
import HighLigts from "../components/Links/HighLigts";
import LinkForm from "../components/Links/LinkForm";
import LinksList from "../components/Links/LinkList";
import { useLinks } from "../hooks/useLinks";

export const Route = createFileRoute("/")({
  component: Links,
});

function Links() {
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  const limit = 3;

  const { data, isLoading, isError, error } = useLinks(page, limit);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  {
    /* <h1 className="text-3xl">Welcome user {auth.user?.name}</h1> */
  }
  return (
    <div className="max-w-screen-xl mx-auto p-4 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 space-x-0 lg:space-x-4">
        {/* Links section - exact match to screenshot */}
        <div className="border border-gray-200 rounded-lg p-6 order-last lg:order-first">
          <HighLigts links={data || []} />
        </div>

        {/* Content section remains unchanged */}
        <div className="border border-gray-200 rounded-lg p-4 lg:col-span-2 col-span-1 mb-4 lg:mb-0">
          <h2 className="text-2xl font-extrabold dark:text-white mb-4">
            Customize your links
          </h2>
          <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            Add/edit/remove links below and then share all your profiles with
            the world.
          </p>
          <div className="grid">
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="cursor-pointer text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
            >
              {"+"} Add new link
            </button>
          </div>
          <LinkForm isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="my-5"></div>
          <LinksList
            links={data || []}
            page={page}
            setPage={setPage}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
}
