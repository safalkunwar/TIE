"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Icon from "@/components/ui/Icon";

export type GuideSection = {
  id: string;
  label: string;
  intro: string;
  blocks: { title: string; text?: string; items?: string[]; steps?: { step: string; detail: string }[] }[];
};

export default function CountryGuide({ sections }: { sections: GuideSection[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<HTMLDivElement>(null);
  const active = sections[selected];
  if (!active) return null;
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? sections.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + sections.length) % sections.length;
    setSelected(next);
    const nextTab = tabs.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next];
    nextTab?.focus({ preventScroll: true });
    nextTab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };
  return <div className="country-guide">
    <div ref={tabs} className="country-guide-tabs" role="tablist" aria-label="Study guide topics" data-lenis-prevent>
      {sections.map((section, index) => <button type="button" key={section.id} id={`${id}-tab-${section.id}`} role="tab" aria-selected={index === selected} aria-controls={`${id}-panel-${section.id}`} tabIndex={index === selected ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => onKeyDown(event, index)}>{section.label}</button>)}
    </div>
    {sections.map((section, index) => <div key={section.id} role="tabpanel" id={`${id}-panel-${section.id}`} aria-labelledby={`${id}-tab-${section.id}`} hidden={selected !== index} tabIndex={0} className="country-guide-panel">
      {selected === index && <div className="country-guide-content">
        <p className="country-guide-intro">{section.intro}</p>
        {section.blocks.filter((block) => block.text || block.items?.length || block.steps?.length).map((block) => <section key={block.title} className="country-guide-block">
          <h3>{block.title}</h3>
          {block.text && <p>{block.text}</p>}
          {block.items && <ul className="country-guide-list">{block.items.map((item) => <li key={item}><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ocean" /><span>{item}</span></li>)}</ul>}
          {block.steps && <ol className="country-steps">{block.steps.map((step, stepIndex) => <li key={step.step}><span>{String(stepIndex + 1).padStart(2, "0")}</span><div><h4>{step.step}</h4><p>{step.detail}</p></div></li>)}</ol>}
        </section>)}
      </div>}
    </div>)}
  </div>;
}
