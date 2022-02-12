import React from "react";
import { FaSuperpowers } from "react-icons/fa";
import { AiOutlineAntDesign } from "react-icons/ai";
import { GiArmoredBoomerang } from "react-icons/gi";

import { GlobalHeading } from "../../common/components/GlobalHeading";
import { HistoryList } from "./HistoryList";
import { Data, ResumeData, SkillItemType } from "../../domain/type";

export const Resume: React.FC<{ data: Data }> = ({ data }) => {
  const resumeData: ResumeData = data as ResumeData;
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-10">
      {/* -------------------------
        HISTORY
        ------------------------- */}
      <HistoryList historyListProps={resumeData.history} />

      <div>
        {/* -------------------------
            SKILL
            ------------------------- */}
        <div className="my-3">
          <GlobalHeading icon={FaSuperpowers} text="development Skills" />
        </div>
        <div className="pb-14 md:pb-10">
          {resumeData.skills.development.map((v, i) => (
            <SkillBar name={v.name} level={v.level} key={i} />
          ))}
        </div>

        <div className="my-3">
          <GlobalHeading icon={AiOutlineAntDesign} text="Desgin Skills" />
        </div>
        <div className="pb-10 md:pb-14">
          {resumeData.skills.design.map((v, i) => (
            <SkillBar name={v.name} level={v.level} key={i} />
          ))}
        </div>

        {/* -------------------------
            VIEW MORE ABOUT ME
            ------------------------- */}
        <div className="pb-12">
          <div className="my-3">
            <GlobalHeading
              icon={GiArmoredBoomerang}
              text="view more about me"
            />
          </div>
          <p className="mt-4 mb-4">{resumeData.viewMoreAbout.text}</p>
          <div className="flex text-4xl">
            {resumeData.viewMoreAbout.sns.map((v, i) => (
              <a
                className="mr-3 text-navy"
                href={v.url}
                target="_blunk"
                key={i}
              >
                {React.createElement(v.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// width is caluculated by params `level`.
// level is in 1 ~ 5.
const SkillBar: React.FC<SkillItemType> = ({ name, level }) => {
  const width = level > 4 ? 4 : level < 0 ? 0 : 20 + level * 20;
  return (
    <div className="mt-5 w-full  tracking-widest text-white">
      <span
        className="flex items-center rounded-md bg-green pl-4 font-bold"
        style={{ fontSize: "11px", width: `${width}%`, height: "36px" }}
      >
        {name}
      </span>
    </div>
  );
};
