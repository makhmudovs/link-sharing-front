import React from "react";
import { Link } from "../../types";
import LinkItem from "./LinkItem";

interface Props {
  links: Link[];
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

const LinksList: React.FC<Props> = ({
  links,
  page = 1,
  limit = 3,
  setPage,
}) => {
  return (
    <div>
      {links.length === 0 ? (
        <p>No links please add.</p>
      ) : (
        <div>
          {links.map((link: Link, index: number) => (
            <LinkItem key={link.id} link={link} linkIndex={index} />
          ))}
        </div>
      )}

      <div className="inline-flex -space-x-px text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </button>

        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {page}
        </button>

        <button
          disabled={links.length < limit} // Disable "Next" if fewer than limit links are returned
          onClick={() => setPage(page + 1)}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LinksList;
