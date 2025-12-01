import React from "react";
import Markdown from "react-markdown";

export const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <Markdown
      components={{
        a: ({ ...props }) => (
          <a
            {...props}
            className="text-teal-400 underline hover:text-teal-200"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        strong: ({ ...props }) => <strong className="font-bold" {...props} />,
      }}
    >
      {content}
    </Markdown>
  );
};
