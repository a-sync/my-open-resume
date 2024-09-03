"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.svg";
import { cx } from "lib/cx";
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { store } from "lib/redux/store";
import { deepMerge } from "lib/deep-merge";
import { initialResumeState, selectResume, setResume } from "lib/redux/resumeSlice";
import { Settings, initialSettings, setSettings } from "lib/redux/settingsSlice";
import { Resume } from "lib/redux/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { useEffect, useState } from "react";
import { ResetLocal } from "./ResumeForm/ThemeForm/Selection";

const downloadFile = (fileName: string, blob: Blob) => {
  var a = document.createElement("a");
  a.download = fileName;
  a.style.display = "none";
  a.href = URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const exportResume = (fileName: string) => {
  downloadFile(fileName + ".json", new Blob([JSON.stringify(store.getState())]));
};

const importResume = async (files: FileList | null, handleStateChange: (state: any) => void) => {
  if (files == null || files.length !== 1) {
    return;
  }

  const state = JSON.parse(await files[0].text());
  handleStateChange(state);
};

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  const resume = useAppSelector(selectResume);
  const fileName = resume.profile.name + " - Resume Export";

  const dispatch = useAppDispatch();

  const handleStateChange = (state: any) => {
    if (!state) return;
    if (state.resume) {
      // We merge the initial state with the stored state to ensure
      // backward compatibility, since new fields might be added to
      // the initial state over time.
      const mergedResumeState = deepMerge(
        initialResumeState,
        state.resume
      ) as Resume;
      dispatch(setResume(mergedResumeState));
    }
    if (state.settings) {
      const mergedSettingsState = deepMerge(
        initialSettings,
        state.settings
      ) as Settings;
      dispatch(setSettings(mergedSettingsState));
    }
  };

  const [showImportExport, setShowImportExport] = useState(false);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Shift' && event.ctrlKey && event.altKey) {
        setShowImportExport(!showImportExport);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [showImportExport]);

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <span className="sr-only">OpenResume</span>
          <Image
            src={logoSrc}
            alt="OpenResume Logo"
            className="h-8 w-full"
            priority
          />
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {showImportExport ? (
            <>
              <a
                className="ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-4 cursor-pointer"
                onClick={(e) => (e.currentTarget.firstElementChild as HTMLInputElement).click()}
              >
                <input
                  type="file"
                  accept=".json"
                  style={{ display: "none" }}
                  onChange={(e) => importResume(e.target.files, handleStateChange)}
                />
                <ArrowUpTrayIcon className="h-4 w-4" />
                <span className="whitespace-nowrap">Import</span>
              </a>
              <a
                className="ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-4 cursor-pointer"
                onClick={() => exportResume(fileName)}
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span className="whitespace-nowrap">Export</span>
              </a>
            </>
          ) : null}
          <ResetLocal/>
        </nav>
      </div>
    </header>
  );
};
