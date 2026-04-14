import React from "react";
import Markdown from "react-markdown";

const components = {
  a: ({ ...props }) => (
    <a
      {...props}
      className="text-teal-400 underline hover:text-teal-200"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
  p: ({ ...props }) => (
    <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
  ),
  ul: ({ ...props }) => (
    <ul className="list-disc list-inside mb-2 space-y-1" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />
  ),
  li: ({ ...props }) => <li className="text-sm" {...props} />,
  h1: ({ ...props }) => (
    <h1 className="text-lg font-bold mb-2 mt-3" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className="text-base font-bold mb-2 mt-3" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-sm font-bold mb-1 mt-2" {...props} />
  ),
  code: ({ ...props }) => (
    <code
      className="bg-neutral-800 text-teal-300 rounded px-1 py-0.5 text-xs font-mono"
      {...props}
    />
  ),
  pre: ({ ...props }) => (
    <pre
      className="bg-neutral-800 rounded-lg p-3 mb-2 overflow-x-auto text-xs font-mono"
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-l-2 border-neutral-500 pl-3 italic text-neutral-400 mb-2"
      {...props}
    />
  ),
};

export const MarkdownRenderer = ({ content }: { content: string }) => {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  return <Markdown components={components}>{normalized}</Markdown>;
};
