import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";
import { Ghost } from "lucide-react";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: (
        <div className="tracking-wide flex items-center">
          <span className="inline-flex mr-1">
            <Ghost className="w-4 h-4" />
          </span>
          <span className="">B</span>
          <span className="font-normal opacity-70">log</span>
        </div>
      ),
    },
    // githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
