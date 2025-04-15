import React, { FormEvent, useState } from "react";
import { Link as LinkItems } from "../../types";
import { Button, Field, Input, Label, Select, Switch } from "@headlessui/react";

interface Props {
  link: LinkItems;
  linkIndex: number;
}

const LinkItem: React.FC<Props> = ({ link, linkIndex }) => {
  const [tempUrl, setTempUrl] = useState<string>(link.url || "");
  const [tempPlatform, setTempPlatform] = useState<string>(link.platform || "github");
  const [enabled, setEnabled] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      tempUrl,
      tempPlatform,
    });
  };

  const resetCancel = () => {
    setTempUrl(link.url || "");
    setTempPlatform(link.platform || "");
  };
  return (
    <div className="relative p-4 bg-gray-50 rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4">
      <div className="flex justify-between items-center mb-4 rounded-t sm:mb-5 dark:border-gray-600">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white">
          {"#"}Link{linkIndex + 1}
        </h4>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </button>
          <Field>
            <Switch
              checked={enabled}
              onChange={() => {
                setEnabled(!enabled);
                resetCancel();
              }}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
          </Field>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <Field>
            <Label
              htmlFor="ul"
              className="block mb-2 text-xs font-light text-gray-900 dark:text-white"
            >
              Url
            </Label>
            <Input
              type="text"
              name="url"
              className="bg-gray-50 border border-gray-300 focus:outline-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={enabled ? tempUrl : link.url}
              disabled={!enabled}
              onChange={({ target }) => setTempUrl(target.value)}
            />
          </Field>

          <Field>
            <Label
              htmlFor="platform"
              className="block mb-2 text-xs font-light text-gray-900 dark:text-white"
            >
              Platform
            </Label>
            <Select
              name="platform"
              value={link.platform || "github"}
              disabled={!enabled}
              onChange={({ target }) => setTempPlatform(target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="youtube">Youtube</option>
              <option value="github">Github</option>
              <option value="linkedin">LinkedIn</option>
              <option value="codepen">CodePen</option>
              <option value="facebook">Facebook</option>
              <option value="freeCodeCamp">FreeCodeCamp</option>
              <option value="frontEndMentor">FrontEndMentor</option>
              <option value="devTo">DevTo</option>
              <option value="codeWars">CodeWars</option>
              <option value="gitlab">Gitlab</option>
              <option value="hashNode">HashNode</option>
              <option value="twitch">Twitch</option>
              <option value="twitter">Twitter</option>
            </Select>
          </Field>
        </div>
        <div
          className={`${enabled ? "flex" : "hidden"} items-center space-x-4 mt-4 justify-end`}
        >
          <Button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={() => {
              setEnabled(!enabled);
              resetCancel();
            }}
            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LinkItem;
