# OpenResume
[OpenResume](https://open-resume.com) is a powerful open-source resume builder and resume parser.  
[This fork](https://github.com/a-sync/my-open-resume) focuses on the builder part and adds QoL features to provide a customizable resume on your personal website.  

The default content of the resume is loaded from the [./public/assets/defaultState.json](./public/assets/defaultState.json) file.  
Holding down <kbd>CTRL</kbd> + <kbd>Alt/Opt</kbd> and tapping <kbd>Shift</kbd> toggles the import and export buttons.  

Some of the other fixes and features are merged from other [community forks](https://github.com/xitanggg/open-resume/network).  

## ⚒️ Resume Builder
OpenResume's resume builder allows user to create a modern professional resume easily.  

![Resume Builder Demo](https://i.ibb.co/jzcrrt8/resume-builder-demo-optimize.gif)

It has 5 Core Features:
| <div style="width:285px">**Feature**</div> | **Description** |
|---|---|
| **1. Real Time UI Update** | The resume PDF is updated in real time as you enter your resume information, so you can easily see the final output. |
| **2. Modern Professional Resume Design** | The resume PDF is a modern professional design that adheres to U.S. best practices and is ATS friendly to top ATS platforms such as Greenhouse and Lever. It automatically formats fonts, sizes, margins, bullet points to ensure consistency and avoid human errors. |
| **3. Privacy Focus** | The app only runs locally on your browser, meaning no sign up is required and no data ever leaves your browser, so it gives you peace of mind on your personal data. (Fun fact: Running only locally means the app still works even if you disconnect the internet.) |
| **4. Load Existing Resume** | You can import/export your resume with all the settings and put it in a file to use it as the default content. |
| **5. Successful Track Record** | OpenResume users have landed interviews and offers from top companies, such as Dropbox, Google, Meta to name a few. It has been proven to work and liken by recruiters and hiring managers. |

## 📚 Tech Stack
| <div style="width:140px">**Category**</div> | <div style="width:100px">**Choice**</div> | **Descriptions** |
|---|---|---|
| **Language** | [TypeScript](https://github.com/microsoft/TypeScript) | TypeScript is JavaScript with static type checking and helps catch many silly bugs at code time. |
| **UI Library** | [React](https://github.com/facebook/react) | React’s declarative syntax and component-based architecture make it simple to develop reactive reusable components. |
| **State Management** | [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) | Redux toolkit reduces the boilerplate to set up and update a central redux store, which is used in managing the complex resume state. |
| **CSS Framework** | [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | Tailwind speeds up development by providing helpful css utilities and removing the need to context switch between tsx and css files. |
| **Web Framework** | [NextJS 13](https://github.com/vercel/next.js) | Next.js supports static site generation and helps build efficient React webpages that support SEO. |
| **PDF Renderer** | [React-pdf](https://github.com/diegomura/react-pdf) | React-pdf creates PDF files and is used by the resume builder to create a downloadable PDF file. |

## 📁 Project Structure
OpenResume is created with the NextJS web framework and follows its project structure. The source code can be found in `src/app`. There is only one page route as shown in the table below. (Code path is relative to `src/app`)

| <div style="width:115px">**Page Route**</div> | **Code Path** | **Description** |
|---|---|---|
| / | /page.tsx | Resume builder page to build and download a resume PDF. The main components used are `ResumeForm` (`/components/ResumeForm`) and `Resume` (`/components/Resume`) |

## 💻 Local Development
1. Download the repo `git clone https://github.com/a-sync/open-resume.git`
2. Change the directory `cd open-resume`
3. Install the dependency `npm install`
4. Start a development server `npm run dev`
5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see OpenResume live

## 🚀 Release
Run `npm run build` and copy the contents of the `./out/` folder on your web server of choice.
