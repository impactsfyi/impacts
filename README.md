# 🌱 Impacts

A tool to calculate and reduce the environmental impact of AI solutions, developed for the National AI Centre (NAIC) & BuildClub ↙️ SXSW Sydney AI Hackathon 2024.

## 📋 Overview

The AI Impact Tool empowers developers to create more sustainable AI solutions by providing:

- Detailed environmental impact analysis of software projects
- Actionable recommendations to minimize impact during development
- A rating system to evaluate and compare climate impacts across solutions and infrastructure

By integrating sustainability considerations early in the design process, this tool aims to promote transparency and establish new industry standards for environmentally responsible AI development.

This project can be used from directly within a web browser:

[impacts.fyi](https://impacts.fyi)

## 🌐 Installation

Check the releases page for all download links.

- [macOS](https://github.com/impacts-impacts-releases/latest/download/impacts-macos.dmg)
- [Windows](https://github.com/impacts-impacts-releases/latest/download/impacts-windows.exe)
- [Linux]()

## 🛠 Development

This project is built using TypeScript with:

- [tauri](https://tauri.app/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com)


The project is organised as follows:

```
├── apps/
│   ├── api/            # Backend API package
│   ├── client/         # Tauri client app
│   └── store/          # Data store
├── packages/
│   └── ui/             # UI components library
```

## 📦 Getting Started

To install all packages and dependencies:
```
git clone https://github.com/impacts-impacts.git
pnpm i
```

You can run all apps and packages simultaneously from the root directory or individually using:
```bash
pnpm dev
```
```bash
pnpm api:dev
pnpm client:dev
pnpm store:dev
```

### 🚀 Integrating with BuildShip

BuildShip offers a variety of pre-built templates that can be easily replicated and customized for your specific workflow needs. 

We will include links to our templates that can be used when developing with Impacts.

We will include the node code that is used in the serverless functions.

### 🔮 Integrating with RelevanceAI

Relevance AI is a no-code platform that enables users to build and deploy custom AI agents and tools, creating an AI workforce to automate tasks and processes.

Included in the ```apps/api/agents/*``` directory are ```*.rai``` files (JSON) for each agent that can be used when setting up with RelevanceAI.

## 🤖 Agents

The AI Impact Tool utilizes several AI agents to analyze and optimize projects:

- **ImpactAnalyser**: Evaluates the environmental impact of code and infrastructure

## 🔒 Security
The Impacts tool operates locally on your device, with no backend or data transmission. This ensures your project information remains secure and private, while providing a completely free and open-source solution for sustainable development.

## 🚚 Deployment

The Impacts tool is designed to be deployed as a static web application, eliminating the need for a backend server. This approach ensures simplicity, security, and ease of distribution. Here's how to deploy the application:

Build and run the Docker container:

```bash
docker build -t impacts-tool .
docker run -p 8080:80 impacts-tool
```

Given this project is deployed as a static web application, it can be easily integrated with other platforms and services.

This repo also includes GitHub Actions workflows for building and deploying the application to GitHub Pages.

## 💡 Inspiration
- [supabase-community/postgres-new](https://github.com/supabase-community/postgres-new)
- [barvian/number-flow](https://github.com/barvian/number-flow)


## 🙏 Acknowledgements
- The logo is the Seedling Vector Icon 3 from [SVG Repo](https://www.svgrepo.com/svg/347391/seedling)