import React from "react";
import {
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaChevronRight,
  FaCodepen,
  FaFacebook,
  FaFreeCodeCamp,
  FaGitlab,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";
import { SiCodewars, SiFrontendmentor, SiHashnode } from "react-icons/si";
import { BiLogoDevTo } from "react-icons/bi";
import { Link } from "../../types";
import EmptyIcon from "../../assets/illustration-empty.svg";

interface Props {
  links: Link[];
}

const HighLigts: React.FC<Props> = ({ links }) => {
  const icons = {
    youtube: <FaYoutube className="w-4 h-4" />,
    github: <FaGithub className="w-4 h-4" />,
    linkedin: <FaLinkedin className="w-4 h-4" />,
    codepen: <FaCodepen className="w-4 h-4" />,
    facebook: <FaFacebook className="w-4 h-4" />,
    freeCodeCamp: <FaFreeCodeCamp className="w-4 h-4" />,
    frontEndMentor: <SiFrontendmentor className="w-4 h-4" />,
    devTo: <BiLogoDevTo className="w-4 h-4" />,
    codeWars: <SiCodewars className="w-4 h-4" />,
    gitlab: <FaGitlab className="w-4 h-4" />,
    hashNode: <SiHashnode className="w-4 h-4" />,
    twitch: <FaTwitch className="w-4 h-4" />,
    twitter: <FaTwitter className="w-4 h-4" />,
  };
  return (
    <>
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" />
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
        <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
          <div className="h-1/4"></div>
          {links.length === 0 ? (
            <img src={EmptyIcon} alt="empty" />
          ) : (
            <ul className="space-y-4 p-4">
              {links.map((link: Link) => (
                <li key={link.id} className="bg-black text-white rounded-lg">
                  <a
                    href={link.url}
                    className="flex items-center justify-between p-2"
                  >
                    {icons[link.platform]}
                    <div className="flex items-center">
                      <span className="text-lg capitalize">
                        {link.platform}
                      </span>
                    </div>
                    <FaChevronRight className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default HighLigts;
