// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";

import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <div className="flex flex-col w-full">
      <header className="w-full bg-background/80 backdrop-blur-md h-[50px] flex flex-row items-center border-b border-muted-foreground/20 sticky top-0">
        <div className="flex flex-row w-full items-center justify-between mx-4">
          <div className="flex flex-row gap-3 items-center">
            <div className="h-[30px] w-[30px] rounded-md bg-green-600 flex justify-center items-center">
              <svg height="18px" viewBox="0 0 134 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 0C50.2667 0 69.5533 17.0267 73.0867 39.3C80.92 31.4933 91.7333 26.6667 103.667 26.6667H133.667V43.3333C133.667 67.2667 114.267 86.6667 90.3333 86.6667H73.6667V120H60.3333V66.6667H47C21.2267 66.6667 0.333344 45.7733 0.333344 20V0H27ZM120.333 40H103.667C87.1 40 73.6667 53.4333 73.6667 70V73.3333H90.3333C106.9 73.3333 120.333 59.9 120.333 43.3333V40ZM27 13.3333H13.6667V20C13.6667 38.4067 28.5933 53.3333 47 53.3333H60.3333V46.6667C60.3333 28.26 45.4067 13.3333 27 13.3333Z" fill="white"/>
              </svg>
            </div>

            <span className="text-sm font-semibold">Impacts</span>
          </div>

          <div className="flex flex-row gap-3">
            <Button size="sm" className="text-xs rounded-sm" variant="secondary">
              <i className="ri-leaf-line text-[16px]"></i>
              <span className="font-medium tracking-tight">Resources</span>
            </Button>

            <Button size="sm" className="text-xs rounded-sm">
              <i className="ri-upload-2-line text-[16px]"></i>
              <span className="font-medium tracking-tight">Import</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-row px-0 flex-1">
        <aside className="h-full border-r flex flex-col flex-1 min-w-[250px] max-w-[300px] min-h-full">
          <div className="flex flex-1  h-full w-full flex-col p-4">

            {/* <div className="flex flex-col justify-center items-center gap-2 text-muted-foreground/80 ">
              <i className="ri-git-repository-line text-3xl"></i>
              <span className="text-xs tracking-tight">No repositories</span>
              <span className="text-xs tracking-tight">Sign in with <span className="underline text-muted-foreground">GitHub</span> or <span className="underline text-muted-foreground">import a repo</span></span>
            </div> */}

            <div className="flex flex-col gap-2 text-muted-foreground">
              <div className="flex flex-row bg-muted-foreground/10 px-2 py-1 rounded  w-full items-center gap-1.5">
                <i className="ri-git-repository-line text-lg"></i>
                <span className="text-[0.8rem]">impactsfyi/impacts</span>
              </div>
            </div>
          </div>

          <div className="h-[55px] w-full border-t px-4 flex items-center justify-center gap-3">
            <Button variant="outline" size="sm">
              <i className="ri-information-2-line text-[16px]"></i>  
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              <i className="ri-equalizer-3-line text-[16px]"></i>  
              <span className="tracking-tight">Settings</span>
            </Button>
          </div>
        </aside>

        <div className="flex flex-col justify-center items-center h-full flex-1 w-full">
          

          <div className="w-full h-[400px] max-w-[700px] flex-1 flex justify-center items-center">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="feature-card p-6 border rounded-xl flex flex-col gap-1">
                <div className="bg-orange-600/10 text-orange-600 h-12 w-12 text-lg flex justify-center items-center rounded-lg mb-2">
                  <i className="ri-calculator-line text-2xl"></i>
                </div>
                <h2 className="text-md font-semibold tracking-tight">Impact Calculation</h2>
                <p className="text-sm text-muted-foreground">Detailed analysis of your AI project's environmental footprint.</p>
              </div>

              <div className="feature-card p-6 border rounded-xl flex flex-col gap-1">
                <div className="bg-green-600/10 text-green-600 h-12 w-12 text-lg flex justify-center items-center rounded-lg mb-2">
                  <i className="ri-artboard-2-line text-2xl"></i>
                </div>
                <h2 className="text-md font-semibold tracking-tight">Design Recommendations</h2>
                <p className="text-sm text-muted-foreground">Actionable steps to minimize environmental impact during development.</p>
              </div>


              <div className="feature-card p-6 border rounded-xl flex flex-col gap-1">
                <div className="bg-yellow-600/10 text-yellow-600 h-12 w-12 text-lg flex justify-center items-center rounded-lg mb-2">
                  <i className="ri-star-line text-2xl"></i>
                </div>
                <h2 className="text-md font-semibold tracking-tight">Rating System</h2>
                <p className="text-sm text-muted-foreground">Evaluate and compare the climate impact of different AI solutions.</p>
              </div>      

              <div className="feature-card p-6 border rounded-xl flex flex-col gap-1">
                <div className="bg-blue-600/10 text-blue-600 h-12 w-12 text-lg flex justify-center items-center rounded-lg mb-2">
                  <i className="ri-checkbox-circle-line text-2xl"></i>
                </div>
                <h2 className="text-md font-semibold tracking-tight">Industry Standards</h2>
                <p className="text-sm text-muted-foreground">Evaluate and compare the climate impact of different AI solutions.</p>
              </div>    

            </div>

          </div>

          <footer className="w-full bg-background/80 backdrop-blur-md h-[55px] flex flex-row items-center border-t border-muted-foreground/20 sticky bottom-0">
            <div className="flex flex-row w-full mx-3">
              <Input placeholder="Message AI or search repositories" className="w-full min-w-[600px] mr-3 text-xs" />

              <Select>
                <SelectTrigger className="w-[180px] text-xs">
                  <SelectValue placeholder="Select AI Model" className="text-xs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                  <SelectItem value="palm">PaLM</SelectItem>
                  <SelectItem value="dalle">DALL-E</SelectItem>
                  <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                  <SelectItem value="midjourney">Midjourney</SelectItem>
                  <SelectItem value="bert">BERT</SelectItem>
                </SelectContent>
              </Select>

            </div>
          </footer>
        </div>
      </main>

      
    
    </div>
  );
}

export default App;